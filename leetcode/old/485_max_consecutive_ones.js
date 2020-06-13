/*
Given a binary array, find the maximum number of consecutive 1s in this array.
Note:

The input array will only contain 0 and 1.
The length of input array is a positive integer and will not exceed 10,000

*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
  var maxSoFar = 0,
      currCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      currCount++;
    }  else if (nums[i] === 0) {
      currCount = 0;
    }
    if (currCount > maxSoFar) { 
      maxSoFar = currCount;
    }
  }  

  return maxSoFar;
};

console.log(findMaxConsecutiveOnes([1,1,0,0,1,1,1]));
console.log(findMaxConsecutiveOnes([0,1,1,1,1,0,0,1,1]));
