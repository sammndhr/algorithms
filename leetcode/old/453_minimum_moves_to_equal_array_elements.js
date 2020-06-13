/*
Given a non-empty integer array of size n, find the minimum number of moves required to make all array elements equal, where a move is incrementing n - 1 elements by 1.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */

//brute force "Time Limit Exceeded"
// var minMoves = function(nums) {
//   var n = nums.length -1, count = 0;
//   nums.sort((a,b) => {return a -b;});
//   var largest = nums[nums.length -1], check = true;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== nums[n]) {
//       check = false;
//       break;
//     }
//   }
//   while (!check) { 
//     check = true; 
//     for (let i = 0; i < n; i++) {
//       nums[i]++;
//       if (nums[i] !== largest) {
//         check = false;
//       }
//     }
//     nums.sort((a,b) => {return a -b;});
//     largest = nums[nums.length -1];
//     count++;
//   }
//   return count;
// };

var minMoves = function(nums) {
  var sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  nums.sort((a,b) => {return a-b;});\
  var minNum = nums[0];
  return (sum -  minNum * nums.length);
};
console.log(minMoves([3,1,2,3]));
console.log(minMoves([1,2,3]));
console.log(minMoves([1,1,1]));