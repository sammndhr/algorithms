// https://www.interviewcake.com/question/javascript/highest-product-of-3?course=fc1&section=greedy

// Calculate the highest product of three numbers

/* 
1. Keep track of the 3 max and 2 min nums.
2. Init maxes to -Infinity and mins to Infinity
*/
function highestProductOf3(arrayOfInts) {
  let [max0, max1, max2] = [-Infinity, -Infinity, -Infinity]
  let [min0, min1] = [Infinity, Infinity]

  for (const curr of arrayOfInts) {
    if (curr < min0) {
      ;[min0, min1] = [curr, min0]
    } else if (curr < min1) {
      min1 = curr
    }

    if (curr > max0) {
      ;[max0, max1, max2] = [curr, max0, max1]
    } else if (curr > max1) {
      ;[max1, max2] = [curr, max1]
    } else if (curr > max2) {
      max2 = curr
    }
  }

  return Math.max(min0 * min1 * max0, max0 * max1 * max2)
}
/*
Time Complexity - O(n)
Space complexity - O(1)
*/

/* ---------------------------------------------------------------------------- */

const testCases = [
  [[6, 1, 3, 5, 7, 8, 2], 336],
  [[-5, 4, 8, 2, 3], 96],
  [[-10, 1, 3, 2, -10], 300]
]

for (const test of testCases) {
  console.log(highestProductOf3(test[0]) === test[1])
}
