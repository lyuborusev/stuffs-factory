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

test('POST /groups', async () => {
    const response = await request(app).post('/groups');

    expect(response.status).toBe(200);
})

test('GET /groups', async () => {
    const response = await request(app).get('/groups');

    expect(response.status).toBe(200);
})


test('GET /groups/id', async () => {
    const response = await request(app).get('/groups/1');

    expect(response.status).toBe(200);
})

test('PUT /groups/id', async () => {
    const response = await request(app).put('/groups/1');

    expect(response.status).toBe(200);
})

test('PATCH /groups/id', async () => {
    const response = await request(app).patch('/groups/1');

    expect(response.status).toBe(200);
})

test('DELETE /groups/id', async () => {
    const response = await request(app).delete('/groups/1');

    expect(response.status).toBe(200);
})