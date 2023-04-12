import { StatusCodes } from "http-status-codes";
class BadRequestError extends Error {
    status: any;
    constructor(message: string) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequestError;
