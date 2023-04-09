import asyncHandler from '../middlewares/async';

export const getAllProductsService = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all products' });
});

export const createProductService = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Create new product' });
});

export const updateProductService = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Update product' });
});

export const deleteProductService = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Delete product' });
});
