import express from "express";
import ListEndpoints from "express-list-endpoints";
import cors from "cors";
import http from "http"; // نحتاجه لربط Socket.io
import { Server } from "socket.io"; // استيراد Socket.io

import lessonRoutes from "./routes/lesson.route.js";
import courseRoutes from "./routes/course.route.js";
import quizRoutes from "./routes/quiz.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

import dotenv from "dotenv";

import mongoose from "mongoose";
dotenv.config();

const app = express();
const server = http.createServer(app); // إنشاء السيرفر
const io = new Server(server, {
  cors: { origin: "*" },
});

const url = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// connect to MongoDB
mongoose.connect(url).then(() => {
  console.log("connected to Monogodb");
});

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/lessons", lessonRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/auth", authRoutes);

// Socket.io Logic
io.on("connection", (socket) => {
  console.log("A player connected:", socket.id);

  socket.on("move", (data) => {
    socket.broadcast.emit("playerMoved", data);
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected");
  });
});

// تشغيل السيرفر

server.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`=============================================`);
});

export default app;
