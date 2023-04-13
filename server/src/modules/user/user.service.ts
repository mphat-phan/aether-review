import { StatusCodes } from "http-status-codes";
import UserModel, { User } from "./user.model.js";
import createHttpError from "http-errors";
import { Request, Response } from "express";
export type loginParams = {
    email: string,
    password: string,
}
export class UserService {
    async findByEmail(payload: String) {
        return await UserModel.findOne({email: payload})
    }
    async createUser(payload: User){
        const user = await UserModel.create({
            name: payload.name,
            email: payload.email,
            password: payload.password
        });
        return user
    }
    async login(payload: loginParams){
    }
    async refreshToken (req: Request, res: Response){

    }
}