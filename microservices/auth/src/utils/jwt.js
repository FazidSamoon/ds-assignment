import Jwt from 'jsonwebtoken';

export const generateAccessToken = async (data) => {
    const token = Jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
    return token;
};

export const decodeToken = async (token) => {
    return Jwt.verify(token, process.env.JWT_SECRET_KEY);
};
