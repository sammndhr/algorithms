/**
 * @param {number[]} nums
 * @return {string}
 */

// Time Complexity - O(nlogn)
// Space Complexity - O(1)

// Logic - [3, 31, 34, 300, 30]. Compare 'ab' and 'ba' and sort in descending order
var largestNumber = function(nums) {
  nums.sort((a, b) => {
    return `${b}${a}` - `${a}${b}`
  })
  return nums[0] === 0 ? '0' : nums.join('')
}

console.log(largestNumber([0, 0, 0]))
console.log(largestNumber([0]))
console.log(largestNumber([]))
console.log(largestNumber([10, 2]))
console.log(largestNumber([3, 31, 34, 300, 30]))
