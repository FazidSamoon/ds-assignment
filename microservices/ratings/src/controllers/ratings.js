import { createRatingService, deleteRatingService,  getAllRaingsService, getRatingByIdService, updateRatingService } from '../services/ratings';
import { makeResponse } from '../utils/response';

export const getAllRatings = async (req, res) => {
    const response = await getAllRaingsService(req.query);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'No rating found' });
    return makeResponse({ res, status: 200, data: response, message: 'Ratings found' });
};

export const createRating = async (req, res) => {
    const user = req.user._id;
    const response = await createRatingService(req.body, user);
    if (!response) {
        return makeResponse({ res, status: 400, message: 'Ratings not created' });
    }
    return makeResponse({ res, status: 200, data: response, message: 'Ratings created' });
};

export const updateRating = async (req, res) => {
    const { id } = req.params;
    const response = await updateRatingService(id, req.body);
    if (!response) return makeResponse({ res, status: 400, message: 'Ratings not updated' });
    return makeResponse({ res, status: 200, data: response, message: 'Ratings updated' });
};

export const deleteRating = async (req, res) => {
    const { id } = req.params;
    const response = await deleteRatingService(id);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'Ratings not deleted' });
    return makeResponse({ res, status: 200, data: response, message: 'Ratings deleted' });
};

export const getRating = async (req, res) => {
    const { id } = req.params;
    const response = await getRatingByIdService(id);
    if (response.status) return makeResponse({ res, ...response });
    if (!response) return makeResponse({ res, status: 400, message: 'Ratings not found' });
    return makeResponse({ res, status: 200, data: response, message: 'Ratings found' });
};
