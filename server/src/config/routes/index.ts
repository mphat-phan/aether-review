import express from "express";
import UserRouter from "../../modules/user/user.route.js";
import NotFound from "../middleware/notFound.js";
import errorHandler from "../middleware/errorHandler.js";
import path from "path";
import { fileURLToPath } from "url";
import { Request, Response } from "express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.use("/", express.static(path.join(__dirname, "/public")));


router.use("/api/auth", UserRouter);

router.use("/api", (req: Request, res: Response) => {
    res.status(200).json({
        message: "API is running"
    })
})

router.all("*", NotFound);

router.use(errorHandler);

export default router;
