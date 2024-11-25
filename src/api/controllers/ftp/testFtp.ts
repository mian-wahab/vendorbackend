import { closeFtpConnection, connectFtp, downloadFile, listFiles, uploadFile } from '@/services/connector/ftpConnector';
import { findFtpById } from '@/services/ftp/ftp';
import { ApiResponse } from "@/shared";
import { Response } from "express";
import _ from "lodash";
import { AuthenticatedRequest } from "@/middlewares/types";
import path from 'path';
import os from 'os';

export const ftpTest = async (req: AuthenticatedRequest, res: Response) => {

    console.log('FTP test');
    
    const ftpId = req.params.id;
    console.log('FTP ID:', ftpId);
    
    const ftpConfig = await findFtpById(ftpId);
    console.log('FTP config:', ftpConfig);

    if (!ftpConfig) {
        throw new Error('FTP configuration not found');
    }

    try {
        const connection = await connectFtp(ftpConfig);
        console.log('FTP connection:', connection);

        const desktopPath = path.join(os.homedir(), 'Desktop', 'downloaded_file.csv');
        const downloadedFile = await downloadFile('./ftp-test/products_export_1.csv', desktopPath); 
        console.log('Downloaded file:', downloadedFile);
    } catch (error) {
        console.error('FTP operation failed:', error);
    } finally {
        closeFtpConnection();
    }

    return ApiResponse(true, "test", {}, 201, res);
};