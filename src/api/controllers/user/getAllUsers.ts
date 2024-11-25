import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { getAll } from "@/services/user/user";

export const GetAllUser = async (req: Request, res: Response) => {
    const fields = await getAll();
    return ApiResponse(true, "Users Fetched Successfully", fields, 200, res);
};