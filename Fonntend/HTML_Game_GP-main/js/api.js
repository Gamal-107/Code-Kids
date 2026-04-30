// API Service for Backend Communication
const API_BASE_URL = "http://localhost:5000/api/v1";

class APIService {
    constructor() {
        this.token = localStorage.getItem("authToken") || null;
    }

    // Headers with token
    getHeaders(includeAuth = false) {
        const headers = {
            "Content-Type": "application/json",
        };
        if (includeAuth && this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }
        return headers;
    }

    // ========== AUTH ENDPOINTS ==========

    // تسجيل مستخدم جديد
    async register(username, email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: this.getHeaders(),
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("username", data.user.username);
                this.token = data.token;
            }
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Registration error:", error);
            return { success: false, error: error.message };
        }
    }

    // تسجيل الدخول
    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: this.getHeaders(),
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("username", data.user.username);
                this.token = data.token;
            }
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: error.message };
        }
    }

    // تسجيل الخروج
    logout() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        this.token = null;
    }

    // التحقق من تسجيل الدخول
    isAuthenticated() {
        return !!this.token;
    }

    // ========== USER ENDPOINTS ==========

    // الحصول على لوحة التحكم
    async getDashboard() {
        try {
            const response = await fetch(`${API_BASE_URL}/users/dashboard`, {
                method: "GET",
                headers: this.getHeaders(true),
            });
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Dashboard error:", error);
            return { success: false, error: error.message };
        }
    }

    // الحصول على الملف الشخصي
    async getUserProfile() {
        try {
            const response = await fetch(`${API_BASE_URL}/users/profile`, {
                method: "GET",
                headers: this.getHeaders(true),
            });
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Profile error:", error);
            return { success: false, error: error.message };
        }
    }

    // جمع Gems
    async collectGem(userId, courseId, gemId) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/collect-gem`, {
                method: "POST",
                headers: this.getHeaders(true),
                body: JSON.stringify({ userId, courseId, gemId }),
            });
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Collect gem error:", error);
            return { success: false, error: error.message };
        }
    }

    // ========== COURSES ENDPOINTS ==========

    // الحصول على جميع الدورات
    async getCourses() {
        try {
            const response = await fetch(`${API_BASE_URL}/courses`, {
                method: "GET",
                headers: this.getHeaders(),
            });
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Courses error:", error);
            return { success: false, error: error.message };
        }
    }

    // الحصول على دورة محددة
    async getCourse(courseId) {
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
                method: "GET",
                headers: this.getHeaders(),
            });
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Course error:", error);
            return { success: false, error: error.message };
        }
    }

    // ========== LESSONS ENDPOINTS ==========

    // الحصول على جميع الدروس
    async getLessons() {
        try {
            const response = await fetch(`${API_BASE_URL}/lessons`, {
                method: "GET",
                headers: this.getHeaders(),
            });
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Lessons error:", error);
            return { success: false, error: error.message };
        }
    }

    // الحصول على درس محددة
    async getLesson(lessonId) {
        try {
            const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
                method: "GET",
                headers: this.getHeaders(),
            });
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Lesson error:", error);
            return { success: false, error: error.message };
        }
    }

    // الحصول على دروس دورة محددة
    async getLessonsByCourse(courseId) {
        try {
            const response = await fetch(`${API_BASE_URL}/lessons?course=${courseId}`, {
                method: "GET",
                headers: this.getHeaders(),
            });
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Lessons by course error:", error);
            return { success: false, error: error.message };
        }
    }

    // ========== QUIZZES ENDPOINTS ==========

    // الحصول على جميع الاختبارات
    async getQuizzes() {
        try {
            const response = await fetch(`${API_BASE_URL}/quizzes`, {
                method: "GET",
                headers: this.getHeaders(),
            });
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Quizzes error:", error);
            return { success: false, error: error.message };
        }
    }

    // الحصول على اختبار محددة
    async getQuiz(quizId) {
        try {
            const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}`, {
                method: "GET",
                headers: this.getHeaders(),
            });
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Quiz error:", error);
            return { success: false, error: error.message };
        }
    }

    // إرسال إجابات الاختبار
    async submitQuiz(quizId, answers) {
        try {
            const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}/submit`, {
                method: "POST",
                headers: this.getHeaders(true),
                body: JSON.stringify({ answers }),
            });
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error("Submit quiz error:", error);
            return { success: false, error: error.message };
        }
    }
}

// إنشاء instance واحد لاستخدام في كل الصفحات
const api = new APIService();
