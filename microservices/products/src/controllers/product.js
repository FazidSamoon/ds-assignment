import asyncHandler from '../middlewares/async';

export const getAllProducts = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all products' });
});

export const createProduct = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Create new product' });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Update product' });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Delete product' });
});
