import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },

  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  completedTasks: { type: [Number], default: [] },
  collectedGems: { type: [String], default: [] },

  xp: { type: Number, default: 0 },
  level: { type: String, default: "Beginner" },
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

export const userProgress = mongoose.model("UserProgress", userProgressSchema);
export default userProgress;
