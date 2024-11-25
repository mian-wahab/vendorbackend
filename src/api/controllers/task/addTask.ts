import { ApiResponse } from "@/shared";
import { Response } from "express";
import _ from "lodash";
import { createNewTask } from "@/services/task/task";
import { TaskInput } from "@/services/task/types";
import { AuthenticatedRequest } from "@/middlewares/types";
import { JWTEncryptedData } from "../authentication/types";

export const AddTask = async (req: AuthenticatedRequest, res: Response) => {
    const task = req.body as TaskInput;
    const addNewUser = await createNewTask(task, req?.user as JWTEncryptedData);
    return ApiResponse(true, "New Task Added Successfully", addNewUser, 201, res);
};