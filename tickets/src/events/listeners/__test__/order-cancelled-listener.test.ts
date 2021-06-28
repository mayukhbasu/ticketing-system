import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCreatedListener } from "../order-created-listener"
import mongoose from 'mongoose';
import { OrderCancelledEvent } from "@sgtickets/common";
import { Message } from "node-nats-streaming";

const setup = async() => {
    const listener = new OrderCreatedListener(natsWrapper.client);
    const orderId = mongoose.Types.ObjectId().toHexString();
    const ticket = Ticket.build({
        title: 'concert',
        price: 20, 
        userId: 'asdf',
        
    });
    await ticket.save();
    const data : OrderCancelledEvent['data'] = {
        id: orderId ,
        version: 0,
        ticket: {
            id: ticket.id
        }

    }
    //@ts-ignore
    const msg:Message = {
        ack: jest.fn()
    }
    return {msg, data, ticket, orderId, listener}
}

it('updates the ticket, publishes an event, acks message', async() => {
    const {msg, data, ticket, orderId, listener} = await setup();
    //await listener.onMessage(data, msg);
})