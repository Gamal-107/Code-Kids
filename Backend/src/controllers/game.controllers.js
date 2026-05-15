import{move} from "../services/xp.services.js";
const levels = require('../data/levels.json');
export const play =(req,res)=>{
    move (req.body.playerId,reqbody.direction);
    res.send("done");
};
exports.verifyLevel = (req, res) => {
    const { levelId, commands } = req.body;
    const level = levels[levelId];

    if (!level) {
        return res.status(404).json({ message: "المستوى غير موجود" });
    }

    // الحالة الابتدائية للشخصية
    let currentPos = { x: level.start[0], y: level.start[1] };
    let currentDir = level.direction || "RIGHT"; // الاتجاه الافتراضي
    
    // محاكاة الأوامر
    try {
        commands.forEach(cmd => {
            // التعامل مع الأوامر المباشرة (مثل Level 1)
            if (cmd === 'GO_RIGHT') currentPos.x += 1;
            else if (cmd === 'GO_LEFT') currentPos.x -= 1;
            else if (cmd === 'GO_UP') currentPos.y -= 1;
            else if (cmd === 'GO_DOWN') currentPos.y += 1;

            // التعامل مع أوامر الحركة الدورانية (مثل Level 3)
            else if (cmd === 'TURN_RIGHT') {
                currentDir = rotate(currentDir, 'RIGHT');
            } else if (cmd === 'TURN_LEFT') {
                currentDir = rotate(currentDir, 'LEFT');
            } else if (cmd === 'GO_FORWARD') {
                moveForward(currentPos, currentDir);
            }


            // هنا يمكنك إضافة منطق "التصادم مع الجدران" إذا كانت لديك خريطة (Collision Detection)
        });

        // التحقق من النتيجة النهائية
        const reachedTarget = (currentPos.x === level.target[0] && currentPos.y === level.target[1]);

        if (reachedTarget) {
            res.json({ success: true, message: "مبروك! وصلت للكنز", nextLevel: parseInt(levelId) + 1 });
        } else {
            res.json({ success: false, message: "للأسف، لم تصل للمكان الصحيح", finalPos: currentPos });
        }

    } catch (error) {
        res.status(500).json({ error: "حدث خطأ أثناء معالجة الحركة" });
    }
};

// وظائف مساعدة لمعالجة الاتجاهات
function rotate(current, turn) {
    const dirs = ["UP", "RIGHT", "DOWN", "LEFT"];
    let idx = dirs.indexOf(current);
    if (turn === 'RIGHT') idx = (idx + 1) % 4;
    else idx = (idx + 3) % 4;
    return dirs[idx];
}

function moveForward(pos, dir) {
    if (dir === "UP") pos.y -= 1;
    if (dir === "DOWN") pos.y += 1;
    if (dir === "LEFT") pos.x -= 1;
    if (dir === "RIGHT") pos.x += 1;

}
let state = {
    pos: { x: level.start[0], y: level.start[1] },
    dir: level.direction || "RIGHT",
    grid: level.gridMap,
    variables: {} // هنا سيتم تخزين المتغيرات مثل { scour: 0 }
};
exports.verifyLevel = (req, res) => {
    const { levelId, commands } = req.body;
    const level = levels[levelId];
    
    // ... (نفس منطق الـ execution السابق) ...
    execute(commands); 

    const reachedTarget = (state.pos.x === level.target[0] && state.pos.y === level.target[1]);
    
    if (reachedTarget) {
        // حساب عدد النجوم
        const stars = calculateStars(commands.length, state.variables['scour'], level);
        
        res.json({ 
            success: true, 
            stars: stars, // من 1 لـ 3
            message: `حصلت على ${stars} نجوم!`,
            nextLevel: parseInt(levelId) + 1 
        });
    } else {
        res.json({ success: false, stars: 0, message: "لم تصل للهدف بعد" });
    }
};

// دالة حساب النجوم
function calculateStars(commandsUsed, scoreCollected, level) {

    let stars = 0;

    // 1. شرط أساسي: هل جمع كل الجواهر المطلوبة؟ (لو فيه جواهر في الليفل)
    const collectedAll = level.requiredGems ? (scoreCollected >= level.requiredGems) : true;

    if (!collectedAll) {
        return 1; // نجمة واحدة لأنه وصل للهدف بس مجمعش الجواهر
    }

    // 2. تقييم كفاءة الكود (عدد البلوكات)
    if (commandsUsed <= level.maxCommandsFor3Stars) {
        stars = 3;
    } else if (commandsUsed <= level.maxCommandsFor2Stars) {
        stars = 2;
    } else {
        stars = 1;
    }

    return stars;
}

if (html.includes('<title>') && html.includes('<h1>') && html.includes('<p>')) {
    moveCharacter({ steps: 3, direction: 'forward' }); // يفتح الـ 3 أقفال
}


const regex = /<h1.*?>.*?<\/h1>.*?<img.*?>.*?<p.*?>.*?<\/p>.*?<a.*?>.*?<\/a>/s;
if (regex.test(html)) {
    moveCharacter({ path: 'L-shape', unlock: 'all' });

}

const liCount = (html.match(/<li>/g) || []).length;
if (html.includes('<ul>') && liCount >= 3 && html.includes('<button>')) {
    moveCharacter({ path: 'maze-path-3' });
}


if (html.includes('type="text"') && html.includes('type="email"') && html.includes('type="submit"')) {
    unlockPath('form-locks');
}

if (html.includes('id="') && html.includes('href="#')) {
    // كود تحريك الكاميرا للسيكشن المقصود
}


async function checkLevel10(userCode) {
    const requirements = [
        { tag: '<header>', status: false },

        { tag: '<nav>', status: false },
        { tag: '<main>', status: false },
        { tag: '<section id="about">', status: false },
        { tag: '<section id="contact">', status: false },
        { tag: '<footer>', status: false }
    ];

    requirements.forEach(req => {
        if (userCode.includes(req.tag)) req.status = true;
    });

    if (requirements.every(r => r.status)) {
        return { move: "victory_path", treasure: "unlocked" };
    }
}
