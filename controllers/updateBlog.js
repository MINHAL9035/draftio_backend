import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";
import cloudinary from "../utils/cloudinary.js";


export const updateBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    let blog = await Blog.findById(req.params.blogId);

    if (!blog) {
        res.status(404);
        throw new Error('Blog Not Found');
    }

    // If a new  image is uploaded
    if (req.file) {
        // Delete the old image from Cloudinary
        if (blog.imageUrl) {
            const publicId = blog.imageUrl.split('/').pop().split('.')[0];
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                console.error('Cloudinary deletion error:', error);
                return res.status(400).json({ error: 'Failed to delete old image from Cloudinary' });
            }
        }

        // Upload the new image to Cloudinary
        try {
            const result = await cloudinary.uploader.upload(req.file.path);
            blog.imageUrl = result.secure_url;
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(400).json({ error: 'Failed to upload new image to Cloudinary' });
        }
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();
    res.status(200).json(blog);
})