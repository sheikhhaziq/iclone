import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Types } from "mongoose";
import { decodeAccessToken } from "../utils/generateTokens";

// Define the payload structure stored in your JWT


// Extend Request to include `user`
export interface AuthRequest extends Request {
    user?: typeof User.prototype;
}

// Protect middleware
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = decodeAccessToken(token);

        const user = await User.findById(new Types.ObjectId(decoded.id)).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
