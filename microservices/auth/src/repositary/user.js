// import User from '../models/userModel.js';
import { User } from 'ds-assignment-database-schema-package';

export const createUser = async (user) => {
    try {
        const userObj = (await User.create(user)).toObject();
        return userObj;
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (filters) => {
    try {
        const user = await User.findOne(filters);
        return user;
    } catch (error) {
        console.log(error);
    }
};

export const verifyUserRepo = async (id) => {
    try {
        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: { is_verified: true },
            },
            { new: true }
        );
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const updateUserRepo = async (id, user) => {
    try {
        const userObj = await User.findByIdAndUpdate(
            id,
            {
                $set: user,
            },
            { new: true }
        );
        return userObj;
    } catch (error) {
        console.log(error);
    }
}