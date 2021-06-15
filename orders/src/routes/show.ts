import { NotFoundError, requireAuth } from '@sgtickets/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders/:orderId',requireAuth, async (req: Request, res: Response) => {
  const order = Order.findById(req.params.orderId).populate('ticket');
  if(!order) {
    throw new NotFoundError();
  }
  
  
  res.send(order);
});

export { router as showOrderRouter };
