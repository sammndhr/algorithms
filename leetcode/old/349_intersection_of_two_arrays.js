/*
Given two arrays, write a function to compute their intersection.

Example:
Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2].

Note:
Each element in the result must be unique.
The result can be in any order.
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  var hash = {};
  for (let i = 0; i < nums1.length; i++) {
    if (nums2.indexOf(nums1[i]) !== -1) {
      hash[nums1[i]] = nums1[i];
    }
  }
  return Object.keys(hash).map((val, i) => {
    return parseInt(val);
  });
};

// from leetcode with Set
// function intersection(nums1, nums2) {
//     const set = new Set(nums1);
//     return [...new Set(nums2.filter(n => set.has(n)))];
// }

console.log(intersection([1, 2, 2, 1], [2, 2]));
console.log(intersection([1], [1]));