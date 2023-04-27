import { io } from "socket.io-client"

const socket = io('http://localhost:5000', {
    autoConnect: false
})

socket.on('hello', (arg) => {
    console.log(arg)
})

export default socket
