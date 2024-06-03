import express from "express";
import { forgotPassword, login, signUp } from "../Controllers/userController.js";
const router = express.Router();

// Sign Up
router.post("/signup", signUp);

// Login
router.post("/login", login)

// forgot password
router.post("/forgot-password", forgotPassword)

export { router as userRouter }