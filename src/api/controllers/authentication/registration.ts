import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import _ from "lodash";
import { UserInput } from "@/services/user/types";
import { createUser } from "@/services/user/user";
import { UserRoles } from "@/api/models/user/enum";
import { JWTEncryptedData } from "./types";
import { GenerateJwtToken } from "./token";


export const RegistrationHandler = async (req: Request, res: Response) => {
    const user = req?.body as UserInput;
    user.role = UserRoles.USER;
    const addNewUser = await createUser(user);
    const jwtData: JWTEncryptedData = {
        id: addNewUser?._id as string,
        email: addNewUser.email,
        fullName: addNewUser.fullName,
        role: addNewUser.role,
        userName: addNewUser.userName
    }
    const token = GenerateJwtToken(jwtData);
    return ApiResponse(true, "User Registered Successfully", { user: addNewUser, token }, 201, res);
};