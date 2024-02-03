import request from 'supertest';
import app from '../../api/server'
import { GroupsJson, SpecificationJSon, UUIDv4, UpdatedGroupsJson } from '../data';
import { initializeDatasource } from '../../api/database/datasource';

let server: any | null = null;
beforeAll(async () => {
    await initializeDatasource();
    server = app.listen(3000);
});
afterAll(async () => {
    await server.close();
});

async function arrangeSpecificationGroup() {
    const specification = await request(app)
        .post('/specifications')
        .send(SpecificationJSon)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(specification.status).toBe(200);

    const group = await request(app)
        .post('/groups')
        .send({
            ...GroupsJson,
            specificationId: specification.body.id
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(group.status).toBe(200);

    return { specification, group };
}

test('POST /groups', async () => {
    const specification = await request(app)
        .post('/specifications')
        .send({
            ...GroupsJson,
            specificationId: UUIDv4
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(specification.status).toBe(400);
})

test('POST /groups', async () => {
    await arrangeSpecificationGroup();
})

test('PUT /groups/id', async () => {
    const response = await request(app)
        .put(`/groups/${UUIDv4}`)
        .send({
            ...GroupsJson,
            specificationId: UUIDv4
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(response.status).toBe(404);
})

test('PUT /groups/id', async () => {
    const { specification, group } = await arrangeSpecificationGroup();

    const updateGroup = await request(app)
        .put(`/groups/${group.body.id}`)
        .send({
            ...GroupsJson,
            specificationId: specification.body.id
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(updateGroup.status).toBe(200);
})

test('PATCH /groups/id', async () => {
    const response = await request(app)
        .patch(`/groups/${UUIDv4}`)
        .send({
            name: UpdatedGroupsJson.name
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(response.status).toBe(404);
})


test('PATCH /groups/id', async () => {
    const { specification, group } = await arrangeSpecificationGroup();

    const patchedGroup = await request(app)
        .patch(`/groups/${group.body.id}`)
        .send({
            name: UpdatedGroupsJson.name
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(patchedGroup.status).toBe(200);
})

test('GET /groups', async () => {
    const response = await request(app).get('/groups');

    expect(response.status).toBe(200);
})


test('GET /groups/id', async () => {
    const response = await request(app).get(`/groups/${UUIDv4}`);

    expect(response.status).toBe(404);
})

test('DELETE /groups/id', async () => {
    const response = await request(app).delete(`/groups/${UUIDv4}`);

    expect(response.status).toBe(404);
})

test('DELETE /groups/id', async () => {
    const { specification, group } = await arrangeSpecificationGroup();

    const response = await request(app).delete(`/groups/${group.body.id}`);

    expect(response.status).toBe(202);
})