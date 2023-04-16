import Express from 'express';
import { createRating, deleteRating, getAllRatings, getRating, updateRating } from '../controllers/ratings';

const ratingRouter = Express.Router();

ratingRouter.get('/', getAllRatings);
ratingRouter.get('/:id', getRating);
ratingRouter.post('/',  createRating);
ratingRouter.patch('/:id',  updateRating);
ratingRouter.delete('/:id',  deleteRating);

export default ratingRouter;
