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

// كل الكورسات
router.get("/", getAllCourses);

// كورس بالـ ID
router.get("/:id", getCourseById);

// إنشاء كورس جديد → محتاج توكن
router.post("/", authMiddleware, createCourse);

// تحديث كورس → محتاج توكن
router.put("/:id", authMiddleware, updateCourse);

// حذف كورس → محتاج توكن
router.delete("/:id", authMiddleware, deleteCourse);

export default router;