/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {
  var row1 = 'qwertyuiop'.toUpperCase().split(''),
      row2 = 'asdfghjkl'.toUpperCase().split(''),
      row3 = 'zxcvbnm'.toUpperCase().split(''),
      keyboard = [row1, row2, row3],
      results = [];
  for (let i = 0; i < words.length; i++) {
    var currWordArr = words[i].toUpperCase().split(''),
        firstCharRow,
        currRow;
    for (let j = 0; j < currWordArr.length; j++) {
      if (!firstCharRow || j === 0) {
        firstCharRow = 0;
        if (row1.includes(currWordArr[j])) {
          firstCharRow = row1;
        } else if (row2.includes(currWordArr[j])) {
          firstCharRow = row2;
        } else if (row3.includes(currWordArr[j])) {
          firstCharRow = row3;
        } 
      } else {
        if (!firstCharRow.includes(currWordArr[j])) {
          break;
        } 
      }
      if (j === currWordArr.length-1) {
        results.push(words[i]);
      };
    };
  };
  return results;
};

// console.log(findWords(["andd", "sdfg", "alaksks"]));
console.log(findWords(["a", "b"]));


