import Cron from '@/api/models/cronJobs/cron';
import { CronStatus } from '@/api/models/cronJobs/enums';
import { ICron } from '@/api/models/cronJobs/types';
import mongoose from 'mongoose';
import { downloadFileFromFtp } from '../file/file';

export class CronService {
  async createCron(ftpId: mongoose.Types.ObjectId, operations: string[], schedule: string, createdBy?: mongoose.Types.ObjectId): Promise<ICron> {
    const nextRun = this.getNextRunTime(schedule);
    
    const cronJob = new Cron({
      ftp: ftpId,
      operations,
      schedule,
      status: CronStatus.PENDING,
      nextRun,
      // createdBy,
    });

    return await cronJob.save();
  }

  async getCronsByFtp(ftpId: mongoose.Types.ObjectId): Promise<ICron[]> {
    return await Cron.find({ ftp: ftpId }).populate('ftp').exec();
  }

  async getAllCrons(): Promise<ICron[]> {
    return await Cron.find().populate('ftp').exec();
  }

  async updateCronStatus(cronId: mongoose.Types.ObjectId, status: CronStatus, lastRun?: Date): Promise<ICron | null> {
    const cronJob = await Cron.findById(cronId);
    if (!cronJob) {
      return null;
    }
    return await Cron.findByIdAndUpdate(
      cronId,
      { status, lastRun, nextRun: this.getNextRunTime(cronJob.schedule) },
      { new: true }
    )
  }

  async deleteCron(cronId: mongoose.Types.ObjectId): Promise<void> {
    await Cron.findByIdAndDelete(cronId);
  }

  getNextRunTime(schedule: string): Date {
    const nextRunDate = new Date(schedule); 
    return nextRunDate;
  }

  async getRecentPendingCrons(givenTime: Date): Promise<ICron[]> {
    const fifteenMinutesBefore = new Date(givenTime.getTime() - 15 * 60 * 1000);
    try {
      const crons = await Cron.find({
        status: CronStatus.PENDING,
        nextRun: {
          $gte: fifteenMinutesBefore,
          $lte: givenTime,
        },
      }).exec();

      return crons;
    } catch (error) {
      console.error('Error fetching recent pending crons:', error);
      throw error;
    }
  }

  async processCronJob(cronJob: ICron): Promise<void> {
    if (cronJob.operations.includes('download')) {
      console.log('Downloading file from ftp:', cronJob.ftp);
      await downloadFileFromFtp(cronJob);
    }
  }
}

export default new CronService();
