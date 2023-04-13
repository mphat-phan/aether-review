import express from "express";
import { login,register,getUsers,refreshToken } from "./user.controller.js";
import { authMiddleware } from "../../config/middleware/authentication.js";

const router = express.Router();
router.route("/login").post(login);
router.route("/").post(register)
router.route("/users").get(authMiddleware, getUsers)
router.route("/refresh-token").get(refreshToken)


export default router;
