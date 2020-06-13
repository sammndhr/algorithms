/*Given an array of integers, 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

Find all the elements that appear twice in this array.

Could you do it without extra space and in O(n) runtime?
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// My solution
var findDuplicates = function(nums) {
  var hash = {};
  var result = [];

  for (let i = 0; i < nums.length; i++) {
    if (!hash[nums[i]]) {
      hash[nums[i]] = 1;
    } else {
      result.push(nums[i]);
    }
  }
  return result;
};
// with constant space and liner time
var findDuplicates = function(nums) {
  let result = [];
  let len = nums.length
  for (let i = 0; i < len; i++) {
    let idx = nums[i] % len;
    if(nums[idx] >len){ 
      result.push(idx || len);
    } else {
      nums[idx] += len;
    }
  }

  return result;
};
//using Math.abs()
var findDuplicates = function(nums) {
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    let idx = Math.abs(nums[i]) - 1;
    if (nums[idx] < 0) {
      result.push(Math.abs(nums[i]));
    }
    nums[idx] = -Math.abs(nums[idx]);
  }
  return result;
};


console.log(findDuplicates([4,1, 2, 3,3]));
console.log(findDuplicates([4,3,2,7,8,2,3,1]));
// console.log(findDuplicates([2,2]));