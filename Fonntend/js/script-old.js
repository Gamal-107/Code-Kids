// ==================== PAGE NAVIGATION ====================

function showSection(sectionName) {
  document.querySelectorAll("section").forEach((sec) => {
    sec.style.display = "none";
    sec.classList.remove("active");
  });
  const targetSection = document.querySelector(`.${sectionName}`);
  if (targetSection) {
    targetSection.style.display = "block";
    targetSection.classList.add("active");
  }
}

// Check if user is logged in on page load - WAIT FOR DOM TO LOAD FIRST
document.addEventListener("DOMContentLoaded", () => {
  const token = getToken();
  if (token) {
    // User is logged in
    console.log("User is logged in");
    showSection("ready"); // Go to ready section after login
  } else {
    // User not logged in
    showSection("home");
  }
});;

// ==================== HOME PAGE NAVIGATION ====================

// When Clicked On The Start Button Go To The Start Game Page
const start = document.querySelector(".start");
if (start) {
  start.addEventListener("click", () => {
    const token = getToken();
    if (token) {
      showSection("ready");
    } else {
      showSection("signup");
    }
  });
}

// When Clicked On The Back Home Button Go To The Home Page
const backHome = document.querySelectorAll(".back-home");
backHome.forEach((back) => {
  if (back) {
    back.addEventListener("click", (e) => {
      e.preventDefault();
      showSection("home");
    });
  }
});

// When Clicked On The Start Game Button Go To The Start Game Page
const startGame = document.querySelector(".start-game");
if (startGame) {
  startGame.addEventListener("click", () => {
    showSection("start-journey");
  });
}

// When Clicked On The How To Play Button Go To The How Play Page
const howPlay = document.querySelector(".how-to-paly");
if (howPlay) {
  howPlay.addEventListener("click", () => {
    showSection("how-play");
  });
}

// When Clicked On The Previous Button Go To The Ready Page
const prevJourney = document.querySelector(".previous.journey");
if (prevJourney) {
  prevJourney.addEventListener("click", () => {
    showSection("ready");
  });
}

// When Clicked On The Previous Button Of Challenge Page Go To The Start Journey Page
const prevsChallenges = document.querySelectorAll(".challenge .previous");
prevsChallenges.forEach((prev) => {
  prev.addEventListener("click", () => {
    showSection("start-journey");
  });
});

// ==================== SIGN UP & LOGIN ====================

// Sign Up Button - Show Sign Up Form
const signBtn = document.querySelector(".sign-btn");
if (signBtn) {
  signBtn.addEventListener("click", () => {
    showSection("signup");
  });
}

// Toggle between Sign Up and Login Forms
const toggleLoginLink = document.querySelector(".toggle-login");
const toggleSignupLink = document.querySelector(".toggle-signup");

if (toggleLoginLink) {
  toggleLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("login");
  });
}

if (toggleSignupLink) {
  toggleSignupLink.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("signup");
  });
}

// ==================== SIGN UP FORM ====================

const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    const errorMsg = document.getElementById("signup-error");
    const loadingMsg = document.getElementById("signup-loading");
    const submitBtn = signupForm.querySelector(".signup-btn");

    try {
      errorMsg.style.display = "none";
      loadingMsg.style.display = "block";
      loadingMsg.textContent = "Creating your account...";
      submitBtn.disabled = true;

      const result = await registerUser(username, email, password);
      loadingMsg.textContent = "✓ Account created successfully!";

      setTimeout(() => {
        showSection("ready");
        signupForm.reset();
        loadingMsg.style.display = "none";
        submitBtn.disabled = false;
      }, 1500);
    } catch (error) {
      errorMsg.textContent = "❌ " + error.message;
      errorMsg.style.display = "block";
      loadingMsg.style.display = "none";
      submitBtn.disabled = false;
    }
  });
}

// ==================== LOGIN FORM ====================

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const errorMsg = document.getElementById("login-error");
    const loadingMsg = document.getElementById("login-loading");
    const submitBtn = loginForm.querySelector(".login-btn");

    try {
      errorMsg.style.display = "none";
      loadingMsg.style.display = "block";
      loadingMsg.textContent = "Logging in...";
      submitBtn.disabled = true;

      const result = await loginUser(email, password);
      loadingMsg.textContent = "✓ Login successful!";

      setTimeout(() => {
        showSection("ready");
        loginForm.reset();
        loadingMsg.style.display = "none";
        submitBtn.disabled = false;
      }, 1500);
    } catch (error) {
      errorMsg.textContent = "❌ " + error.message;
      errorMsg.style.display = "block";
      loadingMsg.style.display = "none";
      submitBtn.disabled = false;
    }
  });
}

// ==================== PASSWORD VISIBILITY TOGGLE ====================

// Sign Up Password Toggle
const togglePasswordSignup = document.querySelector(".toggle-password-signup");
const signupPasswordInput = document.getElementById("signup-password");

if (togglePasswordSignup && signupPasswordInput) {
  togglePasswordSignup.addEventListener("click", function () {
    if (signupPasswordInput.type === "password") {
      signupPasswordInput.type = "text";
      togglePasswordSignup.classList = "fa-solid fa-eye toggle-password-signup";
    } else {
      signupPasswordInput.type = "password";
      togglePasswordSignup.classList =
        "fa-solid fa-eye-slash toggle-password-signup";
    }
  });
}

// Login Password Toggle
const togglePasswordLogin = document.querySelector(".toggle-password-login");
const loginPasswordInput = document.getElementById("login-password");

if (togglePasswordLogin && loginPasswordInput) {
  togglePasswordLogin.addEventListener("click", function () {
    if (loginPasswordInput.type === "password") {
      loginPasswordInput.type = "text";
      togglePasswordLogin.classList = "fa-solid fa-eye toggle-password-login";
    } else {
      loginPasswordInput.type = "password";
      togglePasswordLogin.classList =
        "fa-solid fa-eye-slash toggle-password-login";
    }
  });
}

// ==================== LANGUAGE CATEGORIES ====================

// When Clicked On The Any Challenge Category Button Go To The Challenge Category Page
function showChallengeCategory(category) {
  const categoryBtn = document.querySelector(`.${category}-category`);
  if (categoryBtn) {
    categoryBtn.addEventListener("click", () => {
      const token = getToken();
      if (token) {
        showSection(`${category}.challenge`);
      } else {
        alert("Please log in first to access levels");
        showSection("login");
      }
    });
  }
}
showChallengeCategory("scratch");
showChallengeCategory("python");
showChallengeCategory("html");

// ==================== CHALLENGE BUTTONS ====================

const startLevHTML = document.querySelector(".html.challenge .primary");
const startLevPy = document.querySelector(".python.challenge .primary");
const startLevScr = document.querySelector(".scratch.challenge .primary");

if (startLevHTML) {
  startLevHTML.addEventListener("click", () => {
    showSection("set1");
  });
}

if (startLevPy) {
  startLevPy.addEventListener("click", () => {
    showSection("set2");
  });
}

if (startLevScr) {
  startLevScr.addEventListener("click", () => {
    showSection("set3");
  });
}

const PrevLevHTML = document.querySelector(".set1 .previous");
const PrevLevPy = document.querySelector(".set2 .previous");
const PrevLevScr = document.querySelector(".set3 .previous");

if (PrevLevHTML) {
  PrevLevHTML.addEventListener("click", () => {
    showSection("html.challenge");
  });
}

if (PrevLevPy) {
  PrevLevPy.addEventListener("click", () => {
    showSection("python.challenge");
  });
}

if (PrevLevScr) {
  PrevLevScr.addEventListener("click", () => {
    showSection("scratch.challenge");
  });
}

// ==================== QUIZ SYSTEM ====================

// Inline question sets
window.questions1 = [
  {
    question: "What is HTML used for?",
    options: [
      "Creating web pages",
      "Playing games",
      "Designing music",
      "Editing photos",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which tag is used for a paragraph?",
    options: ["<p>", "<para>", "<text>", "<div>"],
    correctAnswer: 0,
  },
  {
    question: "How do you create a link in HTML?",
    options: ["<a href=...>", "<link>...", "<url>...", "<goto>..."],
    correctAnswer: 0,
  },
  {
    question: "Which tag adds an image?",
    options: ["<image>", "<img>", "<src>", "<picture>"],
    correctAnswer: 1,
  },
  {
    question: "What does <ul> represent?",
    options: ["Unordered list", "Underlined text", "Unique list", "Unit list"],
    correctAnswer: 0,
  },
];

window.questions2 = [
  {
    question: "Which attribute sets an image source?",
    options: ["src", "href", "link", "ref"],
    correctAnswer: 0,
  },
  {
    question: "What tag groups table rows?",
    options: ["<tr>", "<td>", "<th>", "<table>"],
    correctAnswer: 0,
  },
  {
    question: "Which element is used for a numbered list?",
    options: ["<ol>", "<ul>", "<li>", "<num>"],
    correctAnswer: 0,
  },
  {
    question: "Where does meta information go?",
    options: ["<head>", "<body>", "<footer>", "<main>"],
    correctAnswer: 0,
  },
  {
    question: "Which tag is used for a section heading?",
    options: ["<h1>", "<head>", "<header>", "<section>"],
    correctAnswer: 0,
  },
];

window.questions3 = [
  {
    question: "Which tag defines the document type?",
    options: ["<!DOCTYPE html>", "<doctype>", "<html>", "<doc>"],
    correctAnswer: 0,
  },
  {
    question: "How do you add a comment in HTML?",
    options: ["<!-- comment -->", "// comment", "/* comment */", "# comment"],
    correctAnswer: 0,
  },
  {
    question: "Which attribute gives an element a unique id?",
    options: ["class", "id", "name", "key"],
    correctAnswer: 1,
  },
  {
    question: "What is the root element of an HTML document?",
    options: ["<html>", "<body>", "<head>", "<root>"],
    correctAnswer: 0,
  },
  {
    question: "Which tag is used to embed JavaScript?",
    options: ["<script>", "<js>", "<code>", "<javascript>"],
    correctAnswer: 0,
  },
];

class QuizInstance {
  constructor(container, questionsUrl) {
    this.container = container;
    this.questionsUrl = questionsUrl;
    this.questions = [];
    this.current = 0;
    this.score = 0;
    this.answers = [];

    // UI refs
    this.qText = container.querySelector(".question-text");
    this.optionsWrap = container.querySelector(".options-container");
    this.progressFill = container.querySelector(".progress-fill");
    this.progressText = container.querySelector(".progress-text");
    this.counter = container.querySelector(".question-counter");
    this.backBtn = container.querySelector(".back-btn");
    this.nextBtn = container.querySelector(".next-btn");
    this.resultScreen = container.querySelector(".result-screen");
    this.finalScore = container.querySelector(".finalScore");
    this.totalQuestions = container.querySelector(".totalQuestions");
    this.resultMessage = container.querySelector(".result-message");
    this.restartBtn = container.querySelector(".restart-btn");

    this.init();
  }

  async init() {
    try {
      // try inline dataset first (window.questions1 etc.)
      const key = this.questionsUrl.replace(/\.json$/i, "");
      if (window[key]) {
        this.questions = window[key];
      } else {
        const res = await fetch(this.questionsUrl);
        this.questions = await res.json();
      }
    } catch (e) {
      this.questions = [];
      console.error("Failed to load", this.questionsUrl, e);
    }

    this.answers = new Array(this.questions.length).fill(null);
    this.attach();
    this.render();
  }

  attach() {
    this.backBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());
    this.restartBtn.addEventListener("click", () => this.restart());
  }

  render() {
    if (!this.questions.length) {
      this.qText.textContent = "No questions available.";
      return;
    }

    const q = this.questions[this.current];
    this.qText.textContent = q.question;
    this.optionsWrap.innerHTML = "";

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = opt;
      btn.disabled = this.answers[this.current] !== null;
      btn.addEventListener("click", () => this.select(idx));

      // restore state
      if (this.answers[this.current] !== null) {
        const sel = this.answers[this.current];
        if (idx === sel)
          btn.classList.add(idx === q.correctAnswer ? "correct" : "wrong");
        if (idx === q.correctAnswer) btn.classList.add("correct");
      }

      this.optionsWrap.appendChild(btn);
    });

    const progress = ((this.current + 1) / this.questions.length) * 100;
    this.progressFill.style.width = `${progress}%`;
    this.progressText.textContent = `${Math.round(progress)}% complete`;
    this.counter.textContent = `Question ${this.current + 1} From ${this.questions.length}`;
    this.backBtn.disabled = this.current === 0;
    this.nextBtn.innerHTML =
      this.current === this.questions.length - 1 ?
        "<span>finish</span>"
      : "<span>next</span>";
  }

  select(idx) {
    if (this.answers[this.current] !== null) return;
    this.answers[this.current] = idx;
    const q = this.questions[this.current];
    const btns = this.optionsWrap.querySelectorAll(".option-btn");
    btns.forEach((b) => (b.disabled = true));

    if (idx === q.correctAnswer) {
      btns[idx].classList.add("correct");
      this.score++;
    } else {
      btns[idx].classList.add("wrong");
      btns[q.correctAnswer].classList.add("correct");
    }

    // send partial progress to backend (optional)
    this.sendUpdate({
      type: "answer",
      questionIndex: this.current,
      selected: idx,
    });
  }

  next() {
    if (this.current < this.questions.length - 1) {
      this.current++;
      this.render();
    } else {
      this.finish();
    }
  }

  prev() {
    if (this.current > 0) {
      this.current--;
      this.render();
    }
  }

  finish() {
    this.resultScreen.style.display = "flex";
    this.finalScore && (this.finalScore.textContent = this.score);
    this.totalQuestions &&
      (this.totalQuestions.textContent = this.questions.length);

    const pct = (this.score / this.questions.length) * 100;
    const msg =
      pct === 100 ? "Perfect! You're a master! 🏆"
      : pct >= 80 ? "Excellent work! 🌟"
      : pct >= 60 ? "Good job! 📚"
      : pct >= 40 ? "Not bad! Keep improving 💪"
      : "Keep practicing 🎯";
    this.resultMessage && (this.resultMessage.textContent = msg);

    // final submit to backend
    this.sendUpdate({
      type: "finish",
      score: this.score,
      answers: this.answers,
      total: this.questions.length,
    });
  }

  restart() {
    this.current = 0;
    this.score = 0;
    this.answers = new Array(this.questions.length).fill(null);
    this.resultScreen.style.display = "none";
    this.render();
    this.sendUpdate({ type: "restart" });
  }

  async sendUpdate(payload) {
    const body = {
      quiz: this.questionsUrl,
      payload,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    try {
      await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.warn("Failed to send to backend", e);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(
    ".quiz-container[data-questions]",
  );
  containers.forEach((c) => {
    const url = c.dataset.questions;
    new QuizInstance(c, url);
  });
});

// Questions Test

/* Multi-instance Quiz loader
     Each `.quiz-container` must include a `data-questions` attribute
     pointing to a JSON file name (e.g. questions1.json) OR the loader will
     look for an inline dataset declared below (window.questions1 etc.).
     On finish, the user's answers are POSTed to /submit (backend).
*/

// Inline question sets (moved from separate JSON files)
window.questions1 = [
  {
    question: "What is HTML used for?",
    options: [
      "Creating web pages",
      "Playing games",
      "Designing music",
      "Editing photos",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which tag is used for a paragraph?",
    options: ["<p>", "<para>", "<text>", "<div>"],
    correctAnswer: 0,
  },
  {
    question: "How do you create a link in HTML?",
    options: ["<a href=...>", "<link>...", "<url>...", "<goto>..."],
    correctAnswer: 0,
  },
  {
    question: "Which tag adds an image?",
    options: ["<image>", "<img>", "<src>", "<picture>"],
    correctAnswer: 1,
  },
  {
    question: "What does <ul> represent?",
    options: ["Unordered list", "Underlined text", "Unique list", "Unit list"],
    correctAnswer: 0,
  },
];

window.questions2 = [
  {
    question: "Which attribute sets an image source?",
    options: ["src", "href", "link", "ref"],
    correctAnswer: 0,
  },
  {
    question: "What tag groups table rows?",
    options: ["<tr>", "<td>", "<th>", "<table>"],
    correctAnswer: 0,
  },
  {
    question: "Which element is used for a numbered list?",
    options: ["<ol>", "<ul>", "<li>", "<num>"],
    correctAnswer: 0,
  },
  {
    question: "Where does meta information go?",
    options: ["<head>", "<body>", "<footer>", "<main>"],
    correctAnswer: 0,
  },
  {
    question: "Which tag is used for a section heading?",
    options: ["<h1>", "<head>", "<header>", "<section>"],
    correctAnswer: 0,
  },
];

window.questions3 = [
  {
    question: "Which tag defines the document type?",
    options: ["<!DOCTYPE html>", "<doctype>", "<html>", "<doc>"],
    correctAnswer: 0,
  },
  {
    question: "How do you add a comment in HTML?",
    options: ["<!-- comment -->", "// comment", "/* comment */", "# comment"],
    correctAnswer: 0,
  },
  {
    question: "Which attribute gives an element a unique id?",
    options: ["class", "id", "name", "key"],
    correctAnswer: 1,
  },
  {
    question: "What is the root element of an HTML document?",
    options: ["<html>", "<body>", "<head>", "<root>"],
    correctAnswer: 0,
  },
  {
    question: "Which tag is used to embed JavaScript?",
    options: ["<script>", "<js>", "<code>", "<javascript>"],
    correctAnswer: 0,
  },
];

class QuizInstance {
  constructor(container, questionsUrl) {
    this.container = container;
    this.questionsUrl = questionsUrl;
    this.questions = [];
    this.current = 0;
    this.score = 0;
    this.answers = [];

    // UI refs
    this.qText = container.querySelector(".question-text");
    this.optionsWrap = container.querySelector(".options-container");
    this.progressFill = container.querySelector(".progress-fill");
    this.progressText = container.querySelector(".progress-text");
    this.counter = container.querySelector(".question-counter");
    this.backBtn = container.querySelector(".back-btn");
    this.nextBtn = container.querySelector(".next-btn");
    this.resultScreen = container.querySelector(".result-screen");
    this.finalScore = container.querySelector(".finalScore");
    this.totalQuestions = container.querySelector(".totalQuestions");
    this.resultMessage = container.querySelector(".result-message");
    this.restartBtn = container.querySelector(".restart-btn");

    this.init();
  }

  async init() {
    try {
      // try inline dataset first (window.questions1 etc.)
      const key = this.questionsUrl.replace(/\.json$/i, "");
      if (window[key]) {
        this.questions = window[key];
      } else {
        const res = await fetch(this.questionsUrl);
        this.questions = await res.json();
      }
    } catch (e) {
      this.questions = [];
      console.error("Failed to load", this.questionsUrl, e);
    }

    this.answers = new Array(this.questions.length).fill(null);
    this.attach();
    this.render();
  }

  attach() {
    this.backBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());
    this.restartBtn.addEventListener("click", () => this.restart());
  }

  render() {
    if (!this.questions.length) {
      this.qText.textContent = "No questions available.";
      return;
    }

    const q = this.questions[this.current];
    this.qText.textContent = q.question;
    this.optionsWrap.innerHTML = "";

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = opt;
      btn.disabled = this.answers[this.current] !== null;
      btn.addEventListener("click", () => this.select(idx));

      // restore state
      if (this.answers[this.current] !== null) {
        const sel = this.answers[this.current];
        if (idx === sel)
          btn.classList.add(idx === q.correctAnswer ? "correct" : "wrong");
        if (idx === q.correctAnswer) btn.classList.add("correct");
      }

      this.optionsWrap.appendChild(btn);
    });

    const progress = ((this.current + 1) / this.questions.length) * 100;
    this.progressFill.style.width = `${progress}%`;
    this.progressText.textContent = `${Math.round(progress)}% complete`;
    this.counter.textContent = `Question ${this.current + 1} From ${this.questions.length}`;
    this.backBtn.disabled = this.current === 0;
    this.nextBtn.innerHTML =
      this.current === this.questions.length - 1 ?
        "<span>finish</span>"
      : "<span>next</span>";
  }

  select(idx) {
    if (this.answers[this.current] !== null) return;
    this.answers[this.current] = idx;
    const q = this.questions[this.current];
    const btns = this.optionsWrap.querySelectorAll(".option-btn");
    btns.forEach((b) => (b.disabled = true));

    if (idx === q.correctAnswer) {
      btns[idx].classList.add("correct");
      this.score++;
    } else {
      btns[idx].classList.add("wrong");
      btns[q.correctAnswer].classList.add("correct");
    }

    // send partial progress to backend (optional)
    this.sendUpdate({
      type: "answer",
      questionIndex: this.current,
      selected: idx,
    });
  }

  next() {
    if (this.current < this.questions.length - 1) {
      this.current++;
      this.render();
    } else {
      this.finish();
    }
  }

  prev() {
    if (this.current > 0) {
      this.current--;
      this.render();
    }
  }

  finish() {
    this.resultScreen.style.display = "flex";
    this.finalScore && (this.finalScore.textContent = this.score);
    this.totalQuestions &&
      (this.totalQuestions.textContent = this.questions.length);

    const pct = (this.score / this.questions.length) * 100;
    const msg =
      pct === 100 ? "Perfect! You're an HTML master! 🏆"
      : pct >= 80 ? "Excellent work! 🌟"
      : pct >= 60 ? "Good job! 📚"
      : pct >= 40 ? "Not bad! Keep improving 💪"
      : "Keep practicing 🎯";
    this.resultMessage && (this.resultMessage.textContent = msg);

    // final submit to backend
    this.sendUpdate({
      type: "finish",
      score: this.score,
      answers: this.answers,
      total: this.questions.length,
    });
  }

  restart() {
    this.current = 0;
    this.score = 0;
    this.answers = new Array(this.questions.length).fill(null);
    this.resultScreen.style.display = "none";
    this.render();
    this.sendUpdate({ type: "restart" });
  }

  async sendUpdate(payload) {
    const body = {
      quiz: this.questionsUrl,
      payload,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    try {
      await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (e) {
      // backend may not exist in local preview; ignore errors
      console.warn("Failed to send to backend", e);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(
    ".quiz-container[data-questions]",
  );
  containers.forEach((c) => {
    const url = c.dataset.questions;
    new QuizInstance(c, url);
  });
});

const startLevHTML = document.querySelector(".html.challenge .primary");
const startLevPy = document.querySelector(".python.challenge .primary");
const startLevScr = document.querySelector(".scratch.challenge .primary");

startLevHTML.addEventListener("click", () => {
  showSection("set1");
});
startLevPy.addEventListener("click", () => {
  showSection("set2");
});
startLevScr.addEventListener("click", () => {
  showSection("set3");
});

const PrevLevHTML = document.querySelector(".set1 .previous");
const PrevLevPy = document.querySelector(".set2 .previous");
const PrevLevScr = document.querySelector(".set3 .previous");

console.log(PrevLevHTML, PrevLevPy, PrevLevScr);

PrevLevHTML.addEventListener("click", () => {
  showSection("html.challenge");
});
PrevLevPy.addEventListener("click", () => {
  showSection("python.challenge");
});
PrevLevScr.addEventListener("click", () => {
  showSection("scratch.challenge");
});
// Question test
