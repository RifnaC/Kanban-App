import  express from "express";
import bcrypt from 'bcrypt';
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'
const router = express.Router();

router.post("/signup", async(req, res) => {
    const { name, email, password } = req.body;
    const user =await User.findOne({email});
    if(user) {
        return res.status(400).json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });
    await newUser.save();
    return res.status(200).json({message: "Registered successfully"});
})


router.post("/signin", async(req, res) => {
    const { email, password } = req.body;
    const user =await User.findOne({email});
    if(!user) {
        return res.status(400).json({message: "User does not exist"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({message: "Wrong Password"});
    }
    const token = jwt.sign({id:user._id}. process.env.JWT_SECRET, {expiresIn: '1h'});
    res.cookie("token", token, {httpOnly: true, maxAge: 36000});
    res.status(200).json({message: "Logged in successfully"});
})

export { router as userRouter }