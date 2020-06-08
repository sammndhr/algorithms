const { getRandomIntInclusive, swapArrItemsInPlace } = require('../utils')

// With Lomuto partition
function quickSort(arr) {
  function recurse(start, end) {
    if (start >= end) return

    const randomIndex = getRandomIntInclusive(start, end)

    swapArrItemsInPlace(arr, randomIndex, start)

    const pivot = arr[start]
    let smaller = start,
      bigger = start + 1

    for (bigger; bigger <= end; bigger++) {
      if (arr[bigger] < pivot) {
        smaller++
        swapArrItemsInPlace(arr, smaller, bigger)
      }
    }

    swapArrItemsInPlace(arr, start, smaller)

    recurse(start, smaller - 1)
    recurse(smaller + 1, end)
  }
  recurse(0, arr.length - 1)
}

/*
Time Complexity:
Best, Average - Θ(nlogn)
worst - Θ(n^2)
average case 
Space complexity - O(logn) auxillary space (for recursion call stack)
*/

/* ---------------------------------------------------------------------------- */

const testCases = [
  [
    [5, 6, 1, 0, 6, 2],
    [0, 1, 2, 5, 6, 6]
  ],
  [
    [-1, 6, 2, 100, 0, -11],
    [-11, -1, 0, 2, 6, 100]
  ],
  [
    [7, 6, 5, 4, 3, 2, 1, 0],
    [0, 1, 2, 3, 4, 5, 6, 7]
  ]
]

for (const test of testCases) {
  const arr = JSON.parse(JSON.stringify(test[0])) //copy of array
  quickSort(arr)
  console.log(arr)
  console.log(JSON.stringify(arr) === JSON.stringify(test[1]))
}
