 // src/services/gameEngine.js

class GameEngine {
    constructor(map, startPos) {
        this.map = map; // مصفوفة تمثل الخريطة (0 طريق، 1 حائط، 2 ذهب)
        this.x = startPos.x;
        this.y = startPos.y;
        this.history = []; // لتسجيل كل خطوة وتفعيل الحركة في الـ Frontend
        this.score = 0;
    }

    // الأوامر الأساسية (المستوى 1)
    move_right() { this.x++; this.log('right'); }
    move_left()  { this.x--; this.log('left'); }
    move_up()    { this.y--; this.log('up'); }
    move_down()  { this.y++; this.log('down'); }

    // التحقق من المسار (المستوى 4 و 8)
    path_is_clear(direction) {
        // منطق لفحص المصفوفة (map) إذا كان المربع التالي حائط أم لا
        return true; // مثال بسيط
    }

    // جمع العناصر (المستوى 9)
    collect_item() {
        this.score += 1;
        this.history.push({ action: 'collect', score: this.score });
    }

    log(dir) {
        this.history.push({ action: 'move', direction: dir, x: this.x, y: this.y });
    }
}
// logic for Level 1
const checkLevel1 = (htmlCode) => {
    const hasTitle = /<title>.*<\/title>/.test(htmlCode);
    const hasH1 = /<h1>.*<\/h1>/.test(htmlCode);
    const hasP = /<p>.*<\/p>/.test(htmlCode);

    if (hasTitle && hasH1 && hasP) {
        return { 
            status: "win", 
            steps: [{x: 200, y: 0}, {x: 400, y: 0}, {x: 400, y: 200}], // إحداثيات الوصول للكنز
            unlock: ["Page Title", "Big Heading", "Paragraph"] 
        };
    }
};


// logic for Level 3 (Lists & Buttons)
const checkLevel3 = (htmlCode) => {
    const liCount = (htmlCode.match(/<li>/g) || []).length;
    const hasUl = htmlCode.includes('<ul>');
    const hasButton = htmlCode.includes('<button>');

    if (hasUl && liCount >= 3 && hasButton) {
        return {
            status: "win",
            path: "moveRight_then_moveDown", // دي بتبعتها للفرونت إند ينفذ الـ Animation
            finalPoint: "treasure_chest"

        };
    }
};
