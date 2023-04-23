import { Product } from 'ds-assignment-database-schema-package';

export const getAllProductsService = async (queries) => {
    const { seller, category, sort } = queries;
    let queryObject = {};
    if (seller) {
        queryObject.seller = { $regex: seller, $options: 'i' };
    }
    if (category) {
        queryObject.category = category;
    }
    let response = Product.find(queryObject).populate('seller');

    if (sort) {
        const sortList = sort.split(',').join(' ');
        response = response.sort(sortList);
    } else {
        response = response.sort('-createdAt');
    }

    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skips = (pages - 1) * limits;
    response = response.skip(skips).limit(limits);
    return response;
};

export const createProductService = async (body, seller) => {
    try {
        const response = await Product.create({ ...body, seller });
        return response;
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

export const updateProductService = async (id, body) => {
    try {
        const response = await Product.findByIdAndUpdate(
            id,
            {
                $set: body
            },
            { new: true }
        );
        return response;
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

export const updateProductQuantityService = async (id, quantity) => {
    console.log(id, quantity);
    console.log(quantity)
    try {
        const response = await Product.findByIdAndUpdate(
            id,
            {
                $inc: { inStock: -quantity.quantity }
            },
            { new: true }
        );
        return response;
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

export const deleteProductService = async (id) => {
    try {
        const response = await Product.findByIdAndDelete(id);
        return response;
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

export const getProductByIdService = async (id) => {
    try {
        const response = await Product.findById(id).populate('seller');
        return response;
    } catch (error) {
        return { status: 400, message: error.message };
    }
};
