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

test('POST /components', async () => {
    const response = await request(app).post('/components');

    expect(response.status).toBe(200);
})

test('GET /components', async () => {
    const response = await request(app).get('/components');

    expect(response.status).toBe(200);
})


test('GET /components/id', async () => {
    const response = await request(app).get('/components/1');

    expect(response.status).toBe(200);
})

test('PUT /components/id', async () => {
    const response = await request(app).put('/components/1');

    expect(response.status).toBe(200);
})

test('PATCH /components/id', async () => {
    const response = await request(app).patch('/components/1');

    expect(response.status).toBe(200);
})

test('DELETE /components/id', async () => {
    const response = await request(app).delete('/components/1');

    expect(response.status).toBe(200);
})