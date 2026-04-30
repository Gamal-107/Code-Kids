import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getDashboard,
  collectGems
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/collect-gem", authMiddleware, collectGems);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/dashboard", authMiddleware, getDashboard);
router.get("/profile", authMiddleware, (req, res) => {
  res.send("User profile");
});

export default router;
