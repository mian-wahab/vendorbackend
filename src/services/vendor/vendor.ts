import bcrypt from 'bcryptjs';
import User from '@/api/models/user/user';
import { UserInput } from './types';
import { IUser } from '@/api/models/user/type';
import { UserRoles } from '@/api/models/user/enum';

export const getAllVendor = async () => {
    const query =  { role: UserRoles.VENDOR };
    const users = await User.find(query).populate('ftps').lean();
    console.log(users?.map(x=>x?.ftps))
    return users;
}

export const addVendor = async (userName: string, email: string, fullName: string): Promise<IUser | null> => {
    try {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const newVendor = new User({
            userName,
            email,
            password: hashedPassword,
            fullName,
            role: UserRoles.VENDOR
        });

        await newVendor.save();
        return newVendor.toObject();
    } catch (error) {
        console.error('Error creating vendor:', error);
        return null;
    }
}


export const updateVendor = async (id: string, vendorData: UserInput): Promise<IUser | null> => {
    const vendor = await User.findById(id);
    if (!vendor || vendor.role !== UserRoles.VENDOR) {
        throw new Error('Vendor not found');
    }
    const newPassword = await bcrypt.hash(vendorData.password, 10);
    const updatedVendor = await User.findByIdAndUpdate(id, { ...vendorData, password: newPassword }, { new: true });
    return updatedVendor;
}

export const deleteVendor = async (id: string): Promise<IUser | null> => {
    const vendor = await User.findById(id);
    if (!vendor || vendor.role !== UserRoles.VENDOR) {
        throw new Error('Vendor not found');
    }
    await User.findByIdAndDelete(id);
    return vendor;
}
