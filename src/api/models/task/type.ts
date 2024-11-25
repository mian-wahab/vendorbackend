import { Document, Types } from "mongoose";
import { TaskStatus } from "./enum";

export interface ITask extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  status: TaskStatus;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  dueDate: string;
}