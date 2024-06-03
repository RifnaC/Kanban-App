import express from "express";
import { authorized, forgotPassword, login, logout, resetPassword, signUp, verifyToken } from "../Controllers/userController.js";
const router = express.Router();

// Sign Up
router.post("/signup", signUp);

// Login
router.post("/login", login)

// verify token
router.get("/verify",verifyToken, authorized)

// forgot password
router.post("/forgot-password", forgotPassword)

// reset password
router.post("/reset-password/:token", resetPassword) 

// verify token
router.get("/logout", logout)

export { router as userRouter }