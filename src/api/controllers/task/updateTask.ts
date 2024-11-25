import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { TaskInput } from "@/services/task/types";
import { updateTask } from "@/services/task/task";
import { AuthenticatedRequest } from "@/middlewares/types";
import { JWTEncryptedData } from "../authentication/types";


export const UpdateTask = async (req: AuthenticatedRequest, res: Response) => {
   const id = req?.params?.id as string;
   const task = req?.body as TaskInput;
   const updatedUser = await updateTask(id, task, req?.user as JWTEncryptedData);
   return ApiResponse(true, "Task Updated Successfully", updatedUser, 201, res);
};