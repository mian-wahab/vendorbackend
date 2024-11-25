import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types";
import { ApiResponse } from "@/shared";
import _ from "lodash";


export const Authorization = (permission: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const role = String(req?.user?.role);
      console.log("Authorization::role", role);
      if (!role) {
        ApiResponse(false, "Un-Authenticated, Role is not available", null, 500, res);
      }
      if (!_?.isArray(permission)) {
        ApiResponse(false, "Un-Authenticated, Role is not provided", null, 500, res);
      }
      if (role === "admin" ) {
        return next();
      }
      if ((permission?.some((p) => p === role))) {
        return next();
      }
      // return next();
      return ApiResponse(false, "Un-Authorize, You are not allowed to access this resource", null, 401, res);
    } catch (error) {
      console.log("Authorization::error", JSON?.stringify(error));
      return ApiResponse(false, "Something Went Wrong, Seems you are not authenticated while accessing", error, 500, res);
    }
  };
};