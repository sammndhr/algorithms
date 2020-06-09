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

/*

Space Complexity - < O(k*n x log(n)). Because the actual array is being overwritten.
So at each level, it's kn - n * number of merged arrays
Explanation - knlogk_merge_sort_space_complexity.jpg

Time Complexity —  O( kn x log(k)), where n is length of each array and k is the total number of arrays
Explanation - knlogk_merge_sort_time_complexity.jpg

*/

// Fastest solution on ik.
function mergeArrays(arr) {
  let total = arr.length,
    interval = 1
  const sortOrder = isIncreasingOrder(arr)

  while (interval < total) {
    console.log(interval)
    for (let i = 0; i < total - interval; i += interval * 2) {
      arr[i] = merge(arr[i], arr[i + interval], sortOrder)
    }
    interval *= 2
  }

  return arr[0]
}
