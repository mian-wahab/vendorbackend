import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import _ from "lodash";

import { getAllVendor as getAll } from "@/services/vendor/vendor";

export const getAllVendor = async (req: Request, res: Response) => {
   const allVendor = await getAll();
    return ApiResponse(true, "All Members GET Successfully", allVendor, 200, res);
};