// src/seed.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import Course from "./models/course.model.js";
import Lesson from "./models/lesson.model.js";
import { User } from "./models/user.model.js";

dotenv.config({ path: './.env' });

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected for seeding!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};



// ==================== Sample Users ====================

// ==================== Lessons ====================
const lessons = [

// 🟢 Scratch Placement Test
    {
    title: "Scratch Placement Test",
    language: "Scratch",
    level:"0",
    type: "placement-test",
    explanation: "Test your Scratch skills",
    game: "quiz",
    quiz: [
      {
        question: "What block are you going to use to let the character move to the right?",
        options:["Turn Right15degress",
"Play Sound Meow",
"Move 10 Step",
"Say Hello!"],
        correctAnswer: "Move 10 Step"
      },
        {
        question: "What is the block that starts the program?",
        options:["When This Sprite Click",

"When Green Flag Clicked",

"When Loudness 10",

"When Time > 10"],
        correctAnswer: "When Green Flag Clicked"
      },
        {
        question:"I want to repeat the code 5 times, What block will you use?",
        options:["Wait 5 Seconds",

"Forever",

"Repeat 5",

"If Then"],
        correctAnswer: "Repeat 5"
      },
        {
        question:"How do you let the character say 'hello'?",
        options:["Think Hello!",

"Say Hellol",

"Play Sound Hello",

"Change Size By 10"],
        correctAnswer: "Say Hello!"
      },
        {
        question:"Do you want to add a meow sound, What is the block?",
        options:["Play Sound Meow","Stop All Sound",

"Change Volume By 10",

"Record New Sound"],
        correctAnswer: "Play Sound Meow"
      }
    ]
  },

  // 🟢 HTML placement test
  {
    title: "HTML Placement Test",
    language: "HTML",
    level:"0",
    type: "placement-test",
    explanation: "Test your HTML skills",
    game: "quiz",
    quiz: [
      {
        question: "What is HTML used for?",
        options: ["Playing Game","Drawing Pictures","Creatinng Web Pages","Listening To Music"],
        correctAnswer: "Creating Web Pages"
      },
        {
            question: "Which tag is used to make a big heading?",
            options:["<p>","<h1>","<div>","<span>"],
            correctAnswer: "<h1>"
        },
        {
            question: "Which tag is used to write normal text?",
            options:["<title>","<h1>","<img>","<p>"],
            correctAnswer: "<p>"
        },
        {
            question:"Which tog is used to add an image?",
            options:["<photo>","<pic>","<image>","<img>"],
            correctAnswer: "<img>"
        },
        {
            question:"Which tag is the main container of an HTML pages?",
            options:["<head>","<title>","<body>","<html>"],
            correctAnswer: "<html>"
        }
    ]
  },    

        


    // 🟢 Python placement test
    {
  title: "Python Placement Test",
  language: "Python",
  level: "0",
  type: "placement-test",
  explanation: "Test your Python skills",
  game: "quiz",

  quiz: [
    {
      question: "Which code creates a list of moves?",
      options: [
        'move="Right,Left,Up"',
        "moves Right+Left+Up",
        'moves=["Right","Left","Up"]',
        "moves Right,Left,Up"
      ],
      correctAnswer: 'moves=["Right","Left","Up"]'
    },
    {
      question: "Which line moves the character to the right?",
      options: ["X+1", "X=X+1", "Y=Y+1", "X=0"],
      correctAnswer: "X=X+1"
    },
    {
      question: "I want to repeat the code 5 times, What block will you use?",
      options: ["Wait 5 seconds", "Forever", "Repeat 5 times", "If Then"],
      correctAnswer: "Repeat 5 times"
    },
    {
      question: "How do you let the character say 'hello'?",
      options: ["Think Hello", "Play sound Hello", "Say Hello", "Change size By 10"],
      correctAnswer: "Say Hello"
    },
    {
      question: "Do you want to add a meow sound, What is the block?",
      options: ["Play Sound Meow", "Stop All Sound", "Change Volume By 10", "Record New Sound"],
      correctAnswer: "Play Sound Meow"
    }
  ]
},
    



  // 🟡 Scratch Level 1
 
{
  title: "THE RIGHT ORDER",
  language: "Scratch",
  type: "lesson",
  level: "1",
  game: "code",
  map:[[1,0,1,1,1], [1,'S',0,1,1], [1,1,0,1,1], [1,0,0,0,1], [1,1,1,'E',1]],


  solution: "while not at_goal():if path_is_clear():move_forward(), else:turn_right(), if not path_is_clear():turn_right(),turn_right()",
  tasks: [
    {
      description: "THE RIGHT ORDER",
      solution: "while not at_goal():if path_is_clear():move_forward(), else:turn_right(), if not path_is_clear():turn_right(),turn_right()",
    }
  ]
},
  // LEVEL 2: TURNS AROUND
  {
    title: "TURNS AROUND",
    language: "Scratch",
    type: "lesson",
    level: "2",
    game: "code",
    map:[[1,1,1,1,1], ['S',0,0,1,1], [1,1,0,1,1], [1,'E',0,1,1], [1,1,1,1,1]],
    solution: "GO_Forward(), Turn_Right(), GO_Forward(), Turn_Right(), GO_Forward(), Turn_Right(), GO_Forward(), Turn_Right(), GO_Forward(), GO_Forward()",
    tasks: [
      {
        description: "TURNS AROUND",
        solution: "GO_Forward(), Turn_Right(), GO_Forward(), Turn_Right(), GO_Forward(), Turn_Right(), GO_Forward(), Turn_Right(), GO_Forward(), GO_Forward()"
      }
    ]
  },

  // LEVEL 3: PRE-PLANNING
  {
    title: "PRE-PLANNING",
    language: "Scratch",
    type: "lesson",
    level: "3",
    game: "code",
    map:[['S',0,0,0,1,1], [1,1,1,0,1,1], [0,0,0,0,0,1], [0,1,1,1,0,1], [0,0,0,1,0,'E'], [1,1,1,1,1,1]],
    solution: "GO_Forward(), Turn_Right(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Right(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Right(), GO_Forward(), Turn_Right(), GO_Forward()",
    tasks: [
      {
        description: "PRE-PLANNING",
        solution: "GO_Forward(), Turn_Right(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Right(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Right(), GO_Forward(), Turn_Right(), GO_Forward()"
      }
    ]
  },

  // LEVEL 4: LOOP ADVENTURE!
  {
    title: "LOOP ADVENTURE!",
    language: "Scratch",
    type: "lesson",
    level: "4",
    game: "code",
    map:[['S',0,0,0,0], [1,1,1,1,0], [0,0,0,0,0], [0,1,1,1,1], [0,0,0,0,'E']],
    solution: "repeat 4:go forward(), move down, repeat 4:go forward(), move down, repeat 4:go forward()",
    tasks: [
      {
        description: "LOOP ADVENTURE!",
        solution: "repeat 4:go forward(), move down, repeat 4:go forward(), move down, repeat 4:go forward()"
      }
    ]
  },

  // LEVEL 5: SMART REPEAT!
  {
    title: "SMART REPEAT!",
    language: "Scratch",
    type: "lesson",
    level: "5",
    game: "code",
    map:[["S", 0,  1], [1,   0,  1], ["E", 0,  1]],
    solution: "repeat 2:move 5 steps, turn right 90, move 3 steps, turn right 90, move 5 step, move down, move 3 steps",
    tasks: [
      {
        description: "SMART REPEAT!",
        solution: "repeat 2:move 5 steps, turn right 90, move 3 steps, turn right 90, move 5 step, move down, move 3 steps"
      }
    ]
  },

  // LEVEL 6: IF STATEMENT!
  {
    title: "IF STATEMENT!",
    language: "Scratch",
    type: "lesson",
    level: "6",
    game: "code",
    map:[["S", 0,  1], [1,   0,  0], ["E", 1,  1]],
    solution: "repeat 10:if path_clear():go_forward(), else:turn_right()",
    tasks: [
      {
        description: "IF STATEMENT!",
        solution: "repeat 10:if path_clear():go_forward(), else:turn_right()"
      }
    ]
  },

  // LEVEL 7: IF / ELSE STATEMENT!
  {
    title: "IF / ELSE STATEMENT!",
    language: "Scratch",
    type: "lesson",
    level: "7",
    game: "code",
    map:[["S", 0, 0, 1], [1, 1, 0, 1], [1, 0, 0, 1], [1, 0, 1, 1], ["E", 0, 0, 1]],
    solution: "repeat 15:if path_clear():go_forward(),else:move_down()",
    tasks: [
      {
        description: "IF / ELSE STATMENT!",
        solution: "repeat 15:if path_clear():go_forward(),else:move_down()"
      }
    ]
  },

  // LEVEL 8: VARIABLES!
  {
    title: "VARIABLES!",
    language: "Scratch",
    type: "lesson",
    level: "8",
    game: "code",
    map:[["S",  0,   1], [1,   "d",  0], ["E",  1,   1]],
    solution: "repeat 10:if path_clear():go_forward(),if on_diamond():change scour by 1, else:move_down()",
    tasks: [
      {
        description: "VARIABLES!",
        solution: "repeat 10:if path_clear():go_forward(),if on_diamond():change scour by 1, else:move_down()"
      }
    ]
  },

  // LEVEL 9: EVENTS!
  {
    title: "EVENTS!",
    language: "Scratch",
    type: "lesson",
    level: "9",
    game: "code",
    map:[["S",  0,   1], [1,   "d",  0], ["E",  1,   1]],
    solution: "on_click():go_forward(), on_reach(treasure):show_star()",
    tasks: [
      {
        description: "EVENTS!",
        solution: "on_click():go_forward(), on_reach(treasure):show_star()"
      }
    ]
  },

  // LEVEL 10: FINAL CHALLENGE!
  {
    title: "FINAL CHALLENGE!",
    language: "Scratch",
    type: "lesson",
    level: "10",
    game: "code",
    map:[["S",  0,  "d"], [1,   "d",  0 ], [1,    0,  "E"]],
    solution: "GO_Forward(), Turn_Right(), GO_Forward(), Turn_Left(), GO_Forward(), Change_Score_By_1(), GO_Forward(), Turn_Right(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Right(), GO_Forward(), Change_Score_By_1(), GO_Forward(), Turn_Right(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Left(), GO_Forward(), Change_Score_By_1(), GO_Forward(), Turn_Left(), GO_Forward()",
    tasks: [
      {
        description: "FINAL CHALLENGE!",
        solution: "GO_Forward(), Turn_Right(), GO_Forward(), Turn_Left(), GO_Forward(), Change_Score_By_1(), GO_Forward(), Turn_Right(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Right(), GO_Forward(), Change_Score_By_1(), GO_Forward(), Turn_Right(), GO_Forward(), Turn_Left(), GO_Forward(), Turn_Left(), GO_Forward(), Change_Score_By_1(), GO_Forward(), Turn_Left(), GO_Forward()"
      }
    ]
  },

// 🟢 Python Level 1
{
    title: "THE RIGHT ORDER",
    language: "Python",
    type : "lesson",
    level: "1",
    game: "code",
    map:[["S", "0", "0", "0", "0", "0", "0", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "0", "1"],
    ["1", "0", "0", "0", "0", "0", "1", "0", "1"],
    ["1", "0", "1", "1", "1", "1", "1", "0", "1"],
    ["1", "0", "0", "0", "0", "0", "0", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "0", "1"],
    ["1", "0", "0", "0", "0", "0", "0", "0", "E"]],
    solution: "move_right(), move_down(), move_left(), move_down(), move_right()",
    tasks: [
      {
        description: "THE RIGHT ORDER",
        solution: "move_right(), move_down(), move_left(), move_down(), move_right()",
      }
    ]
  },

  // 🟢 Python Level 2
  {
    title: "VARIABLES",
    language: "Python",
    type : "lesson",
    level: "2",
    game: "code",
    map:[["S", "0", "0", "0", "1", "0", "0", "0", "1"],
    ["1", "1", "1", "0", "1", "0", "1", "E", "1"],
    ["1", "0", "0", "0", "1", "0", "1", "1", "1"],
    ["1", "0", "1", "1", "1", "0", "0", "0", "1"],
    ["1", "0", "0", "1", "1", "1", "1", "0", "1"],
    ["1", "1", "0", "0", "0", "0", "0", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1"]],
    solution:  "x = 0, y = 0, x = x + 3, y = y - 2, x = x + 4, y = y + 1",
   
    tasks: [ 
      {
        description: "VARIABLES",
        solution:  "x = 0, y = 0, x = x + 3, y = y - 2, x = x + 4, y = y + 1",
      },
    ]
  },

  // 🟢 Python Level 3
  {
    title: "LOOPS",
    language: "Python",
    type : "lesson",
    level: "3",
    game: "code",
    map:[["1", "S", "0", "0", "0", "0", "0", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "0", "1"],
    ["1", "1", "1", "0", "0", "0", "0", "0", "1"],
    ["1", "1", "1", "0", "1", "1", "1", "1", "1"],
    ["1", "0", "0", "0", "0", "0", "0", "0", "1"],
    ["1", "0", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "0", "0", "0", "0", "0", "0", "E", "1"]],
    solution: "for i in range(6):move_right(), move_down(), for i in range(6):move_right(), move_down(), for i in range(3):move_right()",
   
    tasks: [
      {
        description: "LOOPS",
        solution: "for i in range(6):move_right(), move_down(), for i in range(6):move_right(), move_down(), for i in range(3):move_right()",
      },
    ]
  },

// ==================== LEVEL 4: CONDITIONS ====================
{
  title: "CONDITIONS",
  language: "Python",
  type: "lesson",
  level: "4",
  game: "code",
  map:[["1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "0", "0", "0", "0", "1", "0", "0", "1"],
    ["1", "0", "1", "1", "0", "1", "0", "1", "1"],
    ["S", "0", "0", "1", "0", "0", "0", "1", "1"],
    ["1", "1", "0", "1", "1", "1", "0", "1", "1"],
    ["1", "1", "0", "0", "0", "0", "0", "E", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1"]],
  solution: "if path_is_clear():move_right(), if path_is_clear():move_down(), if path_is_clear():move_right(), if path_is_clear():move_up(), if path_is_clear():move_right()",
  tasks: [
    {
      description: "CONDITIONS",
      solution: "if path_is_clear():move_right(), if path_is_clear():move_down(), if path_is_clear():move_right(), if path_is_clear():move_up(), if path_is_clear():move_right()"
    }
  ]
},
// ==================== LEVEL 5: FUNCTIONS ====================
{
  title: "FUNCTIONS",
  language: "Python",
  type: "lesson",
  level: "5",
  game: "code",
  map:[["1", "S", "0", "0", "0", "0", "0", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "0", "1"],
    ["1", "1", "0", "0", "0", "0", "1", "0", "1"],
    ["1", "1", "0", "1", "1", "1", "1", "0", "1"],
    ["1", "1", "0", "0", "0", "0", "0", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "E", "1"]],
  solution: "def go_straight():move_right(),  move_right(), go_straight(), move_down(), go_straight(), move_down(), go_straight()",
  tasks: [
    {
      description: "FUNCTIONS",
      solution: "def go_straight():move_right(),  move_right(), go_straight(), move_down(), go_straight(), move_down(), go_straight()"
    }
  ]
},
// ==================== LEVEL 6: LISTS ====================
{
  title: "LISTS",
  language: "Python",
  type: "lesson",
  level: "6",
  game: "code",
  map:[["1", "S", "0", "0", "0", "0", "0", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "0", "1", "1"],
    ["1", "E", "1", "0", "0", "0", "0", "1", "1"],
    ["1", "0", "1", "0", "1", "1", "1", "1", "1"],
    ["1", "0", "0", "0", "0", "0", "0", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1"]],
  solution: 'moves = ["right", "right", "down", "left", "left", "down", "right", "right"]',
  tasks: [
    {
      description: "LISTS",
      solution: 'moves = ["right", "right", "down", "left", "left", "down", "right", "right"]'
    }
  ]
},
// ==================== LEVEL 7: SMART PATHS ====================
{
  title: "SMART PATHS",
  language: "Python",
  type: "lesson",
  level: "7",
  game: "code",
  map:[["1", "S", "0", "0", "0", "0", "0", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "0", "1"],
    ["1", "1", "0", "0", "0", "0", "1", "0", "1"],
    ["1", "1", "0", "1", "1", "1", "1", "0", "1"],
    ["1", "1", "0", "0", "0", "0", "0", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "E", "1"]],
  solution: `path = ["right", "right", "down", "left", "left", "down", "right", "right"]`,
  tasks: [
    {
      description: "SMART PATHS",
      solution: `path = ["right", "right", "down", "left", "left", "down", "right", "right"]`
    }
  ]
},
// ==================== LEVEL 8: OBSTACLES ====================
{
  title: "OBSTACLES",
  language: "Python",
  type: "lesson",
  level: "8",
  game: "code",
  map:[["1", "1", "0", "0", "0", "0", "0", "0", "1"],
    ["1", "1", "0", "1", "1", "0", "1", "E", "1"],
    ["1", "1", "0", "1", "1", "0", "1", "1", "1"],
    ["S", "0", "0", "1", "1", "0", "0", "0", "1"],
    ["1", "1", "F", "1", "1", "1", "1", "0", "1"],
    ["1", "1", "0", "0", "F", "0", "0", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1"]],
  solution: `path = ["right", "down", "right", "up", "right"]

for move in path:
    if path_is_clear() and not obstacle_ahead():

        do(move)`,
  tasks: [
    {
      description: "OBSTACLES",
      solution: `path = ["right", "down", "right", "up", "right"]

for move in path:
    if path_is_clear() and not obstacle_ahead():

        do(move)`
    }
  ]
},
// ==================== LEVEL 9: GOALS & REWARDS ====================
{
  title: "GOALS & REWARDS",
  language: "Python",
  type: "lesson",
  level: "9",
  game: "code",
  map:[["1", "S", "0", "0", "0", "D", "0", "0", "1"],
    ["1", "1", "1", "0", "1", "1", "1", "0", "1"],
    ["1", "D", "0", "0", "0", "D", "1", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "0", "1"],
    ["1", "1", "0", "D", "0", "1", "1", "0", "1"],
    ["1", "1", "0", "1", "1", "1", "1", "E", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1"]],
  solution: `path = ["down", "right", "up", "right", "down", "right"]

for move in path:
    do(move)
    if item_ahead():
        collect_item()`,
  tasks: [
    {
      description: "GOALS & REWARDS",
      solution: `path = ["down", "right", "up", "right", "down", "right"]

for move in path:
    do(move)
    if item_ahead():
        collect_item()`
    }
  ]
},
// ==================== LEVEL 10: THINK LIKE A PROGRAMMER ====================
{
  title: "THINK LIKE A PROGRAMMER",
  language: "Python",
  type: "lesson",
  level: "10",
  game: "code",
  map:[["1", "S", "0", "0", "0", "D", "0", "0", "1"],
    ["1", "1", "1", "0", "1", "1", "1", "0", "1"],
    ["1", "D", "0", "0", "0", "D", "1", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "0", "1"],
    ["E", "0", "0", "D", "0", "1", "1", "0", "1"],
    ["1", "1", "0", "1", "1", "1", "1", "0", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1"]],
  solution: "while not at_goal():if path_is_clear():move_forward(), else:turn_right(), if not path_is_clear():turn_right(),turn_right()",
  tasks: [
    {
      description: "THINK LIKE A PROGRAMMER",
      solution: "while not at_goal():if path_is_clear():move_forward(), else:turn_right(), if not path_is_clear():turn_right(),turn_right()"
    }
  ]
},
  // HTML Level 1
  {
    title: "HELLO, WEB",
    language: "HTML",
    type: "lesson",
    level: "1",
    game: "code",
    map:[["S", "1", "1", "1", "1", "E"]],
    solution: "<!DOCTYPE html>, <html> ,<head>, <title>My First Web Page</title> ,</head>, <body>, <h1>Welcome to My Website</h1>, <p>This is my first HTML page!</p>, </body>, </html>",
    tasks: [
      {
        description: "HELLO, WEB",
        solution: "<!DOCTYPE html>, <html> ,<head>, <title>My First Web Page</title> ,</head>, <body>, <h1>Welcome to My Website</h1>, <p>This is my first HTML page!</p>, </body>, </html>"
      }
    ]
  },

  // LEVEL 2: BUILD YOUR PROFILE
  {
    title: "BUILD YOUR PROFILE",
    language: "HTML",
    type: "lesson",
    level: "2",
    game: "code",
    map:[["S", "1", "1", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "1", "1", "E"]],
    solution: '<!DOCTYPE html>, <html>, <head> ,<title>My profile</title>, </head>, <body>, <h1>John Doe</h1>, <img src="https://via.placeholder.com/150" alt="My Photo">, <p>I am learning HTML and building my first profile page!</p>, <a href="https://www.example.com">Visit my favorite website</a> ,</body> ,</html>',
    tasks: [
      {
        description: "BUILD YOUR PROFILE",
        solution: '<!DOCTYPE html>, <html>, <head> ,<title>My profile</title>, </head>, <body>, <h1>John Doe</h1>, <img src="https://via.placeholder.com/150" alt="My Photo">, <p>I am learning HTML and building my first profile page!</p>, <a href="https://www.example.com">Visit my favorite website</a> ,</body> ,</html>'
      }
    ]
  },

  // LEVEL 3: BUILD A MENU
  {
    title: "BUILD A MENU",
    language: "HTML",
    type: "lesson",
    level: "3",
    game: "code",
    map:[["S", "1", "0", "0", "0"],
    ["0", "1", "1", "1", "0"],
    ["0", "0", "0", "1", "1"],
    ["0", "0", "0", "0", "E"]],
    solution: "<!DOCTYPE html>, <html>, <head>, <title>My menu</title>, </head>, <body>, <h1>My menu</h1>, <ul>, <li>Pizza</li>, <li>Burger</li>, <li>Pasta</li>, </ul>, <button>Order Now</button>, </body>, </html>",
    tasks: [
      {
        description: "BUILD A MENU",
        solution: "<!DOCTYPE html>, <html>, <head>, <title>My menu</title>, </head>, <body>, <h1>My menu</h1>, <ul>, <li>Pizza</li>, <li>Burger</li>, <li>Pasta</li>, </ul>, <button>Order Now</button>, </body>, </html>"
      }
    ]
  },

  // LEVEL 4: YOUR FIRST FORM
  {
    title: "YOUR FIRST FORM",
    language: "HTML",
    type: "lesson",
    level: "4",
    game: "code",
    map:[["S", "1", "1", "1", "0", "0"],
    ["0", "0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1", "E"]],
    solution: '<! doctype html>, <html>, <head>, <title>Contact</title> ,</head>, <body>, <h1>Contact Me</h1>, <form>, <label>Name:</label>, <input type="text">, <label>Email:</label> ,<input type="email"> ,<button type="submit">Submit</button>, </form>, </body>, </html>',
    tasks: [
      {
        description: "YOUR FIRST FORM",
        solution: '<! doctype html>, <html>, <head>, <title>Contact</title> ,</head>, <body>, <h1>Contact Me</h1>, <form>, <label>Name:</label>, <input type="text">, <label>Email:</label> ,<input type="email"> ,<button type="submit">Submit</button>, </form>, </body>, </html>'
      }
    ]
  },

  // LEVEL 5: ORGANIZE YOUR PAGE
  {
    title: "ORGANIZE YOUR PAGE",
    language: "HTML",
    type: "lesson",
    level: "5",
    game: "code",
    map:[["S", "1", "0", "1", "1", "E"]],
    solution: "<! doctype html>, <html>, <head>, <title>My Page</title>, </head>, <body>, <h1>My Profile</h1>, <div>, <p>Welcome to my profile! I am learning to code.</p>, <hr>, <p>This is a <strong>very important</strong> note about my progress.</p>, <br>, <p>I am <em>highly motivated</em> to finish this quest!</p>, </div>, </body>, </html>",
    tasks: [
      {
        description: "ORGANIZE YOUR PAGE",
        solution: "<! doctype html>, <html>, <head>, <title>My Page</title>, </head>, <body>, <h1>My Profile</h1>, <div>, <p>Welcome to my profile! I am learning to code.</p>, <hr>, <p>This is a <strong>very important</strong> note about my progress.</p>, <br>, <p>I am <em>highly motivated</em> to finish this quest!</p>, </div>, </body>, </html>"
      }
    ]
  },

  // LEVEL 6: STRUCTURE THE PAGE
  {
    title: "STRUCTURE THE PAGE",
    language: "HTML",
    type: "lesson",
    level: "6",
    game: "code",
    map:[["S", "1", "1", "1", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "1", "1", "E"]],
    solution: "<! doctype html>, <html>, <head>, <title>My Page</title>, </head>, <body>, <header>, <h1>Welcome to My Website</h1>, </header>, <main>, <section>, <h2>About Me</h2>, <p>This is where I describe who I am and what I do.</p>, </section>, <section>, <h2>My Projects</h2>, <p>Check out the cool things I have built so far!</p>, </section>, </main>, <footer>, <p>&copy; 2026 My Web Quest</p>, </footer>, </body>, </html>",
    tasks: [
      {
        description: "STRUCTURE THE PAGE",
        solution: "<! doctype html>, <html>, <head>, <title>My Page</title>, </head>, <body>, <header>, <h1>Welcome to My Website</h1>, </header>, <main>, <section>, <h2>About Me</h2>, <p>This is where I describe who I am and what I do.</p>, </section>, <section>, <h2>My Projects</h2>, <p>Check out the cool things I have built so far!</p>, </section>, </main>, <footer>, <p>&copy; 2026 My Web Quest</p>, </footer>, </body>, </html>"
      }
    ]
  },

  // LEVEL 7: NAVIGATION
  {
    title: "NAVIGATION",
    language: "HTML",
    type: "lesson",
    level: "7",
    game: "code",
    map:[["S", "1", "0", "1", "E"],
    ["0", "1", "0", "1", "0"],
    ["0", "1", "1", "1", "0"]],
    solution: '<! doctype html>, <html>, <head>, <title>My Website</title>, </head>, <body>, <nav>, <ul>, <li><a href="index.html">Home</a></li>, <li><a href="about.html">About</a></li>, <li><a href="contact.html">Contact</a></li>, </ul>, </nav>, </body>, </html>',
    tasks: [
      {
        description: "NAVIGATION",
        solution: '<! doctype html>, <html>, <head>, <title>My Website</title>, </head>, <body>, <nav>, <ul>, <li><a href="index.html">Home</a></li>, <li><a href="about.html">About</a></li>, <li><a href="contact.html">Contact</a></li>, </ul>, </nav>, </body>, </html>'
      }
    ]
  },

  // LEVEL 8: MOVE INSIDE THE PAGE
  {
    title: "MOVE INSIDE THE PAGE",
    language: "HTML",
    type: "lesson",
    level: "8",
    game: "code",
    map:[["S", "1", "1", "0", "1", "1", "E"],
         ["0", "0", "1", "1", "1", "0", "0"]],
    solution: '<! doctype html>, <html>, <head>, <title>My Page</title>, </head>, <body>, <nav>, <a href="#about">Jump to About</a> | ,<a href="#contact">Jump to Contact</a>, </nav>, <section id="about">, <h2>About Section</h2>, <p>This is where the "About" information lives.</p>, </section>, <section id="contact">, <h2>Contact Section</h2>, <p>This is where the "Contact" information lives.</p>, </section>, </body>, </html>',
    tasks: [
      {
        description: "MOVE INSIDE THE PAGE",
        solution: '<! doctype html>, <html>, <head>, <title>My Page</title>, </head>, <body>, <nav>, <a href="#about">Jump to About</a> | ,<a href="#contact">Jump to Contact</a>, </nav>, <section id="about">, <h2>About Section</h2>, <p>This is where the "About" information lives.</p>, </section>, <section id="contact">, <h2>Contact Section</h2>, <p>This is where the "Contact" information lives.</p>, </section>, </body>, </html>'
      }
    ]
  },

  // LEVEL 9: ADD IMAGES
  {
    title: "ADD IMAGES",
    language: "HTML",
    type: "lesson",
    level: "9",
    game: "code",
    map:[["S", "1", "1", "D", "1", "E"]],
    solution: '<! doctype html>, <html>, <head>, <title>My Page</title>, </head>, <body>, <section>, <h2>About Me</h2>, <img src="profile.jpg" alt="A photo of me on my quest">, </section>, <section>, </section>, </body>, </html>',
    tasks: [
      {
        description: "ADD IMAGES",
        solution: '<! doctype html>, <html>, <head>, <title>My Page</title>, </head>, <body>, <section>, <h2>About Me</h2>, <img src="profile.jpg" alt="A photo of me on my quest">, </section>, <section>, </section>, </body>, </html>'
      }
    ]
  },

  // LEVEL 10: FINAL LEVEL
  {
    title: "FINAL LEVEL",
    language: "HTML",
    type: "lesson",
    level: "10",
    game: "code",
    map:[["1", "S", "0", "0", "0", "D", "0", "0", "1"],
         ["1", "1", "1", "0", "1", "1", "1", "0", "1"],
         ["1", "D", "0", "0", "0", "D", "1", "0", "1"],
         ["1", "1", "1", "1", "1", "1", "1", "0", "1"],
         ["E", "0", "0", "D", "0", "1", "1", "0", "1"],
         ["1", "1", "1", "1", "1", "1", "1", "1", "1"]],
    solution: "<! doctype html>, <html>, <head>, <title>My Awesome Website</title>, </head>, <body>, <header>, <h1>The Explorer's Journey</h1>, <nav>, <a href='#about'>About</a> | , <a href='#contact'>Contact</a> | , <a href='https://google.com'>Search</a>, </nav>, <hr>, </header>, <main>, <section id='about'>, <h2>About</h2>, <p>I am a brave coder exploring the world of HTML. This is my first complete site!</p>, <img src='hero.jpg' alt='A picture of a brave explorer'>, <hr>, </section>, <section id='contact'>, <h2>Contact</h2>, <form>, <input type='text' placeholder='Your Name'>, <input type='email' placeholder='Your Email'>, <button type='submit'>Send Message</button>, </form>, </section>, </main>, <footer>, <hr>, <p>Created with skill by a Master Coder &copy; 2026</p>, </footer>, </body>, </html>",
    tasks: [
      {
        description: "FINAL LEVEL",
        solution: "<! doctype html>, <html>, <head>, <title>My Awesome Website</title>, </head>, <body>, <header>, <h1>The Explorer's Journey</h1>, <nav>, <a href='#about'>About</a> | , <a href='#contact'>Contact</a> | , <a href='https://google.com'>Search</a>, </nav>, <hr>, </header>, <main>, <section id='about'>, <h2>About</h2>, <p>I am a brave coder exploring the world of HTML. This is my first complete site!</p>, <img src='hero.jpg' alt='A picture of a brave explorer'>, <hr>, </section>, <section id='contact'>, <h2>Contact</h2>, <form>, <input type='text' placeholder='Your Name'>, <input type='email' placeholder='Your Email'>, <button type='submit'>Send Message</button>, </form>, </section>, </main>, <footer>, <hr>, <p>Created with skill by a Master Coder &copy; 2026</p>, </footer>, </body>, </html>"
      }
    ]
  }
];
// ==================== Courses ====================
const courses = [
  {
    title: "Scratch Basics",
    language: "Scratch",
    description: "Start Scratch",
    lessonIds: []
  },
  {
    title: "Python Basics",
    language: "Python",
    description: "Start Python",
    lessonIds: []
  },
  {
    title: "HTML Basics",
    language: "HTML",
    description: "Start HTML",
    lessonIds: []
  }
];

// ==================== Import ====================
const importData = async () => {
  try {

    await User.deleteMany();
    await Lesson.deleteMany();
    await Course.deleteMany();
    const createdLessons = await Lesson.insertMany(lessons);

    courses.forEach(course => {
      course.lessonIds = createdLessons
        .filter(lesson => lesson.language === course.language)
        .map(lesson => lesson._id);
    });

    await Course.insertMany(courses);

    console.log("🔥 Data inserted successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
connectDB().then(importData);


