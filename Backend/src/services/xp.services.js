// ---- Player data (stored in memory temporarily) ----
const players = {};

// ---- Path helper functions ----
const isPathClear = (x, y) => {
  return x >= 0 && y >= 0 && x < 100 && y < 100;
};

const isObstacleAhead = (x, y) => {
  return false; // Extend with actual obstacle logic
};

// ---- XP Logic ----
export const calculateXP = (completedLessons) => {
  if (Array.isArray(completedLessons)) return completedLessons.length * 10;
  return (completedLessons || 1) * 10;
};

export const getLevel = (xp) => {
  if (xp < 100) return "Beginner";
  if (xp < 500) return "Intermediate";
  return "Advanced";
};

// ---- Movement Logic ----
export const move = (playerId, direction) => {
  if (!players[playerId]) {
    players[playerId] = { x: 0, y: 0 };
  }

  let newX = players[playerId].x;
  let newY = players[playerId].y;

  if (direction === "right") newX += 1;
  else if (direction === "left") newX -= 1;
  else if (direction === "up") newY -= 1;
  else if (direction === "down") newY += 1;

  if (isPathClear(newX, newY) && !isObstacleAhead(newX, newY)) {
    players[playerId].x = newX;
    players[playerId].y = newY;
    return { success: true, position: { x: newX, y: newY } };
  } else {
    return { success: false, message: "Hit a wall or obstacle!" };
  }
};
