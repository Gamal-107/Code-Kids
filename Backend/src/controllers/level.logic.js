// Level 1, 3, 6 Logic
const executeSequence = (commands, engine) => {
    commands.forEach(cmd => {
        if (cmd === 'move_right()') engine.move_right();
        if (cmd === 'move_down()') engine.move_down();
        // ... وهكذا
    });
    return engine.getSteps();
};
// Level 2 Logic
const executeVariables = (vars, engine) => {
    engine.x = vars.x; // القيمة النهائية لـ x
    engine.y = vars.y; // القيمة النهائية لـ y
    engine.log('teleport'); 
    return engine.getSteps();
};
// Level 10 Logic (Example)
const executeSmartLoop = (engine) => {
    let limit = 0; // حماية من الحلقات اللا نهائية
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
const execute = (cmds) => {
    // 1. تسجيل الأحداث أولاً قبل بدء الحركة

    const eventRegistry = {};
    
    cmds.forEach(cmd => {
        if (cmd.type === 'event_listener') {
            // مثلاً: "عند الوصول للجواهر" نضع الأوامر بداخل السجل
            eventRegistry[cmd.event_name] = cmd.actions;
        }
    });

    // 2. تنفيذ الأوامر العادية (Main Loop)
    cmds.forEach(cmd => {
        if (cmd.type === 'move') {
            applyMovement(state, cmd.action);

            // 3. فحص وقوع الحدث (Triggering Events)
            // إذا وصل لمكان فيه جوهرة، شغل الأوامر المرتبطة بحدث "on_reach_diamond"
            if (isDiamond(state.pos, level.diamonds)) {
                if (eventRegistry['on_reach_diamond']) {
                    execute(eventRegistry['on_reach_diamond']); // تنفيذ الأوامر داخل الحدث
                }
            }
        }
        // ... باقي أنواع الأوامر (set, change, repeat)
    });
};
const finalLevelLogic = (code) => {
    const locks = {
        header: code.includes('<header>'),
        nav: code.includes('<nav>'),
        main: code.includes('<main>'),
        footer: code.includes('<footer>')
    };

    // لو الـ header صح، افتح أول بوابه وخليه يمشي خطوة
    // وهكذا لحد ما يوصل للـ Final Treasure
    let score = Object.values(locks).filter(Boolean).length;
    return {
        progress: (score / 4) * 100,
        canReachTreasure: score === 4
}};
const checkLevel8 = (htmlCode) => {
    // بيطلع كل الـ IDs اللي المستخدم كتبها في الـ sections
    const sectionIds = [...htmlCode.matchAll(/<section\s+id="([^"]+)"/g)].map(m => m[1]);
    
    // بيطلع كل الـ hrefs اللي بتبدأ بـ #

    const linkHrefs = [...htmlCode.matchAll(/<a\s+href="#([^"]+)"/g)].map(m => m[1]);

    // التأكد إن كل لينك له سكشن موجود فعلاً
    const isValid = linkHrefs.every(href => sectionIds.includes(href)) && linkHrefs.length > 0;

    if (isValid) {
        return { canMove: true, path: ['R', 'D', 'R', 'D'] };
    }
}
// مصفوفة تمثل الخريطة (0 = طريق، 1 = جدار، 2 = نيران/عقبة)
const gameMap = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1], // 0 تعني مسار فارغ (Path is clear)
    [1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
];

/**
 * دالة لفحص هل الطريق متاح أم لا
 * @param {number} x - الإحداثي الأفقي
 * @param {number} y - الإحداثي الرأسي
 * @returns {boolean} - true إذا كان الطريق متاحاً
 */
const isPathClear = (x, y) => {
    // 1. التأكد أن الإحداثيات داخل حدود المصفوفة
    if (y < 0 || y >= gameMap.length || x < 0 || x >= gameMap[0].length) {
        return false; 
    }

    // 2. الحصول على نوع الخانة (Tile)
    const tile = gameMap[y][x];

    // 3. التحقق (بناءً على Level 4 & 8): 
    // الطريق متاح فقط إذا كانت القيمة 0 (ليس جدار 1 ولا عقبة 2)
    return tile === 0;
};

module.exports = { isPathClear };

