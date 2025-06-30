import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { Types } from "mongoose";
import { decodeAccessToken } from "../utils/generateTokens";


export interface AuthRequest extends Request {
    user?: typeof User.prototype;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "No token provided" });
            return;
        }

        const token = authHeader.split(" ")[1];

        const decoded = decodeAccessToken(token);

        const user = await User.findById(new Types.ObjectId(decoded.id)).select("-password");

        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid or expired token" });
        return
    }
};
