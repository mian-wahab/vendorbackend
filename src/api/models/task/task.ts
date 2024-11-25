import { Schema, model } from 'mongoose';
import { ITask } from './type';
import { TaskStatus } from './enum';


const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.PENDING,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true
});


const Task = model<ITask>('Task', taskSchema);

export default Task;
