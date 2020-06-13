/*
Given an array of integers, every element appears twice except for one. Find that single one.

Note:
Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  var numCount = {};
  for (let i = 0; i< nums.length; i++) {
    if (!numCount[nums[i]]) {
      numCount[nums[i]] = 1;
    } else {
      delete numCount[nums[i]];
    }
  }
  return parseInt(Object.keys(numCount));
};

console.log(singleNumber([1,2,1,2,4]));