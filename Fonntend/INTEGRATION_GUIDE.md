# Code Kids - Frontend Integration Guide

## ✅ Integration Status

سالم! تم ربط الفرونت اند بالباك اند بنجاح ✨

### 🎯 ما تم إنجازه:

1. **API Configuration** ✅
   - ملف `api.js` يحتوي على جميع دوال الاتصال بـ API
   - Base URL: `https://codekids-dm8b.onrender.com/api`
   - نظام التوكن والتخزين المحلي (localStorage)

2. **Authentication Pages** ✅
   - صفحة **Sign Up** - إنشاء حساب جديد
   - صفحة **Login** - الدخول للحساب الموجود
   - تبديل سهل بين الصفحتين

3. **Navigation System** ✅
   - تحقق من حالة تسجيل الدخول تلقائياً عند فتح الموقع
   - إعادة توجيه تلقائية للمستخدمين غير المسجلين
   - حماية صفحات اللغات (scratch, python, html)

4. **Password Visibility Toggle** ✅
   - رمز العين لإظهار/إخفاء كلمة المرور
   - عاملة في Sign Up و Login

---

## 📁 File Structure

```
Fonntend/
  ├── index.html          (الصفحة الرئيسية مع Sign Up و Login)
  ├── js/
  │   ├── api.js          (دوال API - الاتصال بالسيرفر)
  │   ├── script.js       (منطق الصفحات والأحداث)
  │   └── ...
  ├── css/
  │   └── style.css
  └── ...
```

---

## 🔑 API Functions في api.js

### Authentication

```javascript
// تسجيل حساب جديد
await registerUser(username, email, password);

// تسجيل الدخول
await loginUser(email, password);

// الحصول على بيانات المستخدم الحالي
await getUserProfile();

// تحديث بيانات المستخدم
await updateUserProfile(username, age);

// تسجيل الخروج
logout();
```

### Levels Management

```javascript
// الحصول على جميع الدرجات في فئة معينة
await getLevelsByCategory(category); // 'scratch', 'python', 'html'

// الحصول على تفاصيل درجة واحدة
await getLevelDetails(category, levelNumber);

// حفظ الكود (auto-save كل ثانيتين)
await saveCode(category, levelNumber, code);

// الحصول على تلميح
await getHint(category, levelNumber);

// رفع الكود للتصحيح
await submitCode(category, levelNumber, code);
```

---

## 🔐 Token Management

التوكن يتم تخزينه تلقائياً في `localStorage`:

```javascript
// الحصول على التوكن
const token = getToken();

// فحص إذا كان المستخدم مسجل دخول
if (isAuthenticated()) {
  // المستخدم مسجل دخول
}

// الحصول على بيانات المستخدم الحالية
const user = getCurrentUser();
```

---

## 🎮 How to Use

### 1. تسجيل حساب جديد

- اضغط على "Sign UP" من الصفحة الرئيسية
- أدخل: Username, Email, Password
- اضغط "Sign UP"
- سيتم حفظ التوكن تلقائياً و الانتقال للصفحة التالية

### 2. تسجيل الدخول

- في صفحة Sign Up، اضغط "Login here"
- أدخل: Email, Password
- اضغط "Login"
- سيتم حفظ التوكن وإعادة التوجيه

### 3. اختيار لغة البرمجة

- بعد الدخول، اختر من:
  - **Scratch** - البرمجة بالكتل
  - **Python** - تعلم المنطق والرسوميات
  - **HTML** - بناء المواقع

### 4. دخول الدرجات

- اختر الفئة المطلوبة
- اضغط "Start from Zero" أو "Start Level Test"
- يتم تحميل الدرجات من API

---

## 🚀 ما الخطوات التالية؟

### Phase 2 - Levels Page Integration

سنقوم بـ:

1. ✏️ إنشاء صفحة درجات جديدة
2. 📝 عرض الدرجات من API
3. 💾 حفظ الكود تلقائي كل ثانيتين
4. 🎯 تقديم الكود للتصحيح
5. ⭐ عرض النتائج والنجوم

### Phase 3 - Dashboard

- ✅ عرض تقدم المستخدم
- 📊 إحصائيات الدرجات المكتملة
- 🏆 لوحة الترتيب

---

## ⚙️ Configuration

تحديث العناصر من `api.js`:

```javascript
// غير Base URL إذا تغيّر السيرفر
const BASE_URL = "https://codekids-dm8b.onrender.com/api";

// مفاتيح التخزين المحلي
const TOKEN_KEY = "codekids_token";
const USER_KEY = "codekids_user";
```

---

## 🐛 Error Handling

جميع الأخطاء يتم التعامل معها تلقائياً:

```javascript
try {
  await registerUser(...);
} catch (error) {
  console.log(error.message); // "Invalid email" أو رسالة الخطأ
}
```

---

## 📱 Responsive Design

✅ الصفحات متجاوبة مع جميع الأجهزة

- Mobile
- Tablet
- Desktop

---

## ✨ Key Features

✅ Auto-login check on page load
✅ Secure token storage
✅ Error messages with user feedback
✅ Loading states
✅ Password visibility toggle
✅ Protected routes (require login)
✅ Auto-logout on token expiry (يمكن إضافته)

---

**Version: 1.0**
**Last Updated: May 15, 2026**
