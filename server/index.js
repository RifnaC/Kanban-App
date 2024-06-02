import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import cors from "cors";

const app = express();

dotenv.config();
app.use(cors())
app.use(express.json())
app.use("/auth", userRouter)


mongoose.connect(process.env.MONGO_URI)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})