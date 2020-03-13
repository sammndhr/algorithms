/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

//iterative O(n^2) time complexity
var subarraySum = function(nums, k) {
  const len = nums.length
  let count = 0
  for (let i = 0; i < len; i++) {
    let sum = nums[i]
    if (sum === k) {
      count++
    }
    for (let j = i + 1; j < len; j++) {
      sum += nums[j]
      if (sum === k) {
        count++
      }
    }
  }
  return count
}

//accumulative sum, hash (from Henry's explanation)
//Time complexity - O(n)
//Space complexity -O(n) (for the hash map)

var subarraySum = function(nums, k) {
  const len = nums.length,
    cumSumHash = { 0: 1 }
  let cumSum = 0,
    count = 0
  for (let i = 0; i < len; i++) {
    cumSum += nums[i]
    if (cumSumHash[cumSum - k]) {
      count += cumSumHash[cumSum - k]
    }
    cumSumHash[cumSum] = cumSumHash[cumSum] ? cumSumHash[cumSum] + 1 : 1
  }
  return count
}

console.log(subarraySum([-1, -1, 1], 0) === 1)
console.log(subarraySum([1], 0) === 0)
console.log(subarraySum([1, 1, 1], 2) === 2)
console.log(subarraySum([2, -1, 2, -2, 3], 3) === 3)
