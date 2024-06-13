import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { taskRouter } from "./routes/task.js";

const app = express();

const corsOption  ={
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}
app.use(cors(corsOption));
app.options('*', cors(corsOption));

app.use(express.json())
app.use("/auth", userRouter);
app.use("/api", taskRouter);


mongoose.connect(process.env.MONGO_URI)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})