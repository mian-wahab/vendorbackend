import { FtpInput } from './types';
import { IError } from '@/utils/CustomError';
import Ftp from '@/api/models/ftp/ftp';
import { IFtp } from '@/api/models/ftp/types';
import { closeFtpConnection, connectFtp, downloadFile } from '../connector/ftpConnector';

export const findFtpById = async (id: string): Promise<IFtp | null> => {
    const FtpData = await Ftp.findById(id).lean();
    return FtpData;
};

export const getAll = async (): Promise<IFtp[]> => {
    const users = await Ftp.find().populate('user').populate('createdBy').lean();
    return users;
}

export const createFtpInBulk = async (ftp: FtpInput[]) => {
    const newFtp = await Ftp.insertMany(ftp);
    return newFtp;
}
export const createFtp = async (ftp: FtpInput): Promise<IFtp> => {
    const findFtp = await Ftp.findOne({ $or: [{ host: ftp?.host, ftpUser: ftp?.ftpUser }] }).lean();
    if (findFtp) {
        throw new IError('Ftp already exists', 409);
    }
   return await Ftp.create(ftp);
};

export const updateFtp = async (id: string, user: FtpInput): Promise<IFtp | null> => {
    const checkUser = await findFtpById(id);
    if (!checkUser) {
        throw new Error('User not found');
    }
    const updatedUser = await Ftp.findByIdAndUpdate(id, user, { new: true });
    return updatedUser;
}

export const bulkUpdate = async (ftp:FtpInput[], userId:string, currentUser:string) => {
    await Ftp.deleteMany({user: userId});
    const FtpsToAdd = [...ftp]
    FtpsToAdd?.forEach(x => {
        x.createdBy = currentUser;
        x.user = userId
    });
    const newFtps = await Ftp.insertMany(FtpsToAdd);
    return newFtps
}

export const deleteFtp = async (id: string): Promise<IFtp | null> => {
    const ftp = await findFtpById(id);
    if (!ftp) {
        throw new Error('Ftp not found');
    }
    await Ftp.findByIdAndDelete(id);
    return ftp;
}