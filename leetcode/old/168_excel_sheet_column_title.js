/*
Given a positive integer, return its corresponding column title as appear in an Excel sheet.
*/

var capitals = [...Array(26)].map((val, i) => {
  return String.fromCharCode(i + 65);
});
/*
Making letter array practice
const doubleLetters = (() => {
  var res = [];
  for (let i = 0; i < capitals.length; i++) {
    for (let j = 0; j < capitals.length; j++) {
      var x = capitals[i] + capitals[j]
      res.push(x);
    }
  }
  return res;
})();

const tripleLetters = (() => {
  var res = [];
  for (let i = 0; i < capitals.length; i++) {
    for (let j = 0; j < doubleLetters.length; j++) {
      var x = capitals[i] + doubleLetters[j];
      res.push(x);
    }
  }
  return res;
})();*/

function convertToTitle(n) {
  if (n <= 26) {
    return capitals[n-1];
  } else {
    var x = Math.ceil(n/26) - 1;
    var y = n%26;
    if (y === 0) {
      y = 26;
    }
    return convertToTitle(x) + convertToTitle(y);
  }
}


console.log(convertToTitle(24568));
console.log(convertToTitle(703));
console.log(convertToTitle(702));
console.log(convertToTitle(701));
console.log(convertToTitle(1));
console.log(convertToTitle(26));
console.log(convertToTitle(52));
console.log(convertToTitle(53));
console.log(convertToTitle(54));
console.log(convertToTitle(338), 338);
