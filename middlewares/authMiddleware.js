import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    console.log("req",req);
    
    let token;
    token = req.cookies.userJwt
    console.log("token", token);

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next()

        } catch (error) {
            res.status(401);
            throw new Error("Not auhtorized, invalid token")
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

})