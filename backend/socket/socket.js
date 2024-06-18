import express from "express"
import http from 'http'
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

export const getReceiverSocketId = (receiverId) => {
    return onlineUsersMap[receiverId]
}

let onlineUsersMap = {} // map users to socket.id userId: socketId
io.on("connection", (socket) => {
    console.log("User connected ", socket.id)

    const userId = socket.handshake.query.userId

    if (userId){
        onlineUsersMap[userId] = socket.id
    }

    socket.emit("onlineUsers", Object.keys(onlineUsersMap))

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })
})

export { app, server, io }