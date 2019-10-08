/* Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Follow up:

If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle. */

/**
 * @param {number[]} nums
 * @return {number}
 */
//first try
var maxSubArray = function(nums) {
  const len = nums.length
  let curr = nums[0],
    highestSoFar = curr,
    next
  for (let i = 1; i < len; i++) {
    const element = nums[i]
    next = curr + nums[i]
    if (next > highestSoFar) {
      highestSoFar = next
    }
    if (next > curr && element > next) {
      next = element
    }
    if (element > highestSoFar) {
      highestSoFar = element
    }
    curr = next
  }
  return highestSoFar
}

//Refactored. If element by itself is greater than the sum, dump the sum and use that element to "reset" the sum. And keep track of maxSum.
//Time - O(n), space - O(1)
var maxSubArray = function(nums) {
  const len = nums.length
  let sum = nums[0],
    maxSum = sum
  for (let i = 1; i < len; i++) {
    const element = nums[i]
    sum = Math.max(element, sum + nums[i])
    maxSum = Math.max(maxSum, sum)
  }
  return maxSum
}

//using recursion. Don't u/stand well
function crossSubarray(array, left, middle, right) {
  var leftSum = -Infinity
  var rightSum = -Infinity
  var sum = 0

  for (var i = middle; i >= left; i--) {
    leftSum = Math.max(sum + array[i], leftSum)
    sum += array[i]
  }
  sum = 0

  for (var i = middle + 1; i < right; i++) {
    rightSum = Math.max(sum + array[i], rightSum)
    sum += array[i]
  }
  return leftSum + rightSum
}

function maxSubarrayPartitioner(array, left, right) {
  if (right - left <= 1) {
    return array[left]
  }
  var middle = Math.floor((left + right) / 2)
  var leftSum = maxSubarrayPartitioner(array, left, middle)
  var rightSum = maxSubarrayPartitioner(array, middle, right)
  var crossSum = crossSubarray(array, left, middle, right)
  return Math.max(crossSum, leftSum, rightSum)
}

function maxSubarraydivideAndConquer(array) {
  return maxSubarrayPartitioner(array, 0, array.length)
}

console.log(maxSubarraydivideAndConquer([-2, 1, -3, 4, -1, 2, 1, -5, 4])) //6
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])) //6
console.log(maxSubArray([-2, -1])) //-1
console.log(maxSubArray([8, -19, 5, -4, 20])) //21
console.log(maxSubArray([3, 2, -3, -1, 1, -3, 1, -1])) //5
