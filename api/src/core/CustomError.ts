// Liste de class d'erreur personnalisée

class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class NotFoundError extends CustomError {
    constructor(message = 'Not found') {
        super(message, 404);
    }
}

export class BadRequestError extends CustomError {
    constructor(message = 'Bad request') {
        super(message, 400);
    }
}
