import { Rating } from 'ds-assignment-database-schema-package';

export const getAllRaingsService = async (queries) => {
    try {
        const { seller, product, ratingType, page, limit } = queries;
        
        let queryObject = {};
        if (seller) {
            queryObject.seller = seller;
        }
        if (product) {
            queryObject.product = product;
        }
        if (ratingType) {
            queryObject.ratingType = ratingType;
        }
        let response = Rating.find(queryObject)

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

export const createRatingService = async (body) => {
    try {
        const response = await Rating.create(body);
        return response;
    } catch (error) {
        console.log("error ",error)
        return { status: 400, message: error.message };
    }
};

export const updateRatingService = async (id, body) => {
    try {
        const response = await Rating.findByIdAndUpdate(
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

export const deleteRatingService = async (id) => {
    try {
        const response = await Rating.findByIdAndDelete(id);
        return response;
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

export const getRatingByIdService = async (id) => {
    try {
        const response = await Rating.findById(id);
        return response;
    } catch (error) {
        return { status: 400, message: error.message };
    }
};
