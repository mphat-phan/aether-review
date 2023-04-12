import { StatusCodes } from "http-status-codes";
class UnAuthenticatedError extends Error {
    status: any
    constructor(message: string) {
        super(message);
        this.status = StatusCodes.UNAUTHORIZED;
    }
}

export default UnAuthenticatedError;
