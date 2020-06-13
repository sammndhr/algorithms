/*
Given an array with n integers, your task is to check if it could become non-decreasing by modifying at most 1 element.

We define an array is non-decreasing if array[i] <= array[i + 1] holds for every i (1 <= i < n).


*/
/**
 * @param {number[]} nums
 * @return {boolean}
 */
const checkPossibility = (nums) => {
  let modified = false;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[i+1]) {
      if (modified === false) {
        if (i+1 === nums.length -1) {
          nums[i+1] = nums[i];
          modified = true;
        }
        if (i-1 > -1  && i+2 < nums.length &&  nums[i-1] > nums[i+1]) {
          nums[i+1] = nums[i+2];
          modified = true;
        } else {          
          nums[i] = nums[i+1];
          modified = true;
        }
      } else {
        return false;
      }
    } 
  }
  return nums.toString() === nums.sort((a,b) => {return a -b}).toString()
};

console.log(checkPossibility([4,2,3]));
console.log(checkPossibility([3,2,4]));
console.log(checkPossibility([4,2,1]), false);
console.log(checkPossibility([3,4,2,3]),false);
console.log(checkPossibility([2,3,3,2,4]));
console.log(checkPossibility([2,3,1,4,5]));
console.log(checkPossibility([2,3,1,5,4]), false);
console.log(checkPossibility([1,2,4,5,3]));


