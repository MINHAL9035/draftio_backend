import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Blog from "../models/blogModel.js";

export const addBlog = asyncHandler(async (req, res) => {
    console.log("req.body", req.body);
    const { title, content } = req.body;
    const userId = req.user._id;
    let imageUrl = null

    if (req.file) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(400).json({ error: 'Failed to upload image to Cloudinary' });
        }
    }
    const blog = await Blog.create({
        title,
        content,
        authorId: userId,
        imageUrl
    })
    console.log(blog);

    res.status(201).json(blog)

})