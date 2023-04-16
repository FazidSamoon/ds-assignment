import asyncHandler from '../middlewares/async';
import { createOrderService, deleteOrdedrService, getAllOrdersService, getOrderByIdService, updateOrderService } from '../services/orderSevices';

import { makeResponse } from '../utils/response';

export const getAllOrders = async (req, res) => {
    const response = await getAllOrdersService(req.query);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'No order found' });
    return makeResponse({ res, status: 200, data: response, message: 'Orders found' });
};

export const createOrder = async (req, res) => {
    const response = await createOrderService(req.body);
    if (!response) {
        return makeResponse({ res, status: 400, message: 'Order not created' });
    }
    return makeResponse({ res, status: 200, data: response, message: 'order created' });
};

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const response = await updateOrderService(id, req.body);
    if (!response) return makeResponse({ res, status: 400, message: 'Order not updated' });
    return makeResponse({ res, status: 200, data: response, message: 'Order updated' });
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const response = await deleteOrdedrService(id);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'Order not deleted' });
    return makeResponse({ res, status: 200, data: response, message: 'Order deleted' });
};

export const getOrder = async (req, res) => {
    const { id } = req.params;
    const response = await getOrderByIdService(id);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'Order not found' });
    return makeResponse({ res, status: 200, data: response, message: 'Order found' });
};
