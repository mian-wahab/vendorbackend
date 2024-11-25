import { ApiResponse } from "@/shared";
import { Response } from "express";
import _ from "lodash";
import { createFtp, createFtpInBulk } from "@/services/ftp/ftp";
import { AuthenticatedRequest } from "@/middlewares/types";
import { FtpInput } from "@/services/ftp/types";

export const AddFtp = async (req: AuthenticatedRequest, res: Response) => {
    const data = req.body as FtpInput
    req.body.createdBy = req?.user?.id;
    req.body.isSecure = true;
    const newFtp = await createFtp(data)
    return ApiResponse(true, "New Ftp Added Successfully", newFtp, 201, res);
};