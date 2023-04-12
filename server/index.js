import express from "express";
import router from "./config/routes/index.js";
import cors from "cors";
import xss from "xss-clean";
import corsOptions from "./config/cors/corsOption.js";
import cookieParser from "cookie-parser";
import connectMongo from "./utils/db/mongo.connect.js";
import helmet from "helmet";
import logger from "./config/middleware/logger.js";
import rateLimiter from "./config/rate-limiter/index.js";
import * as ENV from "./config/env.js";

const app = express();

app.use(rateLimiter);
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(logger);
app.use(router);

const con = connectMongo(ENV.MONGO_URI);
app.listen(ENV.PORT, () => {
    console.log(`Server is running in ${ENV.PORT}`);
});

process.on("SIGINT", async () => {
    await con.connection.close();
    process.exit(0);
});
