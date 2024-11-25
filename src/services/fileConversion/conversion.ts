import ConvertedFile from "@/api/models/convertedFiles/convertedFile";
import { FileConversionInout } from "./types";
import fs from 'fs';
export const SaveConversion = async (data: FileConversionInout) => {
    const convertedFile = await ConvertedFile.create(data);
    return convertedFile;
};

export const GetConversions = async () => {
    const conversions = await ConvertedFile.find().populate('vendor').populate('createdBy').lean();
    return conversions;
};

export const DownloadConvertedFile = (fileName:string) => {
    const filePath = `./src/convertedFiles/${fileName}`;
    const file = fs.readFileSync(filePath);
    return file;
}

