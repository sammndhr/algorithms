/* 
Exactly the same as merge sort but instead of merge sorting a 1d array, it's 2d. 

[[0,2,4], [1,5,7], [3,6,8]] --> [[0,1,2], [3,4,5], [6,7,8]]
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

function mergeSort(arr, increasingOrder) {
  const len = arr.length

  if (len <= 1) {
    return arr[0]
  }

  const mid = Math.floor(len / 2),
    left = mergeSort(arr.slice(0, mid), increasingOrder),
    right = mergeSort(arr.slice(mid), increasingOrder)

  return merge(left, right, increasingOrder)
}

function mergeArrays(arrays) {
  const increasingOrder = isIncreasingOrder(arrays)
  return mergeSort(arrays, increasingOrder)
}

// Tests
console.log(
  mergeArrays([
    [-10, -8, -6, -4, -2],
    [-9, -7, -5, -4, -3],
    [-1, 1, 3, 5, 7],
    [0, 2, 4, 6, 8]
  ])
)
