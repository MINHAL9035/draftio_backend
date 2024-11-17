import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";

export const getAllBlogs = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;

    const skip = (page - 1) * pageSize;

    const total = await Blog.countDocuments();
    console.log("type", typeof total);


    const blogs = await Blog.find()
        .populate({
            path: 'authorId',
            select: 'name image',
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize);

    res.status(200).json({
        blogs,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize)
    });
});

export const getLatestBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find()
        .populate({
            path: 'authorId',
            select: 'name image ',
        })
        .sort({ createdAt: -1 })
        .limit(3);
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