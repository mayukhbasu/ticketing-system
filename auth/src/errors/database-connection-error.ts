import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason:string = 'Failed to connect to the database';
    statusCode = 500;
    constructor() {
        super('Failed to connect to the database');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeError() {
        return [
            {message: this.reason}
        ]
    }
}