import { getAll } from "@/services/ftp/ftp";
import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import _ from "lodash";


export const getAllFtp = async (req: Request, res: Response) => {
   const allVendor = await getAll();
    return ApiResponse(true, "All Vendor GET Successfully", allVendor, 200, res);
};
