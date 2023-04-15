import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); 
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    exposedHeaders: ["set-cookie"],
    optionsSuccessStatus: 200,
};

export default corsOptions;
