/*
Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

You may assume that the array is non-empty and the majority element always exist in the array.

*/

/**
 * @param {number[]} nums
 * @return {number}
 */

// var majorityElement = function(nums) {
//   var n = nums.length/2;
//   var hash = {};
//   for (let i = 0; i < nums.length; i++) {
//     if (!hash[nums[i]]) {
//       hash[nums[i]] = 1;
//     } else {
//       hash[nums[i]]++;
//     }
//   }
//   for (i in hash) {
//     if (hash[i] >= n) {
//       return parseInt(i);
//     }
//   }
// };

//Boyer-Moore Majority Vote Algorithm found on leetcode discussion. O(n) time complex and O(1) space complex
// var majorityElement = function(nums) {
//   var maj = nums[0], count =1;
//   for (let i = 1; i < nums.length; i++) {
//     if (count === 0) {
//       count++;
//       maj = nums[i];
//     } else if (maj === nums[i]) {
//       count++;
//     } else {
//       count--;
//     }
//   }
//   return maj;
// };

//Second try after solving with Boyer-Moore method
var majorityElement = function(nums) {
  var n = nums.length/2;
  nums = nums.sort((a,b) => {return a-b;});
  var count = 1;
  var maj = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (count > n) {
      return maj;
    } 
    if (nums[i] === maj) {
      count++;
    } else {
      count = 1;
      maj = nums[i];
    }
  }
  return maj;
}

console.log(majorityElement([11,11,2,11,11,2,11,3]));
console.log(majorityElement([3,2,3]));
console.log(majorityElement([1]));