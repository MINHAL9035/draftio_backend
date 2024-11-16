import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";

export const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find()
        .populate({
            path: 'authorId',
            select: 'name image ',
        })
        .sort({ createdAt: -1 })
    res.status(200).json(blogs);
})

export const getBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    console.log("id", blogId);
    console.log("typeof blogId", typeof blogId);

    const blog = await Blog.findById(blogId)
        .populate({
            path: 'authorId',
            select: 'name _id'
        })
    res.status(200).json(blog);
})