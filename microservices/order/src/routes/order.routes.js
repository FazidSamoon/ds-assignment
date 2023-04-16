import Express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrder, updateOrder } from '../controllers/order';
import { verifyAccessToken } from '../middlewares/authentication';

const orderRouter = Express.Router();

orderRouter.get('/', getAllOrders);
orderRouter.get('/:id', getOrder);
orderRouter.post('/', verifyAccessToken, createOrder);
orderRouter.patch('/:id', verifyAccessToken, updateOrder);
orderRouter.delete('/:id', verifyAccessToken, deleteOrder);

export default orderRouter;
