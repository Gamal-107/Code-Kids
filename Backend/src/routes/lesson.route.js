// src/routes/lesson.route.js

import express from "express";
import {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonsByLevel,
  completeLevel,
  runCode,
  runtask,
  getPlacementTest,
} from "../controllers/lesson.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateRunTask } from "../middlewares/validation.middleware.js";
import { move } from "../services/xp.services.js";

// ✅ لازم router يتعرف الأول قبل أي حاجة
const router = express.Router();

// 🎮 حركة اللاعب
router.post("/move", (req, res) => {
  try {
    const { playerId, direction } = req.body;
    const result = move(playerId, direction);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📚 كل الدروس
router.get("/", getAllLessons);

// 🎮 دروس حسب level
router.get("/by-level/:language/:level", getLessonsByLevel);
router.get("/level/:language/:level", getLessonsByLevel);

// 🧪 Placement Test
router.get("/placement-test/:language", getPlacementTest);
router.get("/placement-test", getPlacementTest);

// 📘 درس واحد
router.get("/:id", getLessonById);

// ➕ إنشاء درس
router.post("/", authMiddleware, createLesson);

// ✏️ تعديل درس
router.put("/:id", authMiddleware, updateLesson);

// ❌ حذف درس
router.delete("/:id", authMiddleware, deleteLesson);

// 🎯 إنهاء level
router.post("/complete-level", authMiddleware, completeLevel);
router.post("/progress", authMiddleware, completeLevel);

// ▶️ تشغيل كود
router.post("/run", authMiddleware, runCode);
router.post("/run-task", authMiddleware, validateRunTask, runtask);

export default router;