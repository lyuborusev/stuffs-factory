import request from 'supertest';
import app from '../../api/server'
import { ComponentJSon, GroupsJson, PartJson, SpecificationJSon } from '../data';
import { initializeDatasource } from '../../api/database/datasource';

let server: any | null = null;
beforeAll(async () => {
    await initializeDatasource();
    server = app.listen(3000);
});
afterAll(async () => {
    await server.close();
});

async function arrangePart() {
    const part = await request(app)
        .post('/parts')
        .send(PartJson)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(part.status).toBe(200);

    return { part };
}
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
test('Part To Component', async () => {
    const { specification, group, component } = await arrangeSpecificationGroupComponent();
    const { part } = await arrangePart();

    const response = await request(app)
        .patch(`/components/${component.body.id}`)
        .send({
            partId: part.body.id
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(response.status).toBe(200);
})