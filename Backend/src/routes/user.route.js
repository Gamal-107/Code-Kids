import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getDashboard } from "../controllers/user.controller.js";
import { collectGems } from "../controllers/user.controller.js";


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



