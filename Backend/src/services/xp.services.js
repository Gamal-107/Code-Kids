// src/services/xp.services.js

// ---- بيانات اللاعبين (مؤقتة في الميموري) ----
const players = {};

// ---- دوال مساعدة للحركة ----
const isPathClear = (x, y) => {
  // تقدر تعدل الشرط ده حسب خريطتك
  return x >= 0 && y >= 0 && x < 100 && y < 100;
};

const isObstacleAhead = (x, y) => {
  // تقدر تضيف منطق العقبات هنا
  return false;
};

// ---- XP Logic ----
export const calculateXP = (completedLessons) => {
  return completedLessons * 10;
};

export const getLevel = (xp) => {
  if (xp < 100) return "Beginner";
  if (xp < 500) return "Intermediate";
  return "Advanced";
};

// ---- Movement Logic ----
export const move = (playerId, direction) => {
  // تأكد إن اللاعب موجود
  if (!players[playerId]) {
    players[playerId] = { x: 0, y: 0 };
  }

  // 1. حساب الموقع الجديد
  let newX = players[playerId].x;
  let newY = players[playerId].y;

  if (direction === "right") newX += 1;
  else if (direction === "left") newX -= 1;
  else if (direction === "up") newY -= 1;
  else if (direction === "down") newY += 1;

  // 2. تحقق من الاصطدام
  if (isPathClear(newX, newY) && !isObstacleAhead(newX, newY)) {
    // 3. تحديث الحالة
    players[playerId].x = newX;
    players[playerId].y = newY;

    return { success: true, position: { x: newX, y: newY } };
  } else {
    return { success: false, message: "اصطدام بـ جدار أو عقبة!" };
  }
};