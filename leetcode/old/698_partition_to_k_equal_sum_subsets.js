/*Given an array of integers nums and a positive integer k, find whether it's possible to divide this array into k non-empty subsets whose sums are all equal.
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function(nums, k) {
  const len = nums.length;
  let target, groups

  const sum = nums.reduce((acc, i) => {
    return acc+i;
  });

  target = sum/k;
  if (target !== parseInt(target)) {
    return false;
  } 

  groups = [...Array(k)];
  groups = groups.map((val) => {
    return 0;
  });

  nums = nums.sort((a, b) => {
    return a-b;
  });

  const helper = (nums, groups, target, currIdx) => {
    if (currIdx === 0) {
      for (let i = 0; i<groups.length-1; i++) {
        if (groups[i] !== target) {
          return false;
        }
      }
      return true;
    }
    for (let i = 0; i < groups.length; i++) {
      if (groups[i]+nums[currIdx] <=target) {
        groups[i] +=nums[currIdx];
        if (helper(nums, groups, target, currIdx-1)) {
          return true;
        }
        groups[i] -=nums[currIdx];
      }
    }
    return false;
  }
  
  return helper(nums, groups, target,len-1);
};

let arr = [4, 3, 2, 3, 5, 2, 1];
let arr1 = arr.map((a) => {return a+2});
let arr2 = [2,3,2,2,2,4,5];
let arr3 = [4, 3, 2, 3, 5, 2, 1];
let k = 4;
console.log(canPartitionKSubsets(arr1, k));
console.log(canPartitionKSubsets(arr2, k));
console.log(canPartitionKSubsets(arr3, k));