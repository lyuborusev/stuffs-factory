import request from 'supertest';
import app from '../api/server'

let server: any | null = null;
beforeAll(done => {
    server = app.listen(3000);
    done();
})

afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
});

test('POST /specifications', async () => {
    const response = await request(app).post('/specifications');

    expect(response.status).toBe(200);
})

test('GET /specifications', async () => {
    const response = await request(app).get('/specifications');

    expect(response.status).toBe(200);
})


test('GET /specifications/id', async () => {
    const response = await request(app).get('/specifications/1');

    expect(response.status).toBe(200);
})

test('PUT /specifications/id', async () => {
    const response = await request(app).put('/specifications/1');

    expect(response.status).toBe(200);
})

test('PATCH /specifications/id', async () => {
    const response = await request(app).patch('/specifications/1');

    expect(response.status).toBe(200);
})

test('DELETE /specifications/id', async () => {
    const response = await request(app).delete('/specifications/1');

    expect(response.status).toBe(200);
})