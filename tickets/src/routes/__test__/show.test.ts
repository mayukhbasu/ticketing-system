import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if ticket is not found', async () => {
    await request(app).get('/api/tickets/idnotexist').send().expect(404);
});

it('returns the ticket if ticket not found', async () => {
    const response = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: 'Concert',
        price: 20
    }).expect(201);
    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send()
                           .expect(200);
    expect(ticketResponse.body.title).toEqual('Concert')
})