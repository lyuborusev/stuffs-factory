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

test('Pagination Default Values', async () => {
    const response = await request(app).get('/parts');

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(0);
    expect(response.body.take).toBe(10);
    expect(response.body.skip).toBe(10);
})


test('Pagination Values', async () => {
    const response = await request(app).get('/parts?take=2&skip=5');

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(0);
    expect(response.body.take).toBe(2);
    expect(response.body.skip).toBe(5);
})

test('Pagination Take = ok', async () => {
    const response = await request(app).get('/parts?take=10');

    expect(response.status).toBe(200);
})
test('Pagination Take = bad request', async () => {
    const response = await request(app).get('/parts?take="abcd');

    expect(response.status).toBe(400);
})

test('Pagination Skip = ok', async () => {
    const response = await request(app).get('/parts?skip=10');

    expect(response.status).toBe(200);
})
test('Pagination Skip = bad request', async () => {
    const response = await request(app).get('/parts?skip="abcd');

    expect(response.status).toBe(400);
})
