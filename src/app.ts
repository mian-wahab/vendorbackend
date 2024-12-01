import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { isCelebrateError } from 'celebrate';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
import routes from './api/routes';
import errorHandler from './middlewares/validation/errorHandler';
import dbConnector from './config/database';
import cron from 'node-cron';
import { closeFtpConnection, connectFtp, downloadFile } from './services/connector/ftpConnector';
import path from 'path';
import os from 'os';
import cronService from './services/cronService/cronService';

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(json({ limit: '50mb' }));

app.use(express.json());

// Configure CORS
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests from specific origins or any origin during development
        const allowedOrigins = ['http://localhost:3000', 'https://toplinemcnamaraswebapp.vercel.app/']; // Replace with your front-end URL(s)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(helmet());

dbConnector();

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Vendor-Management.');
});

app.use('/api/v1', routes);

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
        return errorHandler(err, req, res, next);
    }
});

cron.schedule(
    '*/15 * * * *',
    async () => {
        const pendingCrons = await cronService.getRecentPendingCrons(new Date());
        console.log('Pending crons:', pendingCrons);
        for (const cronJob of pendingCrons) {
            await cronService.processCronJob(cronJob);
        }
    },
    {
        scheduled: true,
    }
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
