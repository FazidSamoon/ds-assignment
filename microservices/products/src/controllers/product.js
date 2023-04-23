import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductQuantityService, updateProductService } from '../services/productService';
import { makeResponse } from '../utils/response';
import axios from 'axios';

export const getAllProducts = async (req, res) => {
    const response = await getAllProductsService(req.query);
    if (!response) return makeResponse({ res, status: 400, message: 'No products found' });
    return makeResponse({ res, status: 200, data: response, message: 'Products found' });
};

export const createProduct = async (req, res) => {
    const seller = req.user._id;
    const response = await createProductService(req.body, seller);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'Product not created' });
    if (response) {
        axios.post('http://email-srv:3009/api/email/send', {
            email: req.user.email,
            subject: 'Product created successfully',
            body: ` Your product has been created successfully.<br>
                    <b>Product ID:</b> ${response._id}<br>
                    <b>Product Name:</b> ${response.name}<br>
                    <b>Product Price:</b> ${response.price}<br>
                    <b>Product Quantity:</b> ${response.inStock}<br>
                    <b>Product Description:</b> ${response.description}<br>
                    <b>Product Category:</b> ${response.category}<br>

                    <br>
                    <br>
                    <b>Thank you for shopping with us.</b>`
        }).catch((err) => {
            console.log(err);
        });
    }
    return makeResponse({ res, status: 200, data: response, message: 'Product created' });
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const response = await updateProductService(id, req.body);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'Product not updated' });
    // if (response) {
    //     axios.post('http://email-srv:3009/api/email/send', {
    //         email: req.user.email,
    //         subject: 'Product updated successfully',
    //         body: ` Your product has been updated successfully.<br>
    //                 <b>Product ID:</b> ${response._id}<br>
    //                 <b>Product Name:</b> ${response.name}<br>
    //                 <b>Product Price:</b> ${response.price}<br>
    //                 <b>Product Quantity:</b> ${response.inStock}<br>
    //                 <b>Product Description:</b> ${response.description}<br>
    //                 <b>Product Category:</b> ${response.category}<br>

    //                 <br>
    //                 <br>
    //                 <b>Thank you for shopping with us.</b>`
    //     });
    // }
    return makeResponse({ res, status: 200, data: response, message: 'Product updated' });
};

export const updateProductQuantity = async (req, res) => {
    const { id } = req.params;
    const response = await updateProductQuantityService(id, req.body);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'Product not updated' });
    return makeResponse({ res, status: 200, data: response, message: 'Product updated' });
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const response = await deleteProductService(id);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'Product not deleted' });

    if (response) {
        axios.post('http://email-srv:3009/api/email/send', {
            email: req.user.email,
            subject: 'Product deleted successfully',
            body: ` Your product has been deleted successfully.<br>
                    <b>Product ID:</b> ${response._id}<br>
                    <b>Product Name:</b> ${response.name}<br>

                    <br>
                    <br>
                    <b>Thank you for shopping with us.</b>`
        });
    }
    return makeResponse({ res, status: 200, data: response, message: 'Product deleted' });
};

export const getProduct = async (req, res) => {
    const { id } = req.params;
    const response = await getProductByIdService(id);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'Product not found' });
    return makeResponse({ res, status: 200, data: response, message: 'Product found' });
};
