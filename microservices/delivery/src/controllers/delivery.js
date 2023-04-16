import asyncHandler from '../middlewares/async';
import { createDeliveryService, createOrderService, deleteOrdedrService, getAllDelieveriesService, getAllOrdersService, getDeliveryByIdService, getOrderByIdService, updateDeliveryService, updateOrderService } from '../services/deliverySevices';

import { makeResponse } from '../utils/response';

export const getAllDeliveries = async (req, res) => {
    const response = await getAllDelieveriesService(req.query);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'No order found' });
    return makeResponse({ res, status: 200, data: response, message: 'Orders found' });
};

export const createDelivery = async (req, res) => {
    const response = await createDeliveryService(req.body);
    if (!response) {
        return makeResponse({ res, status: 400, message: 'Order not created' });
    }
    return makeResponse({ res, status: 200, data: response, message: 'order created' });
};

export const updateDelivery = async (req, res) => {
    const { id } = req.params;
    const response = await updateDeliveryService(id, req.body);
    if (!response) return makeResponse({ res, status: 400, message: 'Order not updated' });
    return makeResponse({ res, status: 200, data: response, message: 'Order updated' });
};

export const getDelivery = async (req, res) => {
    const { id } = req.params;
    const response = await getDeliveryByIdService(id);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'Order not found' });
    return makeResponse({ res, status: 200, data: response, message: 'Order found' });
};
