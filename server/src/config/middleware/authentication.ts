import jwt from "jsonwebtoken";
import { Request, Response, NextFunction} from "express"
import createHttpError from "http-errors";
import config from "../env.js";
import UserModel from "../../modules/user/user.model.js";
export interface IAuthRequest extends Request {
    user: {
        email?: string | undefined,
        id: string,
        name?: string | undefined
    }
}
export const authMiddleware = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;
        if(!header?.startsWith('Bearer ')){
            throw createHttpError.Unauthorized("Unauthorized")
        }

        const token = header.split(' ')[1]
        jwt.verify(token, config.ACCESS_JWT_SECRET, (err, decoded:any) => {
            if(err || !decoded.id) throw createHttpError.Forbidden("Forbidden")
            req.user = {
                id: decoded.id,
            }
            next()
        })
    } catch (error) {
        next(error)
    }
    
}   
