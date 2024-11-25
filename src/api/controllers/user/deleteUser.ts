import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { deleteUser , findById } from "@/services/user/user";

export const Delete = async (req: Request, res: Response) => {
    const id = req?.params?.id as string;
    const DeletedUser = await deleteUser(id);
    return ApiResponse(true, "User Deleted Successfully", DeletedUser, 201, res);
 };