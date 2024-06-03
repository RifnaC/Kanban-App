import bcrypt from 'bcrypt';
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();

// Sign Up
export const signUp = async (req, res) => {
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
}

// Login
export const login = async (req, res) => {
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
}

// verify token
export const verifyToken = async (req, res, next) => {
    try {
        console.log(req.cookies)
        const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// forgot password
export const forgotPassword = async (req, res) => {
    try {
        const email  = req.body.email;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
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
            text: `Please click on the link below to reset your password.\n http://localhost:5173/reset-password/${token}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return res.status(500).json({ message: "Something went wrong while sending email" });
            } else {
                return res.status(200).json({ message: "Email has been sent" + info.response });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong"});
    }
}

// reset password
export const resetPassword = async(req, res) => {
    const token = req.params.token;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
        try {
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Passwords do not match" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const id = decoded.id;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
            return res.status(200).json({ message: "Password reset successfully" });
        } catch (error) {
            res.status(400).json({ message: "Invalid or expired token" });
        }

}

export const authorized = async(req, res) => {
    if(req.user){
        res.status(200).json({ message: "Authorized" });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
    
}

export const logout = async(req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}