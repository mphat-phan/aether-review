import mongoose, { model, Model, InferSchemaType, Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/env.js";
interface IUser {
    name: string,
    email: string,
    password: string,
}

type UserModel = Model<IUser, {}, IUserMethods>;

interface IUserMethods extends IUser, Document{
    matchPassword(enterPassword: string): Promise<boolean>;
    createAccessJWT(): Promise<string>;
    createRefreshJWT(): Promise<string>;
}
const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: [6, "Minimum name length is 6 words"],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6
    }
})

export type User = InferSchemaType<typeof UserSchema>;

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.method("matchPassword", async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
})

UserSchema.method("createAccessJWT", async function (){
    return jwt.sign(
        { id: this._id },  
        config.ACCESS_JWT_SECRET, 
        { expiresIn: config.ACCESS_JWT_LIFETIME }
    )
}) 

UserSchema.method("createRefreshJWT", async function () {
    return jwt.sign(    
        {id: this._id}, 
        config.REFRESH_JWT_SECRET, 
        {expiresIn: config.REFRESH_JWT_LIFETIME}
    )
})

const UserModel = model<IUser, UserModel>('User', UserSchema);
export default UserModel;