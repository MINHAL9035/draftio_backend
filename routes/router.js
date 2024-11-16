import express from "express";
import { logout, registerUser, signin } from "../controllers/auth.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { addBlog } from "../controllers/addBlog.js";
import { getAllBlogs, getBlog } from "../controllers/getBlog.js";
import { updateBlog } from "../controllers/updateBlog.js";
import { deleteBlog } from "../controllers/deleteBlog.js";
const router = express.Router()

router.post('/signup', registerUser)
router.post('/logout', logout)
router.post('/login', signin)
router.route('/blog').get(getAllBlogs).post(protect, upload.single('image'), addBlog)
router.route('/post/:blogId').get(getBlog).put(protect, upload.single('image'), updateBlog).delete(protect,deleteBlog)



export default router