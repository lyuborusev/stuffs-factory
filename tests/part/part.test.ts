import request from 'supertest';
import app from '../../api/server'
import { PartJson, UUIDv4, UpdatedPartJson } from './../data';
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

test('POST /parts', async () => {
    const response = await request(app)
        .post('/parts')
        .send(PartJson)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(response.status).toBe(200);
})

test('PUT /parts/id', async () => {
    const response = await request(app)
        .put(`/parts/${UUIDv4}`)
        .send(UpdatedPartJson)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');;

    expect(response.status).toBe(404);
})

test('PUT /parts/id', async () => {
    const { part } = await arrangePart();

    const response = await request(app)
        .put(`/parts/${part.body.id}`)
        .send(UpdatedPartJson)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');;

    expect(response.status).toBe(200);
})

test('PATCH /parts/id', async () => {
    const response = await request(app)
        .patch(`/parts/${UUIDv4}`)
        .send({
            name: UpdatedPartJson.name
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');;;

    expect(response.status).toBe(404);
})


test('PATCH /parts/id', async () => {
    const { part } = await arrangePart();

    const response = await request(app)
        .patch(`/parts/${part.body.id}`)
        .send({
            name: UpdatedPartJson.name
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');;

    expect(response.status).toBe(200);
})
test('GET /parts', async () => {
    const response = await request(app).get('/parts');

    expect(response.status).toBe(200);
})

test('GET /parts/id', async () => {
    const response = await request(app).get(`/parts/${UUIDv4}`);

    expect(response.status).toBe(404);
})

test('GET /parts/id', async () => {
    const { part } = await arrangePart();
    const response = await request(app).get(`/parts/${part.body.id}`);

    expect(response.status).toBe(200);
})

test('DELETE /parts/id', async () => {
    const response = await request(app).delete(`/parts/${UUIDv4}`);

    expect(response.status).toBe(404);
})

test('DELETE /parts/id', async () => {
    const { part } = await arrangePart();
    const response = await request(app).delete(`/parts/${part.body.id}`);

    expect(response.status).toBe(202);
})