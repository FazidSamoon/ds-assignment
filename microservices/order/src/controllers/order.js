import asyncHandler from '../middlewares/async';
import { createOrderService, deleteOrdedrService, getAllOrdersService, getOrderByIdService, updateOrderService } from '../services/orderSevices';
import axios from 'axios';

import { makeResponse } from '../utils/response';

export const getAllOrders = async (req, res) => {
    const response = await getAllOrdersService(req.query);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'No order found' });
    return makeResponse({ res, status: 200, data: response, message: 'Orders found' });
};

export const createOrder = async (req, res) => {
    const user = req.user;
    const response = await createOrderService(req.body);
    if (!response) {
        return makeResponse({ res, status: 400, message: 'Order not created' });
    }
    console.log(response)
    if (response) {
        Object.values(response.products).forEach((item) => {
            Promise.all([
                axios.patch(`http://localhost:3001/api/product/quantity/${item.productID}`, {
                    quantity: item.quantity,
                }).then((res) => {
                    console.log(res.data);
                }).catch((err) => {
                    console.log(err);
                }),
            ]).catch((err) => {
                throw new Error(err);
            });
        })
        axios.post('http://localhost:3009/api/email/send', {
            email: user.email,
            subject: 'Order created successfully',
            body: ` Your order has been created successfully.<br>
                    <b>Order ID:</b> ${response._id}<br>
                    <b>Order Date:</b> ${response.createdAt}<br>
                    <b>Order Total:</b> ${response.amount}<br>
                    <b>Order Status:</b> ${response.status}<br>
                    <b>Order Items:</b> ${response.products.map((item) => item.name)}<br>
            
                    <br>
                    <br>
                    <b>Thank you for shopping with us.</b>`
        });
    }
    return makeResponse({ res, status: 200, data: response, message: 'order created' });
};

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const response = await updateOrderService(id, req.body);
    if (!response) return makeResponse({ res, status: 400, message: 'Order not updated' });
    if (response) {
        axios.post('http://email-srv:3009/api/email/send', {
            email: user.email,
            subject: 'Order created successfully',
            body: ` Your order has been created successfully.<br>
                    <b>Order ID:</b> ${response._id}<br>
                    <b>Order Date:</b> ${response.createdAt}<br>
                    <b>Order Total:</b> ${response.amount}<br>
                    <b>Order Status:</b> ${response.status}<br>
                    <b>Order Items:</b> ${response.products.map((item) => item.name)}<br>
            
                    <br>
                    <br>
                    <b>Thank you for shopping with us.</b>`
        });
    }
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
