/*
Given a column title as appear in an Excel sheet, return its corresponding column number.
*/

/**
 * @param {string} s
 * @return {number}
 */

var capitals = [...Array(26)].map((val, i) => {
  return String.fromCharCode(i + 65);
});

//for verifying purposes
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

//Solution after looking at someone else's
var titleToNumberLeetCode = function(s) {
  var res = 0;
  for (let i = 0; i < s.length; i++) {
    res = (res*26) + (capitals.indexOf(s[i]) + 1);
  }
  return res;
};

//my solution
//CDA ==> 3*26*26 + 4*26 + 1
var titleToNumber = function(s) {
  var res = 0;
  var n = s.length - 1;
  
  for (let i = 0; i < s.length; i++) {
    res += (capitals.indexOf(s[i]) + 1) * Math.pow(26, n)
    n--;
  }
  return res;
};
console.log(titleToNumber("DJF") === titleToNumberLeetCode("DJF"), "DJF");
console.log(titleToNumber("A") === titleToNumberLeetCode("A"), "A");
console.log(titleToNumber("SDFDFDS") === titleToNumberLeetCode("SDFDFDS"), "SDFDFDS");
console.log(titleToNumber("XLKJLK") === titleToNumberLeetCode("XLKJLK"), "XLKJLK");
console.log(convertToTitle(2970), 2970); 

console.log(titleToNumber("A"), "A"); 
console.log(convertToTitle(2970), 2970); 

console.log(titleToNumber("ZZ"), "ZZ"); 
console.log(convertToTitle(702), 702); 

console.log(titleToNumber("SDFDFDS"), "SDFDFDS"); 
console.log(convertToTitle(5919741587), 5919741587); 
