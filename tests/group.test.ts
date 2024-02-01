import request from 'supertest';
import app from '../api/server'
import { GroupsJson, UUIDv4, UpdatedGroupsJson } from './data';

test('POST /groups', async () => {
    const response = await request(app)
        .post('/groups')
        .send(GroupsJson)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(response.status).toBe(200);
})

test('PUT /groups/id', async () => {
    const response = await request(app)
        .put(`/groups/${UUIDv4}`)
        .send(UpdatedGroupsJson)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(response.status).toBe(200);
})

test('PATCH /groups/id', async () => {
    const response = await request(app)
        .patch(`/groups/${UUIDv4}`)
        .send({
            name: UpdatedGroupsJson.name
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    expect(response.status).toBe(200);
})

test('GET /groups', async () => {
    const response = await request(app).get('/groups');

    expect(response.status).toBe(200);
})


test('GET /groups/id', async () => {
    const response = await request(app).get(`/groups/${UUIDv4}`);

    expect(response.status).toBe(200);
})

test('DELETE /groups/id', async () => {
    const response = await request(app).delete(`/groups/${UUIDv4}`);

    expect(response.status).toBe(200);
})