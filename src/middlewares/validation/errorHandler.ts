import { ApiResponse } from '@/shared';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { CustomError } from './types';

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    console.log("errorHandler::error", err?.details)
   const errors = Array.from((err as CustomError).details.entries()).map(([key, value]) => ({
        key,
        message: value.message,
        original: value._original,
        details: value.details
      }));
    console.log("validationErrorHandler ::errors", errors);
    return ApiResponse(false, "Validation Error", errors, 422, res);
};

export default errorHandler;
