import { Joi } from 'celebrate';

export const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    role: Joi.string().valid('SELLER', 'CUSTOMER').required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
