import express from 'express'
import dotenv from "dotenv";
import connectDB from './config/db.js'
import cors from "cors"
import router from './routes/router.js';
import cookieParser from 'cookie-parser';

dotenv.config()
connectDB()

const app = express();
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use('/api',router);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})