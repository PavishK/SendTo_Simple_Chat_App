import { Server } from "socket.io";
import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config({ quiet: true });

const app = express();
const server = new http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    },
});

const onlineUsers = {} // { userId: socketId }

export function receiversSocketId(userId) {
    return onlineUsers[userId];
} 

io.on('connection', (socket)=> {

    const userId = socket.handshake.query.userId;
    if(userId) onlineUsers[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(onlineUsers));

    socket.on('disconnect', ()=> {
        delete onlineUsers[userId];
        io.emit('getOnlineUsers', Object.keys(onlineUsers));
    })

});


export { io, app, server };