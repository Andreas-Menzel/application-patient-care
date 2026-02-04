type HttpErrorCode = 400 | 404 | 409 | 500;

export class AppError extends Error {
    public statusCode: HttpErrorCode = 500;

    constructor(message: string, statusCode: HttpErrorCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class InternalServerError extends AppError {
    constructor(message: string) {
        super(message, 500);
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string, id: string | number) {
        super(`${resource} with id ${id} not found`, 404);
    }
}
