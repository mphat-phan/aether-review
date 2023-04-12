import createError from "http-errors";
import {Request, Response} from 'express';

const NotFound = (req: Request, res: Response) => {
    throw createError.NotFound("This route is not exist");
};

export default NotFound;
