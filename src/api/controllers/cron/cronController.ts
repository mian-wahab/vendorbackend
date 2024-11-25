import cronService from '@/services/cronService/cronService';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export class CronController {
  async createCron(req: Request, res: Response): Promise<Response> {
    try {
      const { ftpId, operations, schedule } = req.body;
      const cronJob = await cronService.createCron(new mongoose.Types.ObjectId(ftpId), operations, schedule);
      return res.status(201).json(cronJob);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getCronsByFtp(req: Request, res: Response): Promise<Response> {
    try {
      const { ftpId } = req.params;
      const cronJobs = await cronService.getCronsByFtp(new mongoose.Types.ObjectId(ftpId));
      return res.status(200).json(cronJobs);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateCronStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { cronId, status } = req.body;
      const updatedCron = await cronService.updateCronStatus(new mongoose.Types.ObjectId(cronId), status);
      
      if (!updatedCron) {
        return res.status(404).json({ error: 'Cron job not found' });
      }
      
      return res.status(200).json(updatedCron);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteCron(req: Request, res: Response): Promise<Response> {
    try {
      const { cronId } = req.params;
      await cronService.deleteCron(new mongoose.Types.ObjectId(cronId));
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new CronController();
