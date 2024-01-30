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

test('POST /stuffs', async () => {
    const response = await request(app).post('/stuffs');

    expect(response.status).toBe(200);
})

test('GET /stuffs', async () => {
    const response = await request(app).get('/stuffs');

    expect(response.status).toBe(200);
})


test('GET /stuffs/id', async () => {
    const response = await request(app).get('/stuffs/1');

    expect(response.status).toBe(200);
})

test('PUT /stuffs/id', async () => {
    const response = await request(app).put('/stuffs/1');

    expect(response.status).toBe(200);
})

test('PATCH /stuffs/id', async () => {
    const response = await request(app).patch('/stuffs/1');

    expect(response.status).toBe(200);
})

test('DELETE /stuffs/id', async () => {
    const response = await request(app).delete('/stuffs/1');

    expect(response.status).toBe(200);
})