var judgeCircle = function(moves) {
    if (typeof moves !== 'string') {
        return false;
    };
    if (moves.length % 2 !== 0) {
        return false;
    };
    
    var movesArr = moves.toUpperCase().split('');
    var countR = 0, countL = 0, countU = 0, countD = 0;
    
    for (let i = 0; i < movesArr.length; i++) {
        if (movesArr[i] === "U") {
            countU++;
        } else if (movesArr[i] === "D") {
            countD++;
        } else if (movesArr[i] === "R") {
            countR++;
        } else if (movesArr[i] === "L") {
            countL++;
        };
    };
    if (countU === countD && countL === countR) {
        return true;
    } else {
        return false;
    }
    
};

console.log(judgeCircle("UDU"));
console.log(judgeCircle("UDULRD"));//true
console.log(judgeCircle("UDUD"));//true
console.log(judgeCircle(1232));
console.log(judgeCircle('UPDDFDFKDJ'));
console.log(judgeCircle(''));