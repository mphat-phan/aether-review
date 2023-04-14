import UserModel, { User } from "./user.model.js";
import { Request, Response, NextFunction} from "express"
import { UserService, loginParams } from "./user.service.js";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken"
import config from "../../config/env.js";
const userService = new UserService();
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, _password } = req.body;

        if(!email && !_password) throw createHttpError.BadRequest("Something wrongs!!");

        const user = await userService.findByEmail(email)

        // Kiểm tra user đã đăng ký
        if(!user){
            throw createHttpError.BadRequest("User not exist!")
        }

        // Kiểm tra khớp password
        const match = await user.matchPassword(_password);
        if(!match){
            throw createHttpError.Unauthorized("User not match password!")
        }

        const {password, ...updateUser} = user.toJSON()
        const accessToken = await user.createAccessJWT()
        const refreshToken = await user.createRefreshJWT()
        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 1 *24 * 60 * 60 * 1000 });
        
        res.status(StatusCodes.OK).send({
            status: StatusCodes.OK,
            data: {
                user: updateUser,
                token: accessToken
            }
        })
    } catch (error) {
        next(error);
    }
};

const register = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password} = req.body;
        const existUser = await userService.findByEmail(email);
        if(existUser){
            throw createHttpError.BadRequest("Email đã tồn tại")
        }

        const createUserParams: User = {name, email, password}
        const createUser = await userService.createUser(createUserParams)
        res.status(StatusCodes.CREATED).send({
            status: StatusCodes.CREATED,
            data: {
                user: createUser
            }
        })
    } catch (error) {
        next(error)
    }
}

const getUsers = async(req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: "Success"
    })
}

const refreshToken = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies;
        if(!cookies?.jwt) throw createHttpError.Forbidden("Something wrong")
        const refreshToken = cookies.jwt;
        jwt.verify(refreshToken, config.REFRESH_JWT_SECRET, (err: any, decoded: any) => {
            if(err || !decoded.id) throw createHttpError.Forbidden("Somthing wrongs");
            const accessToken = jwt.sign({ id: decoded.id}, config.ACCESS_JWT_SECRET);
            res.json({
                token: accessToken
            }) 
        })
    } catch (error) {
        next(error)
    }
    
}

export { 
    login,
    register,
    getUsers,
    refreshToken
};
