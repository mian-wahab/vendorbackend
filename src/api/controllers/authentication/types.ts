import { UserRoles } from "@/api/models/user/enum";


export interface Login {
    email: string;
    password: string;
}

export interface JWTEncryptedData {
    id: string;
    userName: string;
    email: string;
    fullName: string;
    role:UserRoles;
}