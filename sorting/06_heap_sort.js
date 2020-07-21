const { MinBinaryHeap } = require('../utils')

function heapSort(arr) {
  const minHeap = new MinBinaryHeap(),
    sorted = []
  // n items
  for (const item of arr) {
    minHeap.insert(item) // O(logn)
  }

  // n items
  while (minHeap.size > 0) {
    const min = minHeap.extractMin() // O(logn)
    sorted.push(min)
  }

  return sorted
}

/*
Time Complexity - O(nlogn) (inserting n items into heap) + O(nlogn) (extracting n items from heap)
T = O(nlogn)
Space complexity - O(n) auxillary space (for sorted array and heap)
*/

/* ---------------------------------------------------------------------------- */

// Tests
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
  const sorted = heapSort(test[0])
  console.log(sorted)
  console.log(JSON.stringify(sorted) === JSON.stringify(test[1]))
}
