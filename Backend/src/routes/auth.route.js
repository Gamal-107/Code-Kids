import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);

// Optional: get profile
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
