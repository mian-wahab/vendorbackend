import { IError } from "@/utils/CustomError";
import { findFtpById } from "../ftp/ftp";
import { closeFtpConnection, connectFtp, downloadFile } from "../connector/ftpConnector";
import path from 'path';
import os from 'os';
import cronService from "../cronService/cronService";
import { ICron } from "@/api/models/cronJobs/types";
import { CronStatus } from "@/api/models/cronJobs/enums";

export const downloadFileFromFtp = async (cronJob: ICron) => {
   try {
    const remotePath = './ftp-test/products_export_1.csv';
    const localPath = path.join(os.homedir(), 'Desktop', path.basename(remotePath));
    const ftpConfig = await findFtpById(cronJob?.ftp.toString());
    // if (ftpConfig) {
    //     await connectFtp(ftpConfig);
    // } else {
    //     await connectFtp();
    // }
    await connectFtp();
    const downloadedFile = await downloadFile(remotePath, localPath);
    closeFtpConnection();
    await cronService.updateCronStatus(cronJob.id, CronStatus.COMPLETED, new Date());
    return downloadedFile;
   } catch (error) {
       console.error('FTP operation failed:', error);
   }
}