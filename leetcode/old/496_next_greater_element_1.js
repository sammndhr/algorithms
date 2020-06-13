/**
 * @param {number[]} findNums
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElement = function(findNums, nums) {
  var result = [];
  for (let i = 0; i < findNums.length; i++) {
    for (let j = nums.indexOf(findNums[i]); j < nums.length; j++) {
      console.log(j);
      if (nums[j] > findNums[i]) {
        result.push(nums[j]);
        break;
      } else if (j === nums.length - 1) {
        result.push(-1);
      }
    }
    
  }
  return result;
};

console.log(nextGreaterElement([4,1,2],
[1,3,4,2]));