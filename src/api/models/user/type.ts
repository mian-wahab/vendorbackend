import { Document } from "mongoose";
import { UserRoles } from "./enum";

export interface IUser extends Document {
    _id: string;
    userName: string;
    email: string;
    password: string;
    fullName: string;
    role:UserRoles;
    ftps:[]
    createdAt: string;
    updatedAt: string;
  }