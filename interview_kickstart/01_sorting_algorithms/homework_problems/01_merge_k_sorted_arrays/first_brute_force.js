/* 
First intuition
- Iterate through arrays and merge one array with the current merged(result) array

Space Complexity - O(n*k)
Time Complexity —  O(nk^2), where n is length of each array and k is the total number of arrays

Array of k arrays of length n
[ [   n    ] [   n    ] [   n    ] .... [   n    ]]
      1          2          3      ...      k

| iteration | work done at iteration |
| --------- | ---------------------- |
| 1         | 0 + n                  |
| 2         | n + n                  |
| 3         | 2n + n                 |
| ...       | ...                    |
| k         | (k-1) + n              |

Total work done =  n + 2n + 3n + .... + kn
T(n) = n * (1 + 2 + ..... + k)

https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF
kth partial sum of the series from 1 to k is:
    k(k + 1)/2
Therefore, T(n) = nk^2
*/

function isIncreasingOrder(arrays) {
  let i = 0,
    k = arrays.length

  while (i < k) {
    const arr = arrays[i],
      len = arr.length

    for (let j = 1; j < len; j++) {
      const diff = arr[j] - arr[j - 1]
      if (diff > 0) return true
      else if (diff < 0) return false
      else continue
    }
    i++
  }

  return false
}

function merge(arr1, arr2, increasingOrder) {
  const len1 = arr1.length,
    len2 = arr2.length,
    merged = new Array(len1 + len2)

  let i = 0,
    j = 0,
    m = 0

  function mergeSortedIncreasing() {
    while (i < len1 && j < len2) {
      const el1 = arr1[i],
        el2 = arr2[j]

      if (el1 <= el2) {
        merged[m++] = el1
        i++
      } else {
        merged[m++] = el2
        j++
      }
    }
  }

  function mergeSortedDecreasing() {
    while (i < len1 && j < len2) {
      const el1 = arr1[i],
        el2 = arr2[j]

      if (el1 <= el2) {
        merged[m++] = el2
        j++
      } else {
        merged[m++] = el1
        i++
      }
    }
  }

  increasingOrder ? mergeSortedIncreasing() : mergeSortedDecreasing()

  while (i < len1) merged[m++] = arr1[i++]
  while (j < len2) merged[m++] = arr2[j++]

  return merged
}

function mergeArrays(arrays) {
  const k = arrays.length,
    increasingOrder = isIncreasingOrder(arrays)

  let merged = []

  for (let i = 0; i < k; i++) {
    merged = merge(arrays[i], merged, increasingOrder)
  }

  return merged
}

console.log(
  mergeArrays([
    [-10, -8, -6, -4, -2],
    [-9, -7, -5, -4, -3],
    [-1, 1, 3, 5, 7],
    [0, 2, 4, 6, 8],
  ])
)
