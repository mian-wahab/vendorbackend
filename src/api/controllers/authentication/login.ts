import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { JWTEncryptedData, Login } from "./types";
import { loginWithEmail } from "@/services/user/user";
import { GenerateJwtToken } from "./token";

export const loginWithCredentials = async (req: Request, res: Response) => {
    const { email, password } = req?.body as Login;
    const loginUser = await loginWithEmail(email, password);
    const jwtData: JWTEncryptedData = {
        id: loginUser?._id as string,
        email: loginUser.email,
        fullName: loginUser.fullName,
        role: loginUser.role,
        userName: loginUser.userName
    }
    const token = GenerateJwtToken(jwtData);
    return ApiResponse(true, "Login successful", { email, token }, 200, res);
};


