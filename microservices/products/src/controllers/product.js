import asyncHandler from '../middlewares/async';
import { createProductService, deleteProductService, getAllProductsService, updateProductService } from '../services/productService';
import { makeResponse } from '../utils/response';

export const getAllProducts = asyncHandler(async (req, res) => {
    const response = await getAllProductsService(req.query);
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
    const { id } = req.params;
    const response = await updateProductService(id, req.body);
    if (!response) return makeResponse({ res, status: 400, message: 'Product not updated' });
    return makeResponse({ res, status: 200, data: response, message: 'Product updated' });
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const response = await deleteProductService(id);
    if (!response) return makeResponse({ res, status: 400, message: 'Product not deleted' });
    return makeResponse({ res, status: 200, data: response, message: 'Product deleted' });
});
