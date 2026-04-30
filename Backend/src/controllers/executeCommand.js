// Helper: rotate direction
function rotate(current, turn) {
  const dirs = ["UP", "RIGHT", "DOWN", "LEFT"];
  let idx = dirs.indexOf(current);
  if (turn === "RIGHT") idx = (idx + 1) % 4;
  else idx = (idx + 3) % 4;
  return dirs[idx];
}

// Helper: move forward one step
function moveForward(pos, dir) {
  if (dir === "UP") pos.y -= 1;
  if (dir === "DOWN") pos.y += 1;
  if (dir === "LEFT") pos.x -= 1;
  if (dir === "RIGHT") pos.x += 1;
}

// Check environment condition (sensors)
function checkCondition(state, condition) {
  if (condition === "path_clear") {
    const nextX = state.pos.x + (state.dir === "RIGHT" ? 1 : state.dir === "LEFT" ? -1 : 0);
    const nextY = state.pos.y + (state.dir === "DOWN" ? 1 : state.dir === "UP" ? -1 : 0);
    return state.grid[nextY] && state.grid[nextY][nextX] === 1;
  }
  return false;
}

// Apply a movement action to state
function applyMovement(state, action) {
  if (action === "GO_FORWARD") moveForward(state.pos, state.dir);
  if (action === "TURN_RIGHT") state.dir = rotate(state.dir, "RIGHT");
  if (action === "TURN_LEFT") state.dir = rotate(state.dir, "LEFT");
  if (action === "GO_RIGHT") { state.dir = "RIGHT"; moveForward(state.pos, state.dir); }
  if (action === "GO_LEFT") { state.dir = "LEFT"; moveForward(state.pos, state.dir); }
  if (action === "GO_UP") { state.dir = "UP"; moveForward(state.pos, state.dir); }
  if (action === "GO_DOWN") { state.dir = "DOWN"; moveForward(state.pos, state.dir); }
}

// Import levels data
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Execute commands recursively
const execute = (cmds, state) => {
  cmds.forEach(cmd => {
    if (cmd.type === "move") {
      applyMovement(state, cmd.action);
    } else if (cmd.type === "if_statement") {
      if (checkCondition(state, cmd.condition)) {
        execute([cmd.then], state);
      } else {
        execute([cmd.else], state);
      }
    } else if (cmd.type === "repeat") {
      for (let i = 0; i < cmd.times; i++) {
        execute(cmd.do, state);
      }
    } else if (cmd.type === "change_score") {
      state.variables.scour = (state.variables.scour || 0) + (cmd.amount || 1);
    }
  });
};

export const verifyLevel = (req, res) => {
  try {
    const { levelId, commands, gridMap, start, target, direction } = req.body;

    const state = {
      pos: { x: start[0], y: start[1] },
      dir: direction || "RIGHT",
      grid: gridMap || [],
      variables: { scour: 0 }
    };

    execute(commands, state);

    const reached = (state.pos.x === target[0] && state.pos.y === target[1]);
    res.json({ success: reached, finalPos: state.pos, score: state.variables.scour });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
