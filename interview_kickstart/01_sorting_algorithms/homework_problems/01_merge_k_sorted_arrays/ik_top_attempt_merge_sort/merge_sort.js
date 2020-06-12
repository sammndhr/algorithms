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

const shouldCopy = (a, b, increasingOrder) => {
  if (increasingOrder) {
    return a <= b
  }
  return a >= b
}

const merge = (arr, start, mid, end, increasingOrder) => {
  let row1 = start
  let n = arr[0].length
  let i = 0
  let j = 0
  let row2 = mid + 1
  const result = []

  while (row1 <= mid && row2 <= end) {
    // copy smaller to result
    if (shouldCopy(arr[row1][i], arr[row2][j], increasingOrder)) {
      result.push(arr[row1][i])
      i++
      if (i === n) {
        row1++
        i = 0
      }
    } else {
      result.push(arr[row2][j])
      j++
      if (j === n) {
        row2++
        j = 0
      }
    }
  }
  // copy remaining
  while (row1 <= mid) {
    result.push(arr[row1][i])
    i++
    if (i === n) {
      row1++
      i = 0
    }
  }

  while (row2 <= end) {
    result.push(arr[row2][j])
    j++
    if (j === n) {
      row2++
      j = 0
    }
  }
  // update arr
  for (let i = 0; i < result.length; i++) {
    const row = start + Math.floor(i / n)
    const j = i % n
    arr[row][j] = result[i]
  }
}

const mergeSort = (arr, start, end, increasingOrder) => {
  if (start >= end) {
    return
  }
  const mid = start + Math.floor((end - start) / 2)
  mergeSort(arr, start, mid, increasingOrder)
  mergeSort(arr, mid + 1, end, increasingOrder)

  merge(arr, start, mid, end, increasingOrder)
  console.log(arr)
}

function mergeArrays(arr) {
  const increasingOrder = isIncreasingOrder(arr)
  mergeSort(arr, 0, arr.length - 1, increasingOrder)
  const result = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      result.push(arr[i][j])
    }
  }
  return result
}

console.log(
  mergeArrays([
    [-10, -8, -6, -4, -2],
    [-9, -7, -5, -4, -3],
    [-1, 1, 3, 5, 7],
    [0, 2, 4, 6, 8],
  ])
)
