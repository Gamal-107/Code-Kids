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

const router = express.Router();

// Player movement
router.post("/move", (req, res) => {
  try {
    const { playerId, direction } = req.body;
    const result = move(playerId, direction);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// All lessons
router.get("/", getAllLessons);

// Lessons by level
router.get("/by-level/:language/:level", getLessonsByLevel);
router.get("/level/:language/:level", getLessonsByLevel);

// Placement Test
router.get("/placement-test/:language", getPlacementTest);
router.get("/placement-test", getPlacementTest);

// Single lesson
router.get("/:id", getLessonById);

// Create lesson
router.post("/", authMiddleware, createLesson);

// Update lesson
router.put("/:id", authMiddleware, updateLesson);

// Delete lesson
router.delete("/:id", authMiddleware, deleteLesson);

// Complete level
router.post("/complete-level", authMiddleware, completeLevel);
router.post("/progress", authMiddleware, completeLevel);

// Run code
router.post("/run", authMiddleware, runCode);
router.post("/run-task", authMiddleware, validateRunTask, runtask);

export default router;
