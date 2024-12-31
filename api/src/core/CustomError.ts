// Liste de class d'erreur personnalisée

class CustomError extends Error {
    statusCode: number;
    context: any;
    constructor(message: string, statusCode: number, context?: any) {
        super(message);
        this.statusCode = statusCode;
        this.context = context;
    }
}

export class NotFoundError extends CustomError {
    constructor(message = 'Not found', context?: any) {
        super(message, 404, context);
    }
}

export class BadRequestError extends CustomError {
    constructor(message = 'Bad request', context?: any) {
        super(message, 400, context);
    }
}
