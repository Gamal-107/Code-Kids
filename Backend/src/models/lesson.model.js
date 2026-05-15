import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        default:"lesson"
    },
    type: {
        type: String,
        enum: ["lesson",  "placement-test"],
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

    // Quiz
    quiz: [{
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
    }],

    // Starter code اللي بيظهر للطفل
    starterCode: {
        type: String,
        default: ""
    },

    // الحل النهائي (اختياري)
    solution: {
        type: String,
        default: ""
    },

    // ✅ أهم جزء: التاسكات
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
    ]

}, { timestamps: true });

export default mongoose.model("Lesson", lessonSchema);



