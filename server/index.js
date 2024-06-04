import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// import http from "http";
// import { Server } from 'socket.io'
import { taskRouter } from "./routes/task.js";
// const socketIO = new Server(http, {
//     cors: {
//         origin: "http://localhost:5173/",
//     }
// })

const app = express();

app.use(cors(
    {
        origin: ["http://localhost:5173/"],
        credentials: true,
    }
))

// socketIO.on('connection', (socket) =>{
//     console.log(`User connected: ${socket.id}`)
//     socket.on('disconnect', () => {
//         socket.disconnect()
//         console.log(`User disconnected: ${socket.id}`)
//     })
// })
app.use(express.json())
app.use("/auth", userRouter);
app.use("/api", taskRouter);


mongoose.connect(process.env.MONGO_URI)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})