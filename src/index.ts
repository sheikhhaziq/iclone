import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI!,)
    .then(() => console.log('✅Connected to Atlas'))
    .catch((e) => console.log("❌ DB connection error"+e))


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
