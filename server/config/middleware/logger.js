import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let logStream = fs.createWriteStream(
    path.join(__dirname, "..", "..", "logs", "file.log"),
    {
        flags: "a",
    }
);

const logger = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    {
        stream: logStream,
    }
);

export default logger;
