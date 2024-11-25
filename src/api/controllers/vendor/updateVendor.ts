import { ApiResponse } from "@/shared";
import { Response } from "express";
import { updateUser } from "@/services/user/user";
import { UserRoles } from "@/api/models/user/enum";
import { VendorInput } from "./types";
import { bulkUpdate } from "@/services/ftp/ftp";
import { UserInput } from "@/services/user/types";
import { AuthenticatedRequest } from "@/middlewares/types";

export const UpdateUser = async (req: AuthenticatedRequest, res: Response) => {
   const id = req?.params?.id as string;
   const user = req?.body as VendorInput;
   req.body.role = UserRoles.VENDOR;
  
   const userToUpdate = {
      userName:req?.body?.userName,
      email:req?.body?.email,
      fullName:req?.body?.fullName,
      role:req?.body?.role,
      password:'12345678'
   } as UserInput
   const updatedUser = await updateUser(id, userToUpdate);
   const updateFTP = await bulkUpdate(user?.ftps, updatedUser?._id as string, req?.user?.id as string)
   return ApiResponse(true, "Member Updated Successfully", {updatedUser, updateFTP}, 201, res);
};