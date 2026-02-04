import { AppError } from "../errors/index.js";
import { ProblemDetails } from "../../../shared/src/schemas/common.schema.js"
import { Request } from "express";


/**
 * Converts an error to a response containing a rfc7807 object
 * 
 * @param error The error that was raised
 * @param req The current request
 * @returns A response containing the error object in the rfc7807 format
 */
export function errorToHttpResponse(error: unknown, req: Request) {
    const instance = req.originalUrl;
    if (error instanceof AppError) {
        return {
            status: error.statusCode,
            body: {
                type: `https://httpstatuses.com/${error.statusCode}`,
                title: error.name,
                status: error.statusCode,
                detail: error.message,
                instance,
            } as ProblemDetails,
        };
    }

    return {
        status: 500 as const,
        body: {
            type: 'https://httpstatuses.com/500',
            title: 'Internal Server Error',
            status: 500,
            detail: 'An unexpected error occurred',
            instance,
        } as ProblemDetails,
    };
}