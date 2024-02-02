import request from 'supertest';
import app from '../../api/server'
import { ComponentJSon, GroupsJson, SpecificationJSon } from '../data';
import { initializeDatasource } from '../../api/database/datasource';

let server: any | null = null;
beforeAll(async () => {
    await initializeDatasource();
    server = app.listen(3000);
});
afterAll(async () => {
    await server.close();
});

async function tryCompleteSpec(id: string, status: number) {
    return request(app)
        .patch(`/specifications/${id}`)
        .send({
            completed: true
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json').expect(status);
}

test('Specification Completed', async () => {
    const created = await request(app)
        .post('/specifications')
        .send(SpecificationJSon)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(created.status).toBe(200);

    await tryCompleteSpec(created.body.id, 400);

    const group = await request(app)
        .post('/groups')
        .send({
            ...GroupsJson,
            specificationId: created.body.id
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(group.status).toBe(200);

    await tryCompleteSpec(created.body.id, 400);

    const component = await request(app)
        .post('/components')
        .send({
            ...ComponentJSon,
            groupId: group.body.id
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(component.status).toBe(200);

    await tryCompleteSpec(created.body.id, 400);

    const part = await request(app)
        .post('/parts')
        .send({
            name: "Part 1",
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(part.status).toBe(200);

    await tryCompleteSpec(created.body.id, 400);

    const componentUpdated = await request(app)
        .patch(`/components/${component.body.id}`)
        .send({
            partId: part.body.id
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(componentUpdated.status).toBe(200);

    console.log(created.body)
    const result = await tryCompleteSpec(created.body.id, 200);
    console.log(result.body)

    const specificationUpdated = await request(app)
        .patch(`/specifications/${created.body.id}`)
        .send({
            codeNumber: "4242"
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(specificationUpdated.status).toBe(400);

    console.log(specificationUpdated.body)
})
