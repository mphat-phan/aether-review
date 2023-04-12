import { StatusCodes } from "http-status-codes";
class UnAuthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.status = StatusCodes.UNAUTHORIZED;
    }
}
export default UnAuthenticatedError;
