import cloudinary from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.cloudinary_KEY,
    api_secret: process.env.cloudinary_SECRET
});

export default cloudinary;