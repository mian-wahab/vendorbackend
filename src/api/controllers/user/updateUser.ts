import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { updateUser } from "@/services/user/user";
import { UserInput } from "@/services/user/types";


export const UpdateUser = async (req: Request, res: Response) => {
   const id = req?.params?.id as string;
   const user = req?.body as UserInput;
   const updatedUser = await updateUser(id, user)
   return ApiResponse(true, "User updated Successfully", updatedUser, 201, res);
};