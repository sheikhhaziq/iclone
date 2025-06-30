import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes"

dotenv.config();

const app = express();

// Middleware

app.use(express.json());
mongoose.connect(process.env.MONGO_URI!,)
    .then(() => console.log('✅Connected to Atlas'))
    .catch((e) => console.log("❌ DB connection error"+e))

app.use("/api/auth", authRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
