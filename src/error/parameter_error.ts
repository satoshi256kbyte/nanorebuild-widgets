export class ParameterError extends Error {
    constructor(e?: string) {
        super(e);
        this.name = new.target.name;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }

        Object.setPrototypeOf(this, new.target.prototype);
    }
}