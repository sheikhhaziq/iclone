import express from "express";
import { loginUser, registerUser,refreshToken } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/refresh",refreshToken);

export default router;
