import { ApiResponse } from "@/shared";
import { Response } from "express";
import { updateFtp } from "@/services/ftp/ftp";
import { AuthenticatedRequest } from "@/middlewares/types";
import { FtpInput } from "@/services/ftp/types";

export const UpdateFtp = async (req: AuthenticatedRequest, res: Response) => {
   const data = req.body as FtpInput
   const ftpToUpdate = await updateFtp(req?.params?.id, data)
   return ApiResponse(true, "Ftp Updated Successfully", ftpToUpdate, 201, res);
};