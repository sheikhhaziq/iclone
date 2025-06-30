import express from "express";
import { loginUser, registerUser,refreshToken } from "../controllers/userController";

const router = express.Router();



// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login user and return JWT
// @access  Public
router.post("/login", loginUser);

// @route   POST /api/auth/refresh
// @desc    generate new access token
// @access  Public
router.post("/refresh",refreshToken);

export default router;
