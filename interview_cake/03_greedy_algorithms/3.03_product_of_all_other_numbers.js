// https://www.interviewcake.com/question/javascript/product-of-other-numbers?course=fc1&section=greedy

/* 

| 4  |  5 |  1  |  8 |  2  | Input array

| 1  |  4 |  20 | 20 | 160 | Cumulative product of all elements to the left
  x     x    x     x    x
| 80 | 16 |  16 |  2 |  1  | Cumulative product of all elements to the right
----------------------------
| 80 | 64 | 320 | 40 | 160 | Result
*/
// Make a list of the products
function getProductsOfAllIntsExceptAtIndex(intArray) {
  const len = intArray.length
  if (len < 2) {
    throw new Error('Array must have more than one interger.')
  }

  const result = []
  let productSoFar = 1
  // Iterate and push into result the cumulative product of all elements to the left of current item
  for (const curr of intArray) {
    result.push(productSoFar)
    productSoFar *= curr
  }
  // Iterate in reverse, set the result at that index to the cumulative product so far
  // and get the cumulative product of all elements to the right
  productSoFar = 1
  for (let j = len - 1; j >= 0; j--) {
    result[j] *= productSoFar
    productSoFar *= intArray[j]
  }

  return result
}

/*
Time Complexity - O(n)
Space complexity - O(n)
*/

/* ---------------------------------------------------------------------------- */

const testCases = [
  [
    [8, 2, 4, 3, 1, 5],
    [120, 480, 240, 320, 960, 192]
  ],
  [
    [-7, -1, -4, -2],
    [-8, -56, -14, -28]
  ],
  [
    [4, 5, 1, 8, 2],
    [80, 64, 320, 40, 160]
  ]
]

for (const test of testCases) {
  const res = JSON.stringify(getProductsOfAllIntsExceptAtIndex(test[0]))
  console.log(res === JSON.stringify(test[1]))
}
