import asyncHandler from '../middlewares/async';
import { authLogin, authRegister } from '../services/authServices';
import { generateAccessToken } from '../utils/jwt';
import { makeResponse } from '../utils/response';

export const loginUser = async (req, res) => {
    const user = await authLogin(req.body);
    if (!user) return makeResponse({ res, status: 500, message: 'Login failed...' });
    if (user.status) return makeResponse({ res, ...user });
    const { password, ...otherDetails } = user._doc;
    const accessToken = await generateAccessToken(otherDetails);
    return makeResponse({
        res,
        status: 200,
        data: { otherDetails, token: accessToken },
        message: 'User login successfull...'
    });
};

export const registerUser = async (req, res) => {
    if (req.user) return makeResponse({ res, status: 400, message: "You've already registered for an account." });
    const user = await authRegister(req.body);
    if (!user) return makeResponse({ res, status: 500, message: 'Registration failed...' });
    if (user.status) return makeResponse({ res, ...user });
    const { password, ...otherDetails } = user;
    const accessToken = await generateAccessToken(otherDetails);

    return makeResponse({
        res,
        status: 200,
        data: { otherDetails, token: accessToken },
        messsage: 'User creation successfull...'
    });
};
