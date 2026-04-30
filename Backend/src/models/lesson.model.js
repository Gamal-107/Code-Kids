import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "lesson"
  },
  type: {
    type: String,
    enum: ["lesson", "placement-test"],
    default: "lesson"
  },
  language: {
    type: String,
    required: true,
    enum: ["HTML", "Python", "Scratch"]
  },
  level: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  game: {
    type: String,
    enum: ["quiz", "drag-and-drop", "code"],
    required: true
  },

  // Quiz questions
  quiz: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
  }],

  // Starter code shown to the child
  starterCode: {
    type: String,
    default: ""
  },

  // Final solution (optional)
  solution: {
    type: String,
    default: ""
  },

  // Tasks - the most important part
  tasks: [
    {
      description: {
        type: String,
        required: true
      },
      solution: {
        type: String,
        required: true
      },
      isCompleted: {
        type: Boolean,
        default: false
      }
    }
  ],

  // Map for game levels (S=Start, T=Treasure, 0=wall, 1=path)
  map: {
    type: [[String]],
    default: undefined
  },

  order: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

export default mongoose.model("Lesson", lessonSchema);
