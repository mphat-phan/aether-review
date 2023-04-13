import express from "express";
import helmet from "helmet";
import logger from "./src/config/middleware/logger.js";
import rateLimiter from "./src/config/rate-limiter/index.js";
import router from "./src/config/routes/index.js";
import cors from "cors";
import xss from "xss-clean";
import corsOptions from "./src/config/cors/corsOption.js";
import cookieParser from "cookie-parser";
import config from "./src/config/env.js";

class ExpressLoader {
    private server;
    constructor(){
        const app = express()
        app.use(rateLimiter);
        app.use(express.json());
        app.use(helmet());
        app.use(xss());
        app.use(express.urlencoded({ extended: false }));
        app.use(cors(corsOptions));
        app.use(cookieParser());
        app.use(logger);
        app.use(router);
        
        this.server = app.listen(config.PORT, () => {
            console.log(`Server is running in ${config.PORT}`);
        });
    }
    get Server(){
        return this.server
    }
}

export default ExpressLoader