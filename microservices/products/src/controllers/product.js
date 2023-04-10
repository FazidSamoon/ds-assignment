import asyncHandler from '../middlewares/async';
import { createProductService, getAllProductsService } from '../services/productService';
import { makeResponse } from '../utils/response';

export const getAllProducts = asyncHandler(async (req, res) => {
    const response = await getAllProductsService();
    if (!response) return makeResponse({ res, status: 400, message: 'No products found' });
    return makeResponse({ res, status: 200, data: response, message: 'Products found' });
});

export const createProduct = asyncHandler(async (req, res) => {
    const seller = req.user._id;
    const response = await createProductService(req.body, seller);
    if (!response) return makeResponse({ res, status: 400, message: 'Product not created' });
    return makeResponse({ res, status: 200, data: response, message: 'Product created' });
});

export const updateProduct = asyncHandler(async (req, res) => {
    res.status(200).json({ success: true, msg: 'Update product' });
});

export const deleteProduct = asyncHandler(async (req, res) => {
    res.status(200).json({ success: true, msg: 'Delete product' });
});
