function countSort(arr, min, max) {
  const len = arr.length,
    count = new Array(max - min + 1).fill(0)

  let i = min,
    j = 0

  for (i = 0; i < len; i++) {
    count[arr[i]] += 1
  }

  for (i = min; i <= max; i++) {
    while (count[i] > 0) {
      arr[j] = i
      j++
      count[i]--
    }
  }
}

/*
Time Complexity: O(n + k) where n is length of input array and k is the range between min and max
Space complexity - O(n + k)
*/

/* ---------------------------------------------------------------------------- */

const testCases = [
  [[5, 6, 1, 0, 6, 2], 0, 6, [0, 1, 2, 5, 6, 6]],
  [[-1, 6, 2, 100, 0, -11], -11, 100, [-11, -1, 0, 2, 6, 100]],
  [[7, 6, 5, 4, 3, 2, 1, 0], 0, 7, [0, 1, 2, 3, 4, 5, 6, 7]]
]

for (const test of testCases) {
  const arr = JSON.parse(JSON.stringify(test[0])) //copy of array
  countSort(arr, test[1], test[2])
  console.log(arr)
  console.log(JSON.stringify(arr) === JSON.stringify(test[3]))
}
