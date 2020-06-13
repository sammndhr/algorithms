/**
 * @param {number[][]} nums
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */

var create2DArray = function(r, c) {
  var result = Array(r); //creates empty array of length r but NOT iterable ==> [r empty items]
  for (let i = 0; i < result.length; i++) {
    result[i] = [...Array(c)]; //creates empty array of length r and iterable ==> [undefined, undefined, ...c]
  }
  return result;
}


var matrixReshape = function(nums, r, c) {
  var flattened = [],
      result = create2DArray(r, c),
      count = 0;

  for (let i = 0; i <nums.length; i++) {
    var length = nums.length * nums[i].length;
    if ((c * r) > length) {
      return nums;
    } else {
      for (let j = 0; j <nums[i].length; j++) {
        flattened.push(nums[i][j])
      }
    }
  }

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      result[i][j] = flattened[count];
      count++;
    }     
  }
  return result;
};

var nums = 
[[1,2, 3, 5],
 [3,4,6 ,6]];
var r = 2, c = 4;

console.log(matrixReshape(nums, r, c));