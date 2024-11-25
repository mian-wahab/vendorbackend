import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { deleteTask } from "@/services/task/task";
import { AuthenticatedRequest } from "@/middlewares/types";
import { JWTEncryptedData } from "../authentication/types";

export const Delete = async (req: AuthenticatedRequest, res: Response) => {
    const id = req?.params?.id as string;
    const DeletedTask = await deleteTask(id, req?.user as JWTEncryptedData);
    return ApiResponse(true, "User Deleted Successfully", DeletedTask, 201, res);
 };