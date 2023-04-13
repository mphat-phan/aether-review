import connectMongo from "./src/utils/db/mongo.connect.js";
import config from "./src/config/env.js";
import ExpressLoader from "./express.js";

const express = new ExpressLoader();
const con = connectMongo(config.MONGO_URI);
declare global {
    namespace Express {
        interface Request{
            user: any
        }
    }
}
process.on("SIGINT", async () => {
    await con.connection.close();
    process.exit(0);
});
