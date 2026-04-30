import 'dotenv/config';
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";

import lessonRoutes from "./routes/lesson.route.js";
import courseRoutes from "./routes/course.route.js";
import quizRoutes from "./routes/quiz.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/lessons", lessonRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Kids Coding Platform API is running 🚀" });
});

// Socket.io Logic
io.on("connection", (socket) => {
  console.log("A player connected:", socket.id);

  socket.on("move", (data) => {
    socket.broadcast.emit("playerMoved", data);
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`   Server is running on port ${PORT}`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`=============================================`);
});

export default app;
