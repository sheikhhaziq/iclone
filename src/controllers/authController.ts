import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import { User } from "../models/User";
import { generateAccessToken,generateRefreshToken, decodeRefreshToken} from "../utils/generateTokens";


export const refreshToken = async (req: Request, res: Response)=>{
    const token = req.cookies.refreshToken;

    if (!token) {
         res.status(401).json({ message: "No refresh token provided" });
         return;
    }

    try {
        const decoded = decodeRefreshToken(token);
        const newAccessToken = generateAccessToken(decoded.id);
        const refreshToken = generateRefreshToken(decoded.id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: "Invalid refresh token" });
    }
}


export const registerUser = async (req: Request, res: Response) => {
    try {
        const { userName, displayName, email, password } = req.body;


        if (!userName || !displayName || !email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return
        }

        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
             res.status(400).json({ message: "User already exists with this email or username" });
             return;
        }


        const user = new User({
            userName,
            displayName,
            email,
            password,
        });

        await user.save();


        const token = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.userName,
                displayName: user.displayName,
                email: user.email,
                profilePic: user.profilePic,
                bio: user.bio,
                followers: user.followers,
                following: user.following,
                createdAt: user.createdAt,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
             res.status(400).json({ message: "All fields are required" });
             return
        }

        
        const user = await User.findOne({ email });
        if (!user) {
             res.status(400).json({ message: "Email is not registered." });
             return;
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Password id not valid." });
            return
        }

        
        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.userName,
                displayName: user.displayName,
                email: user.email,
                profilePic: user.profilePic,
                bio: user.bio,
                followers: user.followers,
                following: user.following,
                createdAt: user.createdAt,
            },
            accessToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}