/*
Iterative (Bottom up) merge sort

Instead of recursively dividing the array into two halves and merging when you've reached the bottom,
use two loops and an interval to keep track of which sections of the array you're merging.
You don't recurse to the bottom and then return back from the recursive calls.
You just start from the bottom which is why it's called "bottom up" merge sort. 
Intervals will be multiples of 2.

Compare with recursive merge sort --> https://blog.mrinalini.dev/posts/merge-sort/

Time Complexity: Best, worst and average case - О(nlogn)
Space complexity - O(n) (for the auxiliary array only, no stack space required)
*/

function merge_sort(arr) {
  function merge(start, mid, end) {
    const aux = []
    let i = start,
      j = mid + 1,
      k = 0

    while (i <= mid && j <= end) {
      const first = arr[i],
        second = arr[j]
      if (first < second) {
        aux[k++] = first
        i++
      } else {
        aux[k++] = second
        j++
      }
    }

    while (i <= mid) aux[k++] = arr[i++]
    while (j <= end) aux[k++] = arr[j++]

    const auxLen = aux.length

    for (let i = 0; i < auxLen; i++) {
      arr[start + i] = aux[i]
    }
  }

  let len = arr.length

  for (let interval = 1; interval < len; interval *= 2) {
    for (let start = 0; start < len - interval; start += interval * 2) {
      const mid = Math.min(start + interval - 1, len - 1),
        right = Math.min(start + 2 * interval - 1, len - 1)

      merge(start, mid, right)
    }
  }

  return arr
}

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
  merge_sort(arr)
  console.log(arr)
  console.log(JSON.stringify(arr) === JSON.stringify(test[1]))
}
