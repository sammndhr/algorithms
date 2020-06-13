/*
Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

For example:

Given num = 38, the process is like: 3 + 8 = 11, 1 + 1 = 2. Since 2 has only one digit, return it.
*/

/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {

  var numString = num.toString(),
      sum = 0;
  while (numString.length > 1) {
    sum = 0;
    for (let i = 0; i < numString.length; i++) {
      sum += parseInt(numString[i]);
    }
    numString = sum.toString();
  }
  return numString;
};

console.log(addDigits(57));