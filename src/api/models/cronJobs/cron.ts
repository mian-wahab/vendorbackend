import { Schema, model } from 'mongoose';
import { ICron } from './types';
import { CronStatus } from './enums';

const cronSchema = new Schema<ICron>({
  ftp: {
    type: Schema.Types.ObjectId,
    ref: 'Ftp',
    required: true,
  },
  operations: [{
    type: String,
    required: true,
    trim: true,
  }],
  schedule: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: Object.values(CronStatus),
    default: CronStatus.PENDING,
    required: true,
  },
  lastRun: {
    type: Date,
  },
  nextRun: {
    type: Date,
    required: true,
  },
 
}, {
  timestamps: true,
});

const Cron = model<ICron>('Cron', cronSchema);

export default Cron;
