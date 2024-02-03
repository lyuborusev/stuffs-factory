import request from 'supertest';
import app from '../../api/server'
import { ComponentJSon, GroupsJson, SpecificationJSon, UUIDv4, UpdatedComponentJSon } from '../data';
import { initializeDatasource } from '../../api/database/datasource';


let server: any | null = null;
beforeAll(async () => {
    await initializeDatasource();
    server = app.listen(3000);
});
afterAll(async () => {
    await server.close();
});

async function arrangeSpecificationGroupComponent() {
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

    const component = await request(app)
        .post('/components')
        .send({
            ...ComponentJSon,
            groupId: group.body.id
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(component.status).toBe(200);

    return { specification, group, component };
}

test('POST /components', async () => {
    const response = await request(app)
        .post('/components')
        .send(ComponentJSon)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(response.status).toBe(400);
})

test('POST /components', async () => {
    await arrangeSpecificationGroupComponent();
})

test('PUT /components/id', async () => {
    const response = await request(app).put(`/components/${UUIDv4}`)
        .send({
            ...UpdatedComponentJSon,
            groupId: UUIDv4
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');;

    expect(response.status).toBe(404);
})


test('PUT /components/id', async () => {
    const { specification, group, component } = await arrangeSpecificationGroupComponent();

    const response = await request(app).put(`/components/${component.body.id}`)
        .send({
            ...UpdatedComponentJSon,
            groupId: UUIDv4
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');;

    expect(response.status).toBe(404);
})

test('PATCH /components/id', async () => {
    const response = await request(app)
        .patch(`/components/${UUIDv4}`)
        .send(
            {
                name: UpdatedComponentJSon.name
            }
        );

    expect(response.status).toBe(404);
})
test('PATCH /components/id', async () => {
    const { specification, group, component } = await arrangeSpecificationGroupComponent();

    const response = await request(app)
        .patch(`/components/${component.body.id}`)
        .send(
            {
                name: UpdatedComponentJSon.name
            }
        );

    expect(response.status).toBe(200);
})

test('GET /components', async () => {
    const response = await request(app).get('/components');

    expect(response.status).toBe(200);
})

test('GET /components/id', async () => {
    const response = await request(app).get(`/components/${UUIDv4}`);

    expect(response.status).toBe(404);
})

test('GET /components/id', async () => {
    const { specification, group, component } = await arrangeSpecificationGroupComponent();
    const response = await request(app).get(`/components/${component.body.id}`);

    expect(response.status).toBe(200);
})

test('DELETE /components/id', async () => {
    const response = await request(app).delete(`/components/${UUIDv4}`);

    expect(response.status).toBe(404);
})

test('DELETE /components/id', async () => {
    const { specification, group, component } = await arrangeSpecificationGroupComponent();
    const response = await request(app).delete(`/components/${component.body.id}`);

    expect(response.status).toBe(202);
})