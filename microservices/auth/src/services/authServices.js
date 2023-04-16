import { createUser, getUser, updateUserRepo, verifyUserRepo } from '../repositary/user';
import bcrypt from 'bcrypt';

export const authLogin = async (data) => {
    const { email, password } = data;
    if (!email || !password) return { status: 400, message: 'Please provide username and password.....' };
    const user = await getUser({ email });
    if (!user) return { status: 400, message: 'Username or password incorrect...' };
    const compareHashedPassword = await bcrypt.compare(password, user.password);
    if (!compareHashedPassword) return { status: 400, message: 'Username or password incorrect...' };
    return user;
};

export const authRegister = async (data) => {
    try {
        const { password, firstName, lastName, email, role } = data;
        if (!password || !email || !role || !firstName || !lastName) return { status: 400, message: 'Please provide required fields.....' };

        const user = await getUser({ email });
        if (user) return { status: 400, message: 'User already exists within given email...' };
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
        const hashedPassword = await bcrypt.hash(password, salt);
        const userObject = { ...data, password: hashedPassword };
        const result = await createUser(userObject);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const verifyUserService = async (id) => {
    try {
        const user = await getUser({ _id: id });
        if (!user) return { status: 400, message: 'User not found' };
        if (user.isVerified) return { status: 400, message: 'User already verified' };
        const response = await verifyUserRepo(id);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateUserService = async (id, body) => {
    try {
        const user = await getUser({ _id: id });
        if (!user) return { status: 400, message: 'User not found' };
        const response = await updateUserRepo(id, body);
        return response;
    } catch (error) {
        console.log(error);
    }
};