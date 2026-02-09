import { Response, NextFunction } from 'express';
import { RequestValidationError } from '@ts-rest/express';
import { logger } from '../utils/logger.js';
import { ProblemDetails } from 'shared';

function extractErrors(zodError: { issues: Array<{ path: (string | number)[]; message?: string }> } | null, prefix: string): string[] {
    if (!zodError) return [];
    return zodError.issues.map(issue => {
        const path = issue.path.join('.');
        const fullPath = path ? `${prefix}.${path}` : prefix;
        return `${fullPath}: ${issue.message ?? 'Invalid value'}`;
    });
}

export function validationErrorHandler(
    err: RequestValidationError,
    req: { originalUrl: string; method: string },
    res: Response,
    _next: NextFunction
): void {
    const errors: string[] = [
        ...extractErrors(err.body, 'body'),
        ...extractErrors(err.query, 'query'),
        ...extractErrors(err.pathParams, 'params'),
        ...extractErrors(err.headers, 'headers'),
    ];

    logger.warn('Validation failed', {
        path: req.originalUrl,
        method: req.method,
        errors
    });

    const problemDetails: ProblemDetails = {
        type: 'https://httpstatuses.com/400',
        title: 'Validation Error',
        status: 400,
        detail: errors.join('; '),
        instance: req.originalUrl,
    };

    res.status(400).json(problemDetails);
}
