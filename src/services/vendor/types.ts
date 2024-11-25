import { UserRoles } from "@/api/models/user/enum";

export interface UserInput {
    userName: string;
    email: string;
    fullName: string;
    password: string;
    role:UserRoles;
}