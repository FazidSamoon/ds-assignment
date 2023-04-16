import { DeliveryModel } from 'ds-assignment-database-schema-package';

export const getAllDelieveriesService = async (queries) => {
    try {
        const { sellerID, category, sort, page, limit } = queries;
        
        let queryObject = {};
        if (sellerID) {
            queryObject.sellerID = sellerID;
        }
        if (category) {
            queryObject.category = category;
        }
        let response = DeliveryModel.find(queryObject)

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

export const createDeliveryService = async (body) => {
    try {
        const response = await DeliveryModel.create(body);
        return response;
    } catch (error) {
        console.log("error ",error)
        return { status: 400, message: error.message };
    }
};

export const updateDeliveryService = async (id, body) => {
    try {
        const response = await DeliveryModel.findByIdAndUpdate(
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

export const getDeliveryByIdService = async (id) => {
    try {
        const response = await DeliveryModel.findById(id);
        return response;
    } catch (error) {
        return { status: 400, message: error.message };
    }
};
