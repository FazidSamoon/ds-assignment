import Express from 'express';
import { loginUser, registerUser, updateUser } from '../controllers/auth';
import { celebrate, Segments } from 'celebrate';
import { loginSchema, registerUserSchema } from '../validations/user';

const authRouter = Express.Router();

authRouter.get('/verify/:id', verifyUser);
authRouter.post('/login', celebrate({ [Segments.BODY]: loginSchema }), loginUser);
authRouter.post('/register', celebrate({ [Segments.BODY]: registerUserSchema }), registerUser);
authRouter.patch('/update/:id', updateUser);

export default authRouter;
