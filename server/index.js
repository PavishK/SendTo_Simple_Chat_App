import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { app, server } from './lib/socket.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';

dotenv.config({ quiet: true });

const client_url = process.env.CLIENT_URL;
const port = process.env.PORT;
const date = new Date();

app.use(cors({
    origin: client_url,
    credentials: true,
}));

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    console.log(`\x1b[33m# ${date.toLocaleString()} REQUEST →  \x1b[36m${req.ip}\x1b[0m`);
    return res.send("<h1>SERVER RUNNING</h1>");
})

app.use('/api/auth', authRoutes);
app.use("/api/message", messageRoutes);


server.listen( port, () => {
    console.log("\n\t\x1b[1;33m→ Server running on \x1b[4;36mhttp://localhost:"+port+"\x1b[0m");
    connectDB();
});