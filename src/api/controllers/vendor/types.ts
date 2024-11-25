import { FtpInput } from "@/services/ftp/types";
import { UserInput } from "@/services/user/types";

export interface VendorInput extends UserInput {
    ftps: FtpInput[];
}