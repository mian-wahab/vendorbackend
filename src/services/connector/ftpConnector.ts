import ftp  from 'ftp';
import Client from 'ftp';
import fs from 'fs';
import { IFtp } from '@/api/models/ftp/types'; 

let client: Client;

export const connectFtp = (ftpConfig?: IFtp): Promise<void> => {
    client = new ftp();

    return new Promise((resolve, reject) => {
        client.connect({
            // host: "peachpuff-sparrow-800223.hostingersite.com",
            // user: "u490611197.devadmin",
            // password: "@Devadmin2024@",
            host:"ftp.fitwellhub.com",
            user:"u401759985.admin",
            password:">6466_Zk!}",
        });
        client.on('ready', () => {
            console.log('FTP connection established.');
            resolve();
        });

        client.on('error', (err) => {
            console.error('FTP connection error:', err);
            reject(err);
        });

    });
};

export const listFiles = (remotePath: string): Promise<ftp.ListingElement[]> => {
    return new Promise((resolve, reject) => {
        client.list(remotePath, (err, list) => {
            if (err) {
                reject(err);
            } else {
                resolve(list);
            }
        });
    });
};

export const downloadFile = (remotePath: string, localPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        client.get(remotePath, (err, stream) => {
            if (err) {
                return reject(err);
            }
            stream.once('close', () => {
                console.log('Download completed.');
                resolve();
            });
            stream.pipe(fs.createWriteStream(localPath));
        });
    });
};

export const uploadFile = (localPath: string, remotePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        client.put(localPath, remotePath, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('Upload completed.');
                resolve();
            }
        });
    });
};

export const closeFtpConnection = (): void => {
    if (client) {
        client.end();
        console.log('FTP connection closed.');
    }
};
