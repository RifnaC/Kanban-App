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
    origin: ["https://kanban-app-yoya-fyenvffxd-rifnacs-projects.vercel.app"],
    credentials: true
}
app.use(cors(corsOption));
app.options('*', cors(corsOption));
mongoose.connect(process.env.MONGO_URI)

app.use(express.json())
app.use("/auth", userRouter);
app.use("/api", taskRouter);




app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})