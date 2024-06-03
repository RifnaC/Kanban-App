import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
app.use(cors(
    {
        origin: " http://localhost:5173/",
        credentials: true
    }
))
app.use(express.json())
app.use("/auth", userRouter)


mongoose.connect(process.env.MONGO_URI)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})