import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";
import cloudinary from "../utils/cloudinary.js";

export const deleteBlog = asyncHandler(async (req, res) => {
    let blog = await Blog.findById(req.params.blogId);
    if (!blog) {
        res.status(404);
        throw new Error('Blog Not Found');
    }

    if (blog.imageUrl) {
        const publicId = blog.imageUrl.split('/').pop().split('.')[0];
        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            console.error('Cloudinary deletion error:', error);
            return res.status(400).json({ error: 'Failed to delete image from Cloudinary' });
        }
    }
    await Blog.deleteOne({ _id: req.params.blogId });
    res.status(200).json({ message: 'Blog Deleted' });
})