import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import _ from "lodash";
import { createUser } from "@/services/user/user";
import { UserRoles } from "@/api/models/user/enum";
import { VendorInput } from "./types";
import { createFtpInBulk } from "@/services/ftp/ftp";
import { AuthenticatedRequest } from "@/middlewares/types";
import { IFtp } from "@/api/models/ftp/types";
import { Types } from "mongoose";

export const AddVendor = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.body as VendorInput;
    let password = '12345678';
    user.password = password;
    req.body.role = UserRoles.VENDOR;
    const addNewVendor = await createUser(user);
    let ftps;
    if(addNewVendor?._id) {
        let ftpData = user?.ftps;
        ftpData?.forEach(x => {
            x.createdBy = req?.user?.id as string;
            x.user = addNewVendor._id;  
            x.isSecure = true;
        })
        console.log('ftpData', ftpData);
        ftps = await createFtpInBulk(ftpData);
    } else {
        throw new Error('Member not created');
    }
    return ApiResponse(true, "New Member Added Successfully", {addNewVendor, ftps}, 201, res);
};