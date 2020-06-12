// https://leetcode.com/problems/sort-colors/
// https://en.wikipedia.org/wiki/Dutch_national_flag_problem

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

/* 
Time Complexity - O(n)
Space Complexity - O(1) (in place) 

Overview:
 - Solution uses "dual-pivot partitioning sub-routine of quick sort algorithm". 
 - Basically, THREE pointers: low, high and i
 - Increment i starting from 0 until it meets the high pointer
 - If arr[i] == 0, swap(low, i) and increment low
 - else if arr[i] == 2, swap(high, i) and decrement high
 - else increment i

Notes: 
arr[i++] --> get arr element at i THEN increment i
arr[++i] --> increment i first THEN get arr element at i
*/

// With pointers start at 0 and len - 1
var sortColors = function (nums) {
  const len = nums.length

  let low = 0,
    high = len - 1,
    i = 0

  while (i <= high) {
    const curr = nums[i]
    if (curr === 0) swap(nums, i++, low++)
    else if (curr === 2) swap(nums, i, high--)
    else i++
  }
}

// With pointers start at -1 and len
var sortColors = function (nums) {
  const len = nums.length

  let low = -1,
    high = len,
    i = 0

  while (i < high) {
    const curr = nums[i]
    if (curr === 0) swap(nums, i++, ++low)
    else if (curr === 2) swap(nums, i, --high)
    else i++
  }
}

function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// tests
sortColors([2, 0, 2, 1, 1, 0])
sortColors([2, 0, 2, 1, 1, 0, 1, 0, 2])
