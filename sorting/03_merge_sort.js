function mergeSort(arr) {
  // Merge function to merge sorted left and right halves or arrray
  function merge(start, mid, end) {
    // Instantiate an empty auxillary array and set i = start, j = mid + 1
    const aux = []
    let i = start,
      j = mid + 1

    // Until we reach either the end of the right array or end of the left array,
    // keep comparing and pushing items into the aux array
    while (i <= mid && j <= end) {
      if (arr[i] < arr[j]) {
        aux.push(arr[i])
        i++
      } else {
        aux.push(arr[j])
        j++
      }
    }

    // Push leftover values from right array
    while (i <= mid) {
      aux.push(arr[i])
      i++
    }

    // Push leftover values from left array
    while (j <= end) {
      aux.push(arr[j])
      j++
    }
    // Set values of arr[start...end] = aux[0...n-1]
    // Space complexity O(n) comes from the aux array
    for (let i = 0; i < aux.length; i++) {
      arr[start + i] = aux[i]
    }
  }

  // Recursive function that divides the array and recurses on the left half and right half
  function recurse(start, end) {
    // Base case returns if array has only 1 item
    if (start >= end) return

    const mid = start + Math.floor((end - start) / 2)
    // Call recurse on left and right halves of array
    recurse(start, mid)
    recurse(mid + 1, end)

    // Merge the sorted left and right halves
    merge(start, mid, end)

    return
  }
  recurse(0, arr.length - 1)
}

/*
Time Complexity:
Best, worst and average case - О(nlogn)
Space complexity - O(n)
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
  mergeSort(arr)
  console.log(JSON.stringify(arr) === JSON.stringify(test[1]))
}
