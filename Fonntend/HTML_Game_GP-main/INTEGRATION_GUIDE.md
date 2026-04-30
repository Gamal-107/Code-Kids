# Code Kids - Frontend & Backend Integration Guide

## ✅ التوصيل اكتمل بنجاح!

تم توصيل Frontend بـ Backend وإضافة الميزات التالية:

### 📋 الملفات المضافة/المحدثة:

1. **`js/api.js`** (جديد)
   - API Service للاتصال بـ Backend
   - جميع الدوال المطلوبة للـ Requests

2. **`login.html`** (جديد)
   - صفحة Login/Register متكاملة
   - تسجيل مستخدمين جدد
   - تسجيل دخول وحفظ Token

3. **`home.html`** (محدث)
   - التحقق من تسجيل الدخول
   - عرض اسم المستخدم
   - زر Logout

4. **`Dashboard/Dashboard.html`** (محدث)
   - جلب بيانات المستخدم من Backend
   - عرض البيانات الشخصية
   - زر Logout

---

## 🚀 كيفية الاستخدام

### الخطوة 1: تأكد من تشغيل Backend

```bash
cd Backend
npm start
```

يجب أن ترى:

```
Connected to MongoDB ✅
Server is running on port 5000
```

### الخطوة 2: افتح Frontend

اذهب إلى: `Fonntend/HTML_Game_GP-main/login.html`

### الخطوة 3: إنشاء حساب جديد

- اضغط على "Create Account"
- أدخل البيانات التالية:
  - **Username**: مثلاً `testuser`
  - **Email**: مثلاً `test@example.com`
  - **Password**: 6 أحرف على الأقل

### الخطوة 4: تسجيل الدخول

- استخدم نفس البيانات للدخول
- سيتم حفظ Token تلقائياً

### الخطوة 5: استكشاف

- ستنتقل إلى `home.html`
- ستجد اسمك معروض في الأعلى
- اختر أي مستوى للبدء

---

## 🔌 API Endpoints المتاحة

### Authentication

- `POST /api/v1/auth/register` - تسجيل مستخدم جديد
- `POST /api/v1/auth/login` - تسجيل الدخول

### Users

- `GET /api/v1/users/dashboard` - بيانات Dashboard
- `GET /api/v1/users/profile` - الملف الشخصي
- `POST /api/v1/users/collect-gem` - جمع Gems

### Courses

- `GET /api/v1/courses` - جميع الدورات

### Lessons

- `GET /api/v1/lessons` - جميع الدروس

### Quizzes

- `GET /api/v1/quizzes` - جميع الاختبارات

---

## 📝 مثال على استخدام API

```javascript
// استخدام API Service في صفحات أخرى

// تسجيل مستخدم جديد
const result = await api.register("username", "email@test.com", "password123");
if (result.success) {
  console.log("تم التسجيل:", result.data);
}

// تسجيل دخول
const login = await api.login("email@test.com", "password123");
if (login.success) {
  console.log("تسجيل الدخول نجح:", login.data.token);
}

// الحصول على بيانات Dashboard
const dashboard = await api.getDashboard();
if (dashboard.success) {
  console.log("بيانات Dashboard:", dashboard.data);
}

// الحصول على جميع الدورات
const courses = await api.getCourses();
if (courses.success) {
  console.log("الدورات:", courses.data);
}
```

---

## 🔐 Security Notes

- ✅ Token يُحفظ في `localStorage`
- ✅ Token يُرسل مع كل request محمي
- ✅ تلقائي: إذا انقضى Token، اذهب إلى Login

---

## 🐛 استكشاف الأخطاء

### مشكلة: لا يمكن الاتصال بـ Backend

```
❌ Error: Failed to fetch
```

**الحل:** تأكد من:

1. البورت 5000 يعمل
2. MongoDB متصل
3. لا توجد أخطاء في Terminal

### مشكلة: خطأ "Authentication failed"

```
❌ Authentication failed
```

**الحل:**

1. تحقق من اسم المستخدم وكلمة المرور
2. تأكد من وجود حساب في قاعدة البيانات

---

## ✨ الخطوات التالية

يمكنك الآن:

1. ✅ إضافة API calls في Level Pages
2. ✅ حفظ Progress تلقائياً
3. ✅ إضافة Real-time Updates مع Socket.io
4. ✅ تطوير Chatbot مع API

---

## 📞 للمساعدة

عند مواجهة مشاكل، افتح Developer Console:

- **F12** → Console
- تحقق من الأخطاء
- انسخ الخطأ

---

**تم التوصيل بنجاح! 🎉**
