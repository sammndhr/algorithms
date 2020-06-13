/**
 * @param {number} area
 * @return {number[]}
 */


var constructRectangle = function(area) {
  var sqrt = Math.floor(Math.sqrt(area));
  for (let j = sqrt; j >= 1; j--) {
    if (area%j === 0) {
      return [area/j, j];
    } 
  }
};

console.log(constructRectangle(11));
console.log(constructRectangle(36));
console.log(constructRectangle(56));

