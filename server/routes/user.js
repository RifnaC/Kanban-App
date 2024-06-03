import express from "express";
import bcrypt from 'bcrypt';
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });
    await newUser.save();
    return res.status(200).json({ message: "Registered successfully" });
})

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Wrong Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie("token", token, { httpOnly: true, maxAge: 36000 });
    res.status(200).json({ message: "Logged in successfully" });
})

// forgot password
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Reset Password",
            text: `Please click on the link below to reset your password \n http://localhost:5143/reset-password/${token}`,
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return res.status(500).json({ message: "Something went wrong while sending email" });
            } else {
                return res.status(200).json({ message: "Email has been sent" });
            }
        });

    } catch (error) {

}
})
export { router as userRouter }