import { useEffect, useState } from 'react'
import socket from '~/socket'
export default function HomePage() {
    const [clientId, setClientId] = useState('')
    const [message, setMessage] = useState('')
    const [room, setRoom] = useState('')
    useEffect(() => {
        socket.connect()
        socket.on('connect', () => {
            setClientId(socket.id)
        })
        socket.on('joinRoom', (arg) => {
            setMessage(arg)
        })
    }, [])
    // Listen Event
    const sayHelloServer = () => {
        socket.emit('hello', `${socket.id} xin chao`, (response: any) => {
            const { message } = response
            setMessage(message)
        })
    }
    const disconnectServer = () => {
        socket.disconnect()
    }
    const handleJoinRoom = (room: string) => {
        console.log(room)
        socket.emit('joinRoom', room)
    }
    return (
        <>
            <button onClick={sayHelloServer}>Say Hello Server</button>
            <button onClick={disconnectServer}>Disconnect Server</button>
            <div>Client ID: {clientId}</div>
            <div>Message</div>
            <div>{message}</div>
            <input type='text' value={room} onChange={(e) => setRoom(e.target.value)} />
            <button onClick={() => handleJoinRoom(room)}>Join Room</button>
        </>
    )
}
