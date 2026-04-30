# Kids Coding Platform - Backend API

A gamified coding learning platform for children (like Scratch), built with Node.js, Express, and MongoDB.

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and fill in:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/gp_coding_platform
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
```

### 3. Run the server
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

---

## 📁 Project Structure

```
src/
├── app.js                        # Entry point, Express + Socket.io setup
├── config/
│   ├── constants.js              # App-wide constants
│   └── database.js               # MongoDB connection (standalone helper)
├── controllers/
│   ├── auth.controller.js        # Register / Login / Logout
│   ├── course.controller.js      # CRUD for courses
│   ├── lesson.controller.js      # Lessons + code execution + XP
│   ├── quiz.controller.js        # CRUD for quizzes
│   ├── user.controller.js        # Dashboard, gems, user auth
│   └── executeCommand.js         # Game command execution engine
├── middlewares/
│   ├── auth.middleware.js        # JWT verification
│   └── validation.middleware.js  # Request validation
├── models/
│   ├── user.model.js             # User schema (bcrypt, XP, lives)
│   ├── course.model.js           # Course schema
│   ├── lesson.model.js           # Lesson schema (tasks, quiz, code)
│   ├── quiz.model.js             # Quiz schema
│   ├── userProgress.model.js     # User progress tracking
│   └── levels.json               # Level configuration data
├── routes/
│   ├── auth.route.js             # /api/v1/auth
│   ├── course.route.js           # /api/v1/courses
│   ├── lesson.route.js           # /api/v1/lessons
│   ├── quiz.route.js             # /api/v1/quizzes
│   └── user.route.js             # /api/v1/users
├── services/
│   ├── movement.engine.js        # GameEngine class + level logic
│   └── xp.services.js            # XP calculation + player movement
└── utils/
    └── generateToken.js          # JWT token generator
```

---

## 🌐 API Endpoints

### Auth (`/api/v1/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login user, returns JWT |
| POST | `/logout` | Logout (requires token) |
| GET | `/profile` | Get user profile (requires token) |

### Users (`/api/v1/users`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register user |
| POST | `/login` | Login user |
| GET | `/dashboard` | Get dashboard data (requires token) |
| POST | `/collect-gem` | Collect a gem (requires token) |

### Lessons (`/api/v1/lessons`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all lessons (filter by `?type=&language=&level=`) |
| GET | `/:id` | Get lesson by ID |
| GET | `/by-level/:language/:level` | Get lessons by language and level |
| GET | `/placement-test/:language` | Get placement test |
| POST | `/` | Create lesson (requires token) |
| PUT | `/:id` | Update lesson (requires token) |
| DELETE | `/:id` | Delete lesson (requires token) |
| POST | `/run-task` | Check student code against task (requires token) |
| POST | `/run` | Run code + move player (requires token) |
| POST | `/complete-level` | Mark level complete + award XP (requires token) |
| POST | `/move` | Move player on map |

### Courses (`/api/v1/courses`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all courses |
| GET | `/:id` | Get course by ID |
| POST | `/` | Create course (requires token) |
| PUT | `/:id` | Update course (requires token) |
| DELETE | `/:id` | Delete course (requires token) |

### Quizzes (`/api/v1/quizzes`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all quizzes |
| GET | `/:id` | Get quiz by ID |
| POST | `/` | Create quiz |
| PUT | `/:id` | Update quiz |
| DELETE | `/:id` | Delete quiz |

---

## 🎮 Game Concept

The platform teaches kids 3 programming languages through gamified maze levels:
- **Scratch** — visual block-based drag & drop
- **Python** — text-based coding with maze puzzles
- **HTML** — web building challenges

Each language has **10 levels** progressing in difficulty. Completing levels earns **XP** and unlocks new levels. Players collect **gems (treasures)** and earn **badges**.

---

## 🔧 Technologies

- **Node.js** + **Express** — REST API
- **MongoDB** + **Mongoose** — Database
- **Socket.io** — Real-time player movement
- **JWT** — Authentication
- **bcrypt** — Password hashing
