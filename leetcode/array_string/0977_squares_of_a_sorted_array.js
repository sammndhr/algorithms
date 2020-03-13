/**
 * @param {number[]} A
 * @return {number[]}
 */

/**
 * @param {number[]} A
 * @return {number[]}
 */
//My solution
// Time - O(n)
//Space - O(n)
var sortedSquares = function(arr) {
  const len = arr.length,
    negSquares = [],
    squares = []
  let i = 0,
    j
  while (arr[i] < 0) {
    const square = arr[i] ** 2
    negSquares.push(square)
    i++
  }
  j = i - 1
  while (i < len && j >= 0) {
    const square = arr[i] ** 2
    if (square < negSquares[j]) {
      squares.push(square)
      i++
    } else {
      squares.push(negSquares[j])
      j--
    }
  }
  while (j >= 0) {
    squares.push(negSquares[j])
    j--
  }
  while (i < len) {
    squares.push(arr[i] ** 2)
    i++
  }
  return squares
}

//https://leetcode.com/problems/squares-of-a-sorted-array/discuss/222079/Python-O(N)-10-lines-using-deque-beats-100
//reversed the array instead of using unshift() because it's faster
var sortedSquares = function(arr) {
  const squared = []
  let l = 0,
    r = arr.length - 1
  while (l <= r) {
    const left = arr[l] ** 2,
      right = arr[r] ** 2
    if (left > right) {
      squared.push(left)
      l++
    } else {
      squared.push(right)
      r--
    }
  }
  squared.reverse()

  return squared
}

console.log(sortedSquares([-4, -1, 0, 3, 10]))
console.log(sortedSquares([-4, -3, -1, 0, 10]))
