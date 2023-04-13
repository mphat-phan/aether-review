import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/",
    ACCESS_JWT_SECRET: process.env.ACCESS_JWT_SECRET || "emptytoken",
    ACCESS_JWT_LIFETIME: process.env.ACCESS_JWT_LIFETIME || "emptytoken",
    REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET || "emptytoken",
    REFRESH_JWT_LIFETIME: process.env.REFRESH_JWT_LIFETIME || "emptytoken",
}

export default config;