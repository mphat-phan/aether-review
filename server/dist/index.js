var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import router from "./src/config/routes/index.js";
import cors from "cors";
// import xss from "xss-clean";
import corsOptions from "./src/config/cors/corsOption.js";
import cookieParser from "cookie-parser";
import connectMongo from "./src/utils/db/mongo.connect.js";
import helmet from "helmet";
import logger from "./src/config/middleware/logger.js";
import rateLimiter from "./src/config/rate-limiter/index.js";
import * as ENV from "./src/config/env.js";
const app = express();
app.use(rateLimiter);
app.use(express.json());
app.use(helmet());
// app.use(xss());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(logger);
app.use(router);
const con = connectMongo(ENV.MONGO_URI);
app.listen(ENV.PORT, () => {
    console.log(`Server is running in ${ENV.PORT}`);
});
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield con.connection.close();
    process.exit(0);
}));
