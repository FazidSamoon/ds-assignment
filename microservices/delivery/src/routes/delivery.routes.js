import Express from 'express';
import { createDelivery, getAllDeliveries, getDelivery, updateDelivery  } from '../controllers/delivery';

const deliveryRouter = Express.Router();

deliveryRouter.get('/', getAllDeliveries);
deliveryRouter.get('/:id', getDelivery);
deliveryRouter.post('/',  createDelivery);
deliveryRouter.patch('/:id',  updateDelivery);

export default deliveryRouter;
