import { JWTExpirationTime } from "./enum";
import { JWTEncryptedData } from "./types";
import jwt from 'jsonwebtoken';


export const GenerateJwtToken = (jwtData:JWTEncryptedData) => {
    const token = jwt?.sign(jwtData, process?.env?.JWT_SECRET as string, { expiresIn: JWTExpirationTime.ACCESS }) as string;
    return token;
}