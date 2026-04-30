// Game Engine class - handles map movement and game logic
export class GameEngine {
  constructor(map, startPos) {
    this.map = map; // 0=path, 1=wall, 2=gold
    this.x = startPos.x;
    this.y = startPos.y;
    this.history = []; // record every step for frontend animation
    this.score = 0;
    this.facing = "RIGHT";
  }

  // Basic movement commands (Level 1)
  move_right() { this.x++; this.log("right"); }
  move_left()  { this.x--; this.log("left"); }
  move_up()    { this.y--; this.log("up"); }
  move_down()  { this.y++; this.log("down"); }

  // Direction-aware forward movement
  move_forward() {
    if (this.facing === "RIGHT") this.x++;
    else if (this.facing === "LEFT") this.x--;
    else if (this.facing === "UP") this.y--;
    else if (this.facing === "DOWN") this.y++;
    this.log("forward");
  }

  // Turning
  turn_right() {
    const dirs = ["UP", "RIGHT", "DOWN", "LEFT"];
    const idx = dirs.indexOf(this.facing);
    this.facing = dirs[(idx + 1) % 4];
    this.log("turn_right");
  }

  turn_left() {
    const dirs = ["UP", "RIGHT", "DOWN", "LEFT"];
    const idx = dirs.indexOf(this.facing);
    this.facing = dirs[(idx + 3) % 4];
    this.log("turn_left");
  }

  // Check if path is clear (Level 4, 8)
  path_is_clear(direction) {
    const dir = direction || this.facing;
    let nx = this.x;
    let ny = this.y;
    if (dir === "RIGHT") nx++;
    else if (dir === "LEFT") nx--;
    else if (dir === "UP") ny--;
    else if (dir === "DOWN") ny++;
    if (!this.map[ny] || this.map[ny][nx] === undefined) return false;
    return this.map[ny][nx] !== 1;
  }

  // Check if at goal
  at_goal() {
    return this.map[this.y] && this.map[this.y][this.x] === "E";
  }

  // Collect item (Level 9)
  collect_item() {
    this.score += 1;
    this.history.push({ action: "collect", score: this.score, x: this.x, y: this.y });
  }

  // Check if item is ahead
  item_ahead() {
    let nx = this.x;
    let ny = this.y;
    if (this.facing === "RIGHT") nx++;
    else if (this.facing === "LEFT") nx--;
    else if (this.facing === "UP") ny--;
    else if (this.facing === "DOWN") ny++;
    return this.map[ny] && (this.map[ny][nx] === "d" || this.map[ny][nx] === 2);
  }

  // Show star animation
  show_star() {
    this.history.push({ action: "show_star", x: this.x, y: this.y });
  }

  // Change score
  change_score(amount) {
    this.score += amount;
    this.history.push({ action: "score_change", amount, score: this.score });
  }

  log(dir) {
    this.history.push({ action: "move", direction: dir, x: this.x, y: this.y });
  }

  getSteps() {
    return this.history;
  }
}

// Level 1, 3, 6 - execute a simple sequence
export const executeSequence = (commands, engine) => {
  commands.forEach(cmd => {
    if (cmd === "move_right()") engine.move_right();
    else if (cmd === "move_left()") engine.move_left();
    else if (cmd === "move_up()") engine.move_up();
    else if (cmd === "move_down()") engine.move_down();
    else if (cmd === "move_forward()") engine.move_forward();
    else if (cmd === "turn_right()") engine.turn_right();
    else if (cmd === "turn_left()") engine.turn_left();
  });
  return engine.getSteps();
};

// Level 10 - smart loop
export const executeSmartLoop = (engine) => {
  let limit = 0; // protect from infinite loops
  while (!engine.at_goal() && limit < 100) {
    if (engine.path_is_clear()) {
      engine.move_forward();
    } else {
      engine.turn_right();
    }
    limit++;
  }
  return engine.getSteps();
};

// HTML level checkers
export const checkLevel1 = (htmlCode) => {
  const hasTitle = /<title>.*<\/title>/.test(htmlCode);
  const hasH1 = /<h1>.*<\/h1>/.test(htmlCode);
  const hasP = /<p>.*<\/p>/.test(htmlCode);
  if (hasTitle && hasH1 && hasP) {
    return { success: true, message: "Level 1 completed!" };
  }
  return { success: false, message: "Missing required HTML tags" };
};

export const finalLevelLogic = (code) => {
  const locks = {
    header: code.includes("<header>"),
    nav: code.includes("<nav>"),
    main: code.includes("<main>"),
    footer: code.includes("<footer>")
  };
  const score = Object.values(locks).filter(Boolean).length;
  return {
    progress: (score / 4) * 100,
    canReachTreasure: score === 4,
    locks
  };
};
