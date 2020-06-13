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
};