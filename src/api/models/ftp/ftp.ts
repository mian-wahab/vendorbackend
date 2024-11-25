import { Schema, model } from 'mongoose';
import { IFtp } from './types';
import { FTP_STATUS } from './enums';

const ftpSchema = new Schema<IFtp>({
    host: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(FTP_STATUS),
        default: FTP_STATUS.ACTIVE,
        required: true,
    },
    ftpUser: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});


const Ftp = model<IFtp>('Ftp', ftpSchema);

export default Ftp;