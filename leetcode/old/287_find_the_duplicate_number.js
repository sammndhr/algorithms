/*
Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.

Note:
You must not modify the array (assume the array is read only).
You must use only constant, O(1) extra space.
Your runtime complexity should be less than O(n2).
There is only one duplicate number in the array, but it could be repeated more than once.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
// var findDuplicate = function(nums) {
//   let r = nums.length -1;
//   for (let i = 0; i < nums.length; i++) {
//     r = nums.length -1;
//     while (i < r) {
//       if(nums[i] === nums[r]) {
//         return nums[i];
//       } else {
//         r--;
//       }
//     }
//   }
// };

//Using fast and slow pointers.   
var findDuplicate = function(nums) {
  let fast = 0;
  let slow = 0;
  let find = 0;
      
  while (true) {
    fast = nums[nums[fast]];
    slow = nums[slow];
    if (fast === slow) {
       break;
    }
  }
  
  while (find !== slow) {
    find = nums[find];
    slow = nums[slow];
  }
  return find;
};

// console.log(findDuplicate([1,1,2]));
console.log(findDuplicate([1,3,2,6,2,4,5]));