// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Example:

// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
//Time - O(n2), space - O(1)
// var twoSum = function(nums, target) {
//     for (let i = 0; i < nums.length; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//           if (nums[i] + nums[j] === target) return [i, j]
//         }
//     }
// };

//Time - O(n), space - O(n)
var twoSum = (nums, target) => {
  const objMap = {}
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    if (objMap.hasOwnProperty(complement)) {
      return [objMap[complement], i]
    }
    objMap[nums[i]] = i
  }
}
console.log(twoSum([1, 3, 4, 5, 6, 7], 4))
console.log(twoSum1([1, 3, 4, 5, 6, 7], 4))
