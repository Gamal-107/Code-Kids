import { map } from "src\seed.js"

const CELL_TYPES={
    WALL:1,
    PATH:0,
    STARTS:'S',
    END:'E',
    DIAMOND:'d'
};
function canMoveTo(row, col){
    if(row<0||col>=map.Length||col<0||col>=map[0].Length){
        return false;
    }

    const targetCell=map[row][col];

    if(targetCell!==CELL_TYPES.WALL){
        console.log("Right move");
        return true;
    }else{
        console.log("This Wall");
        return false;
    }
} 
let playerPos={row:2, col:0};

function executeCommand(direction) {
    let newRow = playerPos.row;
    let newCol = playerPos.col;

    // تحديد الإحداثيات الجديدة بناءً على الزر
    if (direction === "UP")    newRow--;
    if (direction === "DOWN")  newRow++;
    if (direction === "LEFT")  newCol--;
    if (direction === "RIGHT") newCol++;

    // التأكد من أن الحركة مسموحة (ليست جداراً وليست خارج الحدود)
    if (canMoveTo(newRow, newCol)) {
        playerPos.row = newRow;
        playerPos.col = newCol;
        
        // التحقق إذا وصل للكنز

        if (mazeMap[newRow][newCol] === 'E') {
            alert("مبروك! وصلت للكنز 💰");
        }
    } else {
        // في اللعبة: "Any mistake will make you go back one step"
        console.log("خطأ! ستعود خطوة للخلف.");
    }
}
document.getElementById("btnRight").addEventListener("click", () => {
    executeCommand("RIGHT");
});
document.getElementById("btnDown").addEventListener("click", () => {
    executeCommand("DOWN");
});
