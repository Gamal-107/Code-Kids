import Lesson from "../models/lesson.model.js";
import { User } from "../models/user.model.js";
import { calculateXP, getLevel } from "../services/xp.services.js";
import { userProgress } from "../models/userProgress.model.js";

// Complete Level
export const completeLevel = async (req, res) => {
  try {
    const { userId, courseId, language, completedLessons } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.currentLevel[language] += 1;

    const gainedXP = calculateXP(completedLessons);
    user.xp += gainedXP;
    user.level = getLevel(user.xp);

    await user.save();

    let progress = await userProgress.findOne({ user: userId, course: courseId });

    if (!progress) {
      progress = new userProgress({
        user: userId,
        course: courseId,
        completedLessons
      });
    } else {
      completedLessons.forEach(lessonId => {
        if (!progress.completedLessons.includes(lessonId)) {
          progress.completedLessons.push(lessonId);
        }
      });
      progress.isCompleted = progress.completedTasks.length === completedLessons.length;
    }

    await progress.save();

    res.json({
      message: "Level completed!",
      gainedXP,
      totalXP: user.xp,
      level: user.level,
      nextLevel: user.currentLevel[language],
      progress
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all lessons
export const getAllLessons = async (req, res) => {
  try {
    const { type, language, level } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (language) filter.language = language;
    if (level) filter.level = level;
    const lessons = await Lesson.find(filter);
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get lessons by level
export const getLessonsByLevel = async (req, res) => {
  try {
    const { language, level } = req.params;
    const lessons = await Lesson.find({ language, level }).sort({ order: 1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get lesson by ID
export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create lesson
export const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update lesson
export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete lesson
export const deleteLesson = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: "Lesson deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Placement Test
export const getPlacementTest = async (req, res) => {
  try {
    const { language } = req.params;
    const filter = { type: "placement-test" };
    if (language) filter.language = language;
    const test = await Lesson.findOne(filter);
    if (!test) return res.status(404).json({ message: "Placement test not found" });
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Run Task - check student's code against task solution
export const runtask = async (req, res) => {
  try {
    const { lessonId, code, taskIndex } = req.body;
    const userId = req.user.id;

    if (!lessonId || code === undefined) {
      return res.status(400).json({ message: "lessonId and code are required" });
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const tasks = lesson.tasks;
    if (!tasks || tasks.length === 0) {
      return res.status(400).json({ message: "No tasks found for this lesson" });
    }

    let progress = await userProgress.findOne({ user: userId, lesson: lessonId });
    const existingCompleted = new Set(progress?.completedTasks || []);

    let solvedAll = false;
    let allCompleted = false;
    let gainedXP = 0;
    const allTaskIndexes = tasks.map((_, i) => i);

    // Check a specific task
    if (taskIndex !== undefined) {
      const task = tasks[taskIndex];
      if (!task) return res.status(404).json({ message: "Task not found" });

      const normalizedCode = code.replace(/\s+/g, "").toLowerCase();
      const normalizedSolution = task.solution.replace(/\s+/g, "").toLowerCase();

      if (normalizedCode !== normalizedSolution) {
        return res.json({ success: false, message: "Incorrect! Try again." });
      }
    } else {
      // Check all tasks at once
      solvedAll = tasks.every((task, i) => {
        const normalizedCode = (code[i] || "").replace(/\s+/g, "").toLowerCase();
        const normalizedSolution = task.solution.replace(/\s+/g, "").toLowerCase();
        return normalizedCode === normalizedSolution;
      });
    }

    const completedTasks = taskIndex !== undefined
      ? [...existingCompleted, taskIndex]
      : allTaskIndexes;

    allCompleted = solvedAll || completedTasks.length === tasks.length;

    const awardXP = () => {
      gainedXP = calculateXP(1);
    };

    if (!progress) {
      if (solvedAll || completedTasks.length > 0) {
        awardXP();
      }
      progress = new userProgress({
        user: userId,
        lesson: lessonId,
        completedTasks: completedTasks,
        isCompleted: allCompleted
      });
    } else {
      if (solvedAll) {
        if (!progress.isCompleted) {
          awardXP();
        }
        progress.completedTasks = allTaskIndexes;
      } else if (taskIndex !== undefined && !existingCompleted.has(taskIndex)) {
        awardXP();
        progress.completedTasks.push(taskIndex);
      }
      progress.isCompleted = allCompleted;
    }

    if (gainedXP > 0) {
      const user = await User.findById(userId);
      if (user) {
        user.xp += gainedXP;
        user.level = getLevel(user.xp);
        await user.save();
      }
    }

    await progress.save();

    return res.json({
      success: true,
      message: allCompleted
        ? "Correct! All tasks completed. Movement unlocked."
        : "Correct! Task completed. Movement unlocked.",
      canMove: true,
      allCompleted,
      progress,
      gainedXP
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Run Code - move player ONLY if tasks completed
export const runCode = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Body is missing" });
    }

    const { code, lessonId } = req.body;
    const userId = req.user.id;

    if (!code || !lessonId) {
      return res.status(400).json({ message: "code and lessonId are required" });
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const progress = await userProgress.findOne({ user: userId, lesson: lessonId });

    // Prevent movement if tasks not completed
    if (!progress || !progress.isCompleted) {
      return res.json({
        success: false,
        message: "Complete all tasks first!"
      });
    }

    if (!lesson.map) {
      return res.status(400).json({ message: "No map found for this lesson" });
    }

    const user = await User.findById(userId);

    const commands = code.split(";").map(c => c.trim()).filter(c => c);
    const allowedCommands = ["moveRight()", "moveLeft()", "moveUp()", "moveDown()"];

    for (let cmd of commands) {
      if (!allowedCommands.includes(cmd)) {
        return res.status(400).json({ message: `Invalid command: ${cmd}` });
      }
    }

    let playerPos;
    lesson.map.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === "S") playerPos = { x: i, y: j };
      });
    });

    if (!playerPos) {
      return res.status(400).json({ message: "Start position not found" });
    }

    for (let cmd of commands) {
      if (cmd === "moveRight()") playerPos.y += 1;
      if (cmd === "moveLeft()") playerPos.y -= 1;
      if (cmd === "moveUp()") playerPos.x -= 1;
      if (cmd === "moveDown()") playerPos.x += 1;
    }

    if (lesson.map[playerPos.x] && lesson.map[playerPos.x][playerPos.y] === "T") {
      user.lives = 3;
      await user.save();
      return res.json({ success: true, message: "You reached the treasure!" });
    } else {
      return res.json({ success: false, message: "Try again!", lives: user.lives });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
