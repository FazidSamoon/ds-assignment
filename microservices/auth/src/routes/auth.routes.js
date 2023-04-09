import Express from 'express';
import { loginUser, registerUser } from '../controllers/auth';
import { celebrate, Segments } from 'celebrate';
import { loginSchema, registerUserSchema } from '../validations/user';

const authRouter = Express.Router();

authRouter.post('/login', celebrate({ [Segments.BODY]: loginSchema }), loginUser);
authRouter.post('/register', celebrate({ [Segments.BODY]: registerUserSchema }), registerUser);

export default authRouter;
