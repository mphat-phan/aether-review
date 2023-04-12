import express from "express";
import { auth } from "./user.controller.js";
const router = express.Router();
router.route("/login").get(auth);
export default router;
