import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/course.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get all courses
router.get("/", getAllCourses);

// Get course by ID
router.get("/:id", getCourseById);

// Create course - requires token
router.post("/", authMiddleware, createCourse);

// Update course - requires token
router.put("/:id", authMiddleware, updateCourse);

// Delete course - requires token
router.delete("/:id", authMiddleware, deleteCourse);

export default router;
