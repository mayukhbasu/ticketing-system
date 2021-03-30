import { CustomError } from "./custom-error";

export class BadRequesterror extends CustomError{
    statusCode: number = 400;  
    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequesterror.prototype);
    }  
    serializeError(): { message: string; field?: string | undefined; }[] {
        return [
            {message: this.message}
        ]
    }


}