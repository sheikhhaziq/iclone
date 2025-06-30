import express from "express";
import { protect } from "../middleware/AuthMiddleware";
import { updateBio, updateDisplayName, updateProfile, updateProfilePic } from "../controllers/userController";

const router = express.Router();

router.put('/profile',protect,updateProfile);

router.put('/profile/displayname',protect,updateDisplayName);

router.put('/profile/bio',protect,updateBio);

router.put('/profile/picture',protect,updateProfilePic);

export default router;