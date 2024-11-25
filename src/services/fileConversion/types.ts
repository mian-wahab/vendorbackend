import { CONVERSION_TYPE } from "@/api/models/convertedFiles/enums";

export interface FileConversionInout {
    filePath: string;
    conversionType: CONVERSION_TYPE;
    vendor?: string;
    createdBy: string;
}