import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { clearTokenCookies } from "../utils/clearCookies.js";

export const registerUser = asyncHandler(async (req, res) => {
    console.log("req", req.body);
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email })
    if (existUser) {
        res.status(400).json({
            success: false,
            message: 'user is already exist with this mail-Id',
        })
        throw new Error('user is already exist with this mail-Id')
    }

    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        generateToken(res, user._id, 'userJwt')
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
})


export const logout = asyncHandler(async (req, res) => {
    clearTokenCookies(res)
    res.status(200).json({
        message: "Logged out successfully",
    });
})


export const signin = asyncHandler(async (req, res) => {
    const { nameOrEmail, password } = req.body;
    console.log("req", req.body);

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nameOrEmail);
    console.log("isEmail",isEmail);
    


    const user = isEmail
        ? await User.findOne({ email: nameOrEmail })
        : await User.findOne({ name: nameOrEmail });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id, 'userJwt');
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image
        })
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }
})