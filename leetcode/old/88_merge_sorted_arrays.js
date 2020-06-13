/*
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.
*/
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  let count = 0;
  let i = m;
  let j = n;

  while (i < nums1.length) {
    nums1[i] === 0 ? nums1.splice(i, 1) : i++;
  }

  while (j < nums2.length) {
    nums2[j] === 0 ? nums2.splice(j, 1) : j++;
  }
  
  for (let i = 0; i < n; i++) {
    while (nums2[i] > nums1[count]) {
      count++;
    }
    nums1.splice(count, 0, nums2[i]);
  }
  return nums1;
};


var nums1 = [1, 7, 8];
console.log(merge(nums1, 3, [3,4,5], 3).toString() === [ 1, 3, 4, 5, 7, 8 ].toString());
// console.log(nums1);
console.log(merge([1], 1, [], 0).toString() === [1].toString());
nums1 = [0];
console.log(merge(nums1, 0, [1], 1).toString() === [1].toString());
// console.log(nums1);
console.log(merge([1,0], 1, [2], 1).toString() === [1,2].toString());
console.log(merge([2,0], 1, [1], 1).toString() === [1,2].toString());
console.log(merge([1,2,3,0,0,0], 3, [4,5,6], 3));
console.log(merge([1,2,3,0,0,0], 3, [4,5,6], 3).toString() === [1,2,3,4,5,6].toString());
console.log(merge([1,2,3,0,0,0], 3, [2,5,6], 3).toString() === [1,2,2,3,5,6].toString());
console.log(merge([4,5,6,0,0,0], 3, [1,2,3], 3).toString() === [1,2,3,4,5,6].toString());
console.log(merge([-1,0,0,3,3,3,0,0,0], 6, [1,2,2], 3).toString() === [-1,0,0,1,2,2,3,3,3].toString());
console.log(merge([-1,-1,0,0,0,0], 4, [-1,0], 2));
console.log(merge([-1,-1,0,0,0,0], 4, [-1,0], 2).toString() === [-1,-1,-1,0,0,0].toString());
