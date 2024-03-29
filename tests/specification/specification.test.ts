import request from 'supertest';
import app from '../../api/server'
import { SpecificationJSon, UUIDv4, UpdatedSpecificationJSon } from '../data';
import { initializeDatasource } from '../../api/database/datasource';

let server: any | null = null;
beforeAll(async () => {
    await initializeDatasource();
    server = app.listen(3000);
});
afterAll(async () => {
    await server.close();
});

test('POST /specifications', async () => {
    const response = await request(app)
        .post('/specifications')
        .send(SpecificationJSon)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(response.status).toBe(200);
})

test('PUT /specifications/id', async () => {
    const response = await request(app)
        .put(`/specifications/${UUIDv4}`)
        .send(UpdatedSpecificationJSon)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(response.status).toBe(404);
})

test('PUT /specifications/id', async () => {
    const created = await request(app)
        .post('/specifications')
        .send(SpecificationJSon)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(created.status).toBe(200);

    const response = await request(app)
        .put(`/specifications/${created.body.id}`)
        .send(UpdatedSpecificationJSon)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(response.status).toBe(200);
})

test('PATCH /specifications/id', async () => {
    const response = await request(app)
        .patch(`/specifications/${UUIDv4}`)
        .send({
            name: UpdatedSpecificationJSon.name
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    ;

    expect(response.status).toBe(404);
})

test('PATCH /specifications/id', async () => {
    const created = await request(app)
        .post('/specifications')
        .send(SpecificationJSon)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(created.status).toBe(200);

    const response = await request(app)
        .patch(`/specifications/${created.body.id}`)
        .send({
            name: UpdatedSpecificationJSon.name
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    ;

    expect(response.status).toBe(200);
})

test('GET /specifications', async () => {
    const response = await request(app).get('/specifications');

    expect(response.status).toBe(200);
})


test('GET /specifications/id', async () => {
    const response = await request(app).get(`/specifications/${UUIDv4}`);

    expect(response.status).toBe(404);
})

test('GET /specifications/id', async () => {
    const created = await request(app)
        .post('/specifications')
        .send(SpecificationJSon)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(created.status).toBe(200);

    const response = await request(app).get(`/specifications/${created.body.id}`);

    expect(response.status).toBe(200);
})

test('DELETE /specifications/id', async () => {
    const response = await request(app).delete(`/specifications/${UUIDv4}`);

    expect(response.status).toBe(404);
})


test('DELETE /specifications/id', async () => {
    const created = await request(app)
        .post('/specifications')
        .send(SpecificationJSon)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(created.status).toBe(200);

    const response = await request(app).delete(`/specifications/${created.body.id}`);

    expect(response.status).toBe(202);
})