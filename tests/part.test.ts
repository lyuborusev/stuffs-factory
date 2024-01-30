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

test('POST /parts', async () => {
    const response = await request(app).post('/parts');

    expect(response.status).toBe(200);
})

test('GET /parts', async () => {
    const response = await request(app).get('/parts');

    expect(response.status).toBe(200);
})


test('GET /parts/id', async () => {
    const response = await request(app).get('/parts/1');

    expect(response.status).toBe(200);
})

test('PUT /parts/id', async () => {
    const response = await request(app).put('/parts/1');

    expect(response.status).toBe(200);
})

test('PATCH /parts/id', async () => {
    const response = await request(app).patch('/parts/1');

    expect(response.status).toBe(200);
})

test('DELETE /parts/id', async () => {
    const response = await request(app).delete('/parts/1');

    expect(response.status).toBe(200);
})