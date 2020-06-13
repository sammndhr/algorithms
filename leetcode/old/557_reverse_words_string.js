/**
 * @param {string} s
 * @return {string}
 */

var reverseString = function(str) {
  var reversed = "";
  for (let i = str.length-1; i>-1; i--) {
    reversed += str[i];
  }; 
  return reversed;
}

var reverseWords = function(s) {
  var result = "",
      currWord = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== " ") {
      currWord += s[i];
      if (i === s.length -1) {
        result += reverseString(currWord);
      }
    } else if (s[i] === " ") {
      result += reverseString(currWord) + " ";
      currWord = "";
    }
  };
  return result;
};

console.log(reverseWords("Some thing'S "));
console.log(reverseWords("Some thing'S "));
console.log(reverseWords(" Some thing'S "));
console.log(reverseWords(" Some thing'S"));