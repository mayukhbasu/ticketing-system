import request from 'supertest';
import { app } from "../../app";

it('has a route handler listening to /api/tickets for post request', async() => {
    const response = await request(app).post('/api/tickets').send({});
    console.log(response.status);
    expect(response.status).not.toEqual(404);
});

it('can only be access if the user is signed in', async() => {
    await request(app).post('/api/tickets').send({}).expect(401);
});

it('returns an error if an invalid title is provided', async() => {

});

it('returns an error if an invalid price is provided', async() => {

});

it('creates a ticket with valid parameters', async() => {

})