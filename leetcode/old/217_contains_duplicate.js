/*
Given an array of integers, find if the array contains any duplicates. Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.
*/
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  const numsHash = {};
  for (let i = 0; i < nums.length; i++) {
    if (!numsHash[nums[i]]) {
      numsHash[nums[i]] = 1;
    } else {
      return true;
    }
  }   
  return false;
};

