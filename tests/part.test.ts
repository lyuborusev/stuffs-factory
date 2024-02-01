import request from 'supertest';
import app from '../api/server'
import { PartJson, UUIDv4, UpdatedPartJson } from './data';

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

    expect(response.status).toBe(200);
})

test('GET /parts', async () => {
    const response = await request(app).get('/parts');

    expect(response.status).toBe(200);
})


test('GET /parts/id', async () => {
    const response = await request(app).get(`/parts/${UUIDv4}`);

    expect(response.status).toBe(200);
})

test('DELETE /parts/id', async () => {
    const response = await request(app).delete(`/parts/${UUIDv4}`);

    expect(response.status).toBe(200);
})