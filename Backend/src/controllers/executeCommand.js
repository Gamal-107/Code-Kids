exports.verifyLevel = (req, res) => {
    const { levelId, commands } = req.body;
    const level = levels[levelId];

    let state = {
        pos: { x: level.start[0], y: level.start[1] },
        dir: level.direction || "RIGHT",
        grid: level.gridMap // مصفوفة تمثل الحوائط والممرات
    };

    // وظيفة تنفيذ الأوامر (تتعامل مع الأوامر العادية، التكرار، والشروط)
    const execute = (cmds) => {
        cmds.forEach(cmd => {
            if (cmd.type === 'move') {
                applyMovement(state, cmd.action);
            } 
            else if (cmd.type === 'if_statement') {
                // فحص الشرط بناءً على حالة الخريطة الحالية
                if (checkCondition(state, cmd.condition)) {
                    execute([cmd.then]); // تنفيذ الجزء الصحيح
                } else {
                    execute([cmd.else]); // تنفيذ الجزء الخطأ
                }
            }
            else if (cmd.type === 'repeat') {
                for (let i = 0; i < cmd.times; i++) {
                    execute(cmd.do); // تكرار الأوامر بداخل الـ Loop
                }
            }
        });
    };

    execute(commands);


    // التحقق النهائي
    const reached = (state.pos.x === level.target[0] && state.pos.y === level.target[1]);
    res.json({ success: reached, finalPos: state.pos });
};

// وظيفة فحص البيئة (الـ Sensors)
function checkCondition(state, condition) {
    if (condition === 'path_clear') {
        // تخيل خطوة للأمام وشوف هل هي حائط أم ممر
        const nextX = state.pos.x + (state.dir === 'RIGHT' ? 1 : state.dir === 'LEFT' ? -1 : 0);
        const nextY = state.pos.y + (state.dir === 'DOWN' ? 1 : state.dir === 'UP' ? -1 : 0);
        
        // التأكد أن الإحداثيات داخل حدود الخريطة وليست حائطاً (رقم 0 مثلاً)
        return state.grid[nextY] && state.grid[nextY][nextX] === 1; 
    }
    return false;
}
const execute = (cmds) => {
    cmds.forEach(cmd => {
        // ... الأوامر السابقة (move, if, repeat) ...

        // 1. تعيين قيمة لمتغير (set scour to 0)
        if (cmd.type === 'set_variable') {

            state.variables[cmd.name] = cmd.value;
        }

        // 2. تغيير قيمة متغير (change scour by 1)
        else if (cmd.type === 'change_variable') {
            if (state.variables[cmd.name] !== undefined) {
                state.variables[cmd.name] += cmd.value;
            }
        }

        // 3. التحقق من وجود جوهرة عند التحرك
        if (cmd.type === 'move') {
            applyMovement(state, cmd.action);
            
            // تلقائياً: إذا وقف على إحداثيات فيها جوهرة، نحدث الحالة
            if (isDiamond(state.pos, level.diamonds)) {
                // ملاحظة: عادة الفرونت إند هو من يرسل أمر "change scour" 
                // عندما يقرر الطفل ذلك في الكود، لكن الباك إند يجب أن يتأكد
            }
        }
    });
};
const reachedTarget = (state.pos.x === level.target[0] && state.pos.y === level.target[1]);
const collectedAllGems = (state.variables['scour'] === level.requiredGems);

if (reachedTarget && collectedAllGems) {
    res.json({ success: true, message: "رائع! جمعت كل الجواهر ووصلت للكنز" });

} else if (reachedTarget && !collectedAllGems) {
    res.json({ success: false, message: "وصلت للكنز لكنك لم تجمع كل الجواهر المطلوبة!" });
} else {
    res.json({ success: false, message: "حاول مرة أخرى" });
}
