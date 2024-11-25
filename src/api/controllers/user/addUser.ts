import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import _ from "lodash";
import { createUser } from "@/services/user/user";
import { UserInput } from "@/services/user/types";

export const AddUser = async (req: Request, res: Response) => {
    const user = req.body as UserInput;
    const addNewUser = await createUser(user);
    return ApiResponse(true, "New User Added Successfully", addNewUser, 201, res);
};