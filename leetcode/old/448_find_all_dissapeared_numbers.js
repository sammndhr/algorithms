/*
Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

Find all the elements of [1, n] inclusive that do not appear in this array.

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

//leetcode rejected because run time too long -->

// var findDisappearedNumbers = function(nums) {
//   var arr = [...Array(nums.length + 1).keys()].slice(1);
//   var result = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (nums.indexOf(arr[i]) === -1) {
//       result.push(arr[i]);
//     }
//   }

//   return result;
// };

// var findDisappearedNumbers = function(nums) {
//   var sorted = nums.slice(0).sort((a,b) => { return a - b}); 
//   var result = [];

//   for (let i = 0; i < nums.length; i++) {
//     //for multiple occurences of same number;
//     if (sorted[i] === sorted[i-1]) {
//       sorted = sorted.slice(0, i).concat(sorted.slice(i+1));
//     }
//     //for missing number
//     if (sorted[i] !== i+1) {
//       var oldArr = sorted.slice(0);
//       sorted = oldArr.slice(0, i).concat([i+1], oldArr.slice(i));
//       result.push(i+1);
//     }
//   }
//   return result;
// };

var findDisappearedNumbers = function(nums) {
  var hash = {};
  var result = [];

  for (let i = 0; i < nums.length; i++) {
    hash[nums[i]] = true;
  }

  for (let i = 0; i < nums.length; i++) {
    if (!hash[i+1]) {
      result.push(i+1);
    }
   } 

  return result;
};
// console.log(findDisappearedNumbers([1,1]));

var getSum = function(a, b) {
  var count = b;
  while (count !== 0) {
    a++;
    count--;
    console.log(a, count);
  }
  return a;
};

console.log(getSum(-12, -8));