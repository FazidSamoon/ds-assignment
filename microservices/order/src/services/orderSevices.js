import { OrderModel } from 'ds-assignment-database-schema-package';

export const getAllOrdersService = async (queries) => {
    try {
        const { sellerID, category, sort, page, limit, userID } = queries;
        
        let queryObject = {};
        if (sellerID) {
            queryObject.sellerID = sellerID;
        }
        if (userID) {
            queryObject.userID = userID;
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

        return response.populate({
            path: 'products',
            populate: {
                path: 'productID',
                model: 'Product'
            }
        })
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

