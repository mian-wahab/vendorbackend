export interface ValidationErrorDetail {
    message: string;
    path: string[];
    type: string;
    context: {
        label: string;
        key: string;
    };
}

export interface CustomError extends Error {
    details: Map<string, {
        message: string;
        _original: object;
        details: ValidationErrorDetail[];
    }>;
}