import { Schema, model } from 'mongoose';
import { CONVERSION_TYPE } from './enums';
import { IConvertedFile } from './types';

const ConvertedFileSchema = new Schema<IConvertedFile>({
    filePath: {
        type: String,
        required: true,
    },
    conversionType: {
        type: String,
        enum: Object.values(CONVERSION_TYPE),
        default: CONVERSION_TYPE.MANUAL,
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});


const ConvertedFile = model<IConvertedFile>('ConvertedFile', ConvertedFileSchema);

export default ConvertedFile;
