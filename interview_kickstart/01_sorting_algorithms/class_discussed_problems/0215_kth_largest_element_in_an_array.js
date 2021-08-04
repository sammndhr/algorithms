// https://leetcode.com/problems/kth-largest-element-in-an-array/

const { getRandomIntInclusive, swapArrItemsInPlace } = require('../../../utils')

/* 
Strategy: Quickselect
1. If you sort array, then kth largest value will be n-k from beginning.
 eg: [3, 2, 1, 5, 6, 4], k=2 [1,2,3,4,5,6], n-k=4
2. Use quick sort to partition the array discarding one side of the partition after every partition. If n-k < pivot index, recurse on the left.
Otherwise recurse on right.
3. After each partition, check if pivot index === n - k and if it is return the pivot value
*/

function findKthLargest(arr, k) {
  const len = arr.length,
    jthSmallest = len - k

  if (len <= 0 || jthSmallest < 0 || jthSmallest > len) return null

  return quickSelect(arr, 0, arr.length - 1, jthSmallest)
}

function quickSelect(arr, start, end, jthSmallest) {
  if (start === end && start === jthSmallest) {
    return arr[start]
  }

  if (start > end) return

  const pivot = partition(arr, start, end)

  if (pivot === jthSmallest) {
    return arr[pivot]
  } else if (jthSmallest < pivot) {
    return quickSelect(arr, start, pivot - 1, jthSmallest)
  } else {
    return quickSelect(arr, pivot + 1, end, jthSmallest)
  }
}

function partition(arr, start, end) {
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

  return smaller
}

/* 
Time Complexity - O(n)

For average case,consider that the pivot is always in middle. But since we're discarding one half

n + n/2 + n/4 + ..... n/n ==> O(2n)

Worst case: O(n^2)
*/
const arr = [3, 2, 1, 5, 6, 4]
console.log(findKthLargest(arr, 2))
