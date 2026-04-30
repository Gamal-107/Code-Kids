import { User } from "../models/user.model.js";
import { userProgress } from "../models/userProgress.model.js";
import { generateToken } from "../utils/generateToken.js";

export const collectGems = async (req, res) => {
  try {
    const { userId, courseId, gemId } = req.body;
    if (!userId || !courseId || !gemId) {
      return res.status(400).json({ message: "Missing required data" });
    }

    let progress = await userProgress.findOne({ user: userId, course: courseId });
    if (!progress) {
      progress = new userProgress({
        user: userId,
        course: courseId,
        collectedGems: [gemId]
      });
    } else {
      const alreadyCollected = progress.collectedGems.find(gem => gem.toString() === gemId);
      if (alreadyCollected) {
        return res.status(400).json({ message: "Gem already collected" });
      }
      progress.collectedGems.push(gemId);
    }

    await progress.save();
    res.json({ message: "Gem collected successfully", progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const progress = await userProgress.find({ user: userId });

    res.json({
      username: user.username,
      xp: user.xp,
      level: user.level,
      lives: user.lives,
      currentLevel: user.currentLevel,
      progress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log(username, password, email, "username, password, email");

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: "Username or email already exists" });
    }

    const user = await User.create({ username, password, email });
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    return res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out user" });
  }
};
