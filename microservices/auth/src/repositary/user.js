import User from '../models/userModel.js';

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
        if (user.isStaff) {
            return user.populate('staff');
        }
        return user;
    } catch (error) {
        console.log(error);
    }
};
