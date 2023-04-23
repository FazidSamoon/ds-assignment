import { OrderModel } from 'ds-assignment-database-schema-package';

export const getAllOrdersService = async (queries) => {
    try {
        const { sellerID, category, sort, page, limit } = queries;
        
        let queryObject = {};
        if (sellerID) {
            queryObject.sellerID = sellerID;
        }
        if (category) {
            queryObject.category = category;
        }
        let response = OrderModel.find(queryObject)

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
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

export const createOrderService = async (body) => {
    try {
        const response = await OrderModel.create(body);
        return response;
    } catch (error) {
        console.log("error ",error)
        return { status: 400, message: error.message };
    }
};

export const updateOrderService = async (id, body) => {
    try {
        const response = await OrderModel.findByIdAndUpdate(
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

export const deleteOrdedrService = async (id) => {
    try {
        const response = await OrderModel.findByIdAndDelete(id);
        return response;
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

export const getOrderByIdService = async (id) => {
    try {
        const response = await OrderModel.findById(id);
        return response;
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

