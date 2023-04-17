import Express from 'express';
import { createRating, deleteRating, getAllRatings, getRating, updateRating } from '../controllers/ratings';
import { verifyAccessToken } from '../middlewares/authentication';

const ratingRouter = Express.Router();

ratingRouter.get('/', getAllRatings);
ratingRouter.get('/:id', getRating);
ratingRouter.post('/', verifyAccessToken, createRating);
ratingRouter.patch('/:id',verifyAccessToken,  updateRating);
ratingRouter.delete('/:id', verifyAccessToken, deleteRating);

export default ratingRouter;
