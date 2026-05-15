import Lesson from "../models/lesson.model.js";
import { User } from "../models/user.model.js";
import { calculateXP, getLevel } from "../services/xp.services.js";
import { userProgress } from "../models/userProgress.model.js";

// 🎮 Complete Level
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
    progress.isCompleted = progress.completedTasks.length === completedLessons.length;

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
    }

    await progress.save();

    res.json({
      message: "🎉 Level completed!",
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

// 📚 Get all lessons
export const getAllLessons = async (req, res) => {
  const {type , language, level} = req  .query; // Optional query param to filter by type
  const filter = {};
  if (type) filter.type = type;
  if (language) filter.language = language;
  if (level) filter.level = level;
  const lessons = await Lesson.find(filter)
  res.json(lessons);  

};

// 🎮 Get lessons by level
export const getLessonsByLevel = async (req, res) => {
  try {
    const { language, level } = req.params;
    const lessons = await Lesson.find({ language, level }).sort({ order: 1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📘 Get lesson by ID
export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➕ Create lesson
export const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update lesson
export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get placement test 
export const getPlacementTest = async (req, res) => {
  try {
    const language = req.params.language || req.query.language;
    const query = { type: "placement-test" };
    if (language) query.language = language;

    const test = await Lesson.findOne(query);
    if (!test) {
      return res.status(404).json({ message: "Placement test not found" });
    }

    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ❌ Delete lesson
export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json({ message: "Lesson deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🎯 Run Task (check solution)
export const runtask = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Body is missing" });
    }

    const { lessonId, taskIndex, code } = req.body;

    if (!lessonId || !code) {
      return res.status(400).json({ message: "lessonId and code are required" });
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    if (!lesson.tasks || lesson.tasks.length === 0) {
      return res.status(400).json({ message: "No tasks in this lesson" });
    }

    const hasLessonSolution = Boolean(lesson.solution && lesson.solution.trim());
    if (taskIndex === undefined && !hasLessonSolution) {
      return res.status(400).json({ message: "taskIndex is required when lesson.solution is not set" });
    }

    const task = taskIndex !== undefined ? lesson.tasks[taskIndex] : null;
    if (taskIndex !== undefined && !task) return res.status(404).json({ message: "Task not found" });

    const normalize = str => {
      if (typeof str !== "string") return "";
      return str
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/.*$/gm, "")
        .replace(/\s+/g, "")
        .replace(/;/g, "")
        .trim();
    };

    const cleanUserCode = normalize(code);
    const cleanLessonSolution = normalize(lesson.solution || "");
    const cleanTaskSolution = task ? normalize(task.solution || "") : "";

    const allTaskIndexes = lesson.tasks.map((_, idx) => idx);
    let matched = false;
    let solvedAll = false;
    let completedTasks = [];

    if (cleanLessonSolution && cleanUserCode === cleanLessonSolution) {
      lesson.tasks.forEach(t => {
        t.isCompleted = true;
      });
      matched = true;
      solvedAll = true;
      completedTasks = allTaskIndexes;
    } else if (task && cleanUserCode === cleanTaskSolution) {
      task.isCompleted = true;
      matched = true;
      completedTasks = [taskIndex];
    }

    if (!matched) {
      return res.json({ success: false, message: "Wrong solution! Please try again.", canMove: false });
    }

    await lesson.save();

    const allCompleted = lesson.tasks.every(t => t.isCompleted === true);

    let progress = await userProgress.findOne({ user: req.user.id, lesson: lessonId });
    const existingCompleted = progress ? new Set(progress.completedTasks) : new Set();
    let gainedXP = 0;
    const awardXP = () => {
      gainedXP = calculateXP(1);
    };

    if (!progress) {
      if (solvedAll || completedTasks.length > 0) {
        awardXP();
      }
      progress = new userProgress({
        user: req.user.id,
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
      const user = await User.findById(req.user.id);
      if (user) {
        user.xp += gainedXP;
        user.level = getLevel(user.xp);
        await user.save();
      }
    }

    await progress.save();

    return res.json({
      success: true,
      message: allCompleted ? "Correct! All tasks completed. Movement unlocked." : "Correct! Task completed. Movement unlocked.",
      canMove: true,
      allCompleted,
      progress,
      gainedXP
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 💻 Run Code (move player ONLY if tasks completed)
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


    const progress = await userProgress.findOne({
      user: req.user.id,
      lesson: lessonId
    });
    // ❌ prevent movement if tasks not completed
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

    if (lesson.map[playerPos.x][playerPos.y] === "T") {
      user.lives = 3; // reset lives for next level
      await user.save();
      return res.json({ success: true, message: "🎉 You reached the treasure!" });
    } else {
      return res.json({ success: false, message: "Try again!", lives: user.lives });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
