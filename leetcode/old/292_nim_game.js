/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function(n) {
  return  ( n % 4 !== 0);
};
console.log(canWinNim(4));