import createError from "http-errors";
import { Request, Response, NextFunction} from "express"
const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const a = true;
        if (a) {
            throw createError.NotFound("Hello");
        }
        res.status(200).json({
            message: "Success",
        });
    } catch (error) {
        next(error);
    }
};

export { auth };
