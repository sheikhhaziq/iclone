import {  Response } from "express";
import { AuthRequest } from "../middleware/AuthMiddleware";


export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        const { displayName, bio, profilePic } = req.body;

        if(!displayName || !bio ||!profilePic){
            res.status(400).json("All Fields are required.");
            return;
        }

        user.displayName = displayName;
        user.bio = bio;
        user.profilePic = profilePic;

        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                username: user.username,
                displayName: user.displayName,
                bio: user.bio,
                profilePic: user.profilePic,
                followers: user.followers,
                following: user.following,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateDisplayName = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        const { displayName } = req.body;

        if(!displayName){
            res.status(400).json("Display Name is required.");
            return;
        }

        user.displayName = displayName;

        await user.save();

        res.json({
            message: "Display Name updated successfully",
            user: {
                id: user._id,
                username: user.username,
                displayName: user.displayName,
                bio: user.bio,
                profilePic: user.profilePic,
                followers: user.followers,
                following: user.following,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateBio = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        const { bio } = req.body;

        if(!bio){
            res.status(400).json("Bio is required.");
            return;
        }

        user.bio = bio;

        await user.save();

        res.json({
            message: "Bio updated successfully",
            user: {
                id: user._id,
                username: user.username,
                displayName: user.displayName,
                bio: user.bio,
                profilePic: user.profilePic,
                followers: user.followers,
                following: user.following,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



export const updateProfilePic = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        const { profilePic } = req.body;

        if(!profilePic){
            res.status(400).json("Profile Picture is required.");
            return;
        }

        user.profilePic = profilePic;

        await user.save();

        res.json({
            message: "Profile Pictire updated successfully",
            user: {
                id: user._id,
                username: user.username,
                displayName: user.displayName,
                bio: user.bio,
                profilePic: user.profilePic,
                followers: user.followers,
                following: user.following,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
