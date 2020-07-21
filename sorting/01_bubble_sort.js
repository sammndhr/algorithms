const { swapArrItemsInPlace } = require('../utils')

function bubbleSort(arr) {
  const len = arr.length

  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j > i; j--) {
      if (arr[j - 1] > arr[j]) {
        swapArrItemsInPlace(arr, j, j - 1)
      }
    }
  }
}

/*
Time Complexity:
Best, worst and average case - О(n^2)

Space complexity - O(1)
*/

/* ---------------------------------------------------------------------------- */
const testCases = [
  [
    [5, 4, 3, 2, 1],
    [1, 2, 3, 4, 5]
  ],
  [
    [5, 6, 1, 0, 6, 2],
    [0, 1, 2, 5, 6, 6]
  ],
  [
    [-1, 6, 2, 100, 0, -11],
    [-11, -1, 0, 2, 6, 100]
  ]
]

for (const test of testCases) {
  const arr = JSON.parse(JSON.stringify(test[0])) //copy of array
  bubbleSort(arr)
  console.log(JSON.stringify(arr) === JSON.stringify(test[1]))
}
