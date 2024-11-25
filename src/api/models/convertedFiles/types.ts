import { Document, Types } from "mongoose";
import { CONVERSION_TYPE } from "./enums";

export interface IConvertedFile extends Document {
    _id?: Types.ObjectId;
    filePath: string;
    conversionType: CONVERSION_TYPE;
    vendor?: Types.ObjectId;
    createdBy: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}