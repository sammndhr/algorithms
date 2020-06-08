const { swapArrItemsInPlace } = require('../utils')

function buildMaxHeap(arr) {
  // start at rightmost node which is not a leaf
  let i = Math.floor(arr.length / 2 - 1)
  const lastIndex = arr.length - 1

  while (i >= 0) {
    heapify(arr, i, lastIndex)
    i--
  }
}

/* 
Time Complexity of building a max heap in place is O(n). This is because of the structure of a binary heap.

| no. of nodes | Binary tree Level | height - level | work done to sink down nodes | % of tree nodes |
| ------------ | ----------------- | -------------- | ---------------------------  | --------------- |
| 1            | 0                 | h              | 1 * h                        | ...             |
| 2            | 1                 | h - 1          | 2 * h-1                      | ...             |
...
| 2^h-2        | h-2               | 2              | 2^h-2 * 2                    | 12.5%           |
| 2^h-1        | h-1               | 1              | 2^h-1 * 1                    | 25%             |
| 2^h          | h                 | 0              | 2^h * 0                      | 50%             |
------------------------------------------------------------------------------------------------------
                                                    T(n) = sum of this column

T(n) = sum of this column
T(n) = 2^h * 0 + 2^h-1 * 1 + 2^h-2 * 2 + ... + 2 * h-1 + 1 * h
                                                             |
height of tree = log(n), so we can replace the last h with log(n)
T(n) = 2^h * 0 + 2^h-1 * 1 + 2^h-2 * 2 + ... + 2 * h-1 + 1 * log(n)
Subbing out the log(n) with ∞, we can say that T(n) of n items < T(n) of ∞ items
Solving this equation, we get
T(n) <= O(n)

If you look at the percentages of number of nodes per level, you'll notice that 87.5% of nodes are in the last three levels which don't need much work and 50% of nodes don't need any work at all to sink down. So O(n) isn't really that surprising.
*/

// Time Complexity of heapify - O(log n)
function heapify(heap, p, lastIndex) {
  while (p < lastIndex) {
    const r = 2 * p + 2,
      l = r - 1,
      right = heap[r],
      left = heap[l]

    let swapIndex = null,
      max = heap[p]

    if (l <= lastIndex && left > max) {
      swapIndex = l
      max = left
    }

    if (r <= lastIndex && right > max) {
      swapIndex = r
    }

    if (swapIndex === null) break
    swapArrItemsInPlace(heap, p, swapIndex)
    p = swapIndex
  }
}

function heapSort(arr) {
  // O(n)
  buildMaxHeap(arr)
  let lastHeapIndex = arr.length - 1

  // n items so T is O(n * logn)
  while (lastHeapIndex > 0) {
    swapArrItemsInPlace(arr, 0, lastHeapIndex)
    lastHeapIndex--
    heapify(arr, 0, lastHeapIndex) // O(logn)
  }
}

/*
Time Complexity = Time to build heap + Time to heapify n items 
T = O(n) + O(n * logn)
Since O(nlogn) > O(n), dropping O(n)
T = O(nlogn)

Space complexity - O(1) (Since heapify isn't recursive)
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
  const arr = JSON.parse(JSON.stringify(test[0])) //copy of array
  heapSort(arr)
  console.log(arr)
  console.log(JSON.stringify(arr) === JSON.stringify(test[1]))
}
