import { Document, Types } from "mongoose";
import { FTP_STATUS } from "./enums";

export interface IFtp extends Document {
    _id: Types.ObjectId;
    host: string;
    ftpUser: string;
    password: string;
    isSecure: boolean;
    status: FTP_STATUS;
    createdBy: Types.ObjectId;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}