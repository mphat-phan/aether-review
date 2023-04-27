import connectMongo from "./src/utils/db/mongo.connect.js";
import config from "./src/config/env.js";
import ExpressLoader from "./express.js";

const express = new ExpressLoader();
const io = express.socketIO
io.on("connection", (socket) => {
    console.log(`${socket.id} connected`)
    socket.broadcast.emit('hello', `${socket.id} connected`)
    socket.on('disconnect',(reason)=>{
        console.log(reason)
        socket.broadcast.emit('hello', `${socket.id} diconnected`)
    })
    socket.on('hello', (arg, callback) =>{
        console.log(arg)
        callback({
            message: 'Hi Client'
        }) 
    })
    socket.on('joinRoom', (arg) => {
        socket.join(arg)
        io.to(arg).emit('joinRoom', `${socket.id} already joined room`)
    })
})
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
