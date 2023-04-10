import asyncHandler from '../middlewares/async';
import { Product } from 'ds-assignment-database-schema-package';

export const getAllProductsService = async () => {
    const response = await Product.find({}).populate('seller');
    return response;
};

export const createProductService = async (body, seller) => {
    try {
        const response = await Product.create({ ...body, seller });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateProductService = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Update product' });
});

export const deleteProductService = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Delete product' });
});
