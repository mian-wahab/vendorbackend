import bcrypt from 'bcryptjs';
import User from '@/api/models/user/user';
import { UserInput } from './types';
import { IUser } from '@/api/models/user/type';
import { IError } from '@/utils/CustomError';
import Ftp from '@/api/models/ftp/ftp';

export const findByEmail = async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ email }).lean();
    return user;
};

export const findById = async (id: string): Promise<IUser | null> => {
    const user = await User.findById(id).lean();
    return user;
};

export const getAll = async (isVendorOnly: boolean = false): Promise<IUser[]> => {
    const query = {
        isVendorOnly
    } as { isVendorOnly: boolean };
    const users = await User.find(query).populate('tasks').lean();
    return users;
}
export const createUser = async (user: UserInput): Promise<IUser> => {
    const findUser = await User.findOne({ $or: [{ email: user?.email }, { username: user?.userName }] }).lean();
    if (findUser) {
        throw new IError('Vendor already exists', 409);
    }
    const password = await bcrypt?.hash(user.password, 10);
    const newUser = new User({ ...user, password });
    return await newUser.save();
};

export const updateUser = async (id: string, user: UserInput): Promise<IUser | null> => {
    const checkUser = await findById(id);
    if (!checkUser) {
        throw new Error('User not found');
    }
    const newPassword = await bcrypt?.hash(user.password, 10);
    const updatedUser = await User.findByIdAndUpdate(id, { ...user, password: newPassword }, { new: true });
    return updatedUser;
}

export const deleteUser = async (id: string): Promise<IUser | null> => {
    const checkUser = await findById(id);
    if (!checkUser) {
        throw new Error('User not found');
    }
    const vendor = await User.findByIdAndDelete(id);
    if(!vendor){
        throw new IError('Vendor not found', 404);
    }
    await Ftp.deleteMany({ user: id });
    return checkUser;
}

export const loginWithEmail = async (user: string, password: string) => {
    const findUser = await User.findOne({ $or: [{ email: user }, { username: user }] }).lean();
    if (!findUser) {
        throw new IError('Invalid Credentials', 401);
    }
    const isMatch = await bcrypt.compare(password, findUser?.password);
    if (!isMatch) {
        throw new IError('Invalid Credentials', 401);
    }
    return findUser;
};