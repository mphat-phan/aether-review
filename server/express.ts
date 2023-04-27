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
import { createServer } from "http";
import { Server } from "socket.io"
class ExpressLoader {
    private server;
    private io;
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
        const httpServer = createServer(app)
        this.io = new Server(httpServer, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        })
        this.server = httpServer.listen(config.PORT, () => {
            console.log(`Server is running in ${config.PORT}`);
        });
    }
    get Server(){
        return this.server
    }
    get socketIO(){
        return this.io
    }
}

export default ExpressLoader