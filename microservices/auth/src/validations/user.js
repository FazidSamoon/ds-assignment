import { Joi } from 'celebrate';

export const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&^()._*?]{8,30}$/)
        .required()
        .error((errors) =>
            errors.map((err) => {
                if (err.code === 'string.pattern.base') err.message = `Password should have at least one lowercase letter, one uppercase letter, one number and one special character and should be at least 8 characters long`;
                return err;
            })
        ),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    role: Joi.string().valid('SELLER', 'CUSTOMER').required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
