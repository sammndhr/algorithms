// Sam's code
/* 
  Using Binary Heap.

  Time Complexity - O(nklog(k))
  - Heap size will be k. So Heapifying is O(log(k))
  - We're going to be heapifying n * k elements. Therefore, T(n) = O(nklog(k))

  Space Complexity - O(nk) + O(k) from the heap. 
*/

function mergeArrays(arrays) {
  const n = arrays[0].length,
    merged = [],
    increasingOrder = isIncreasingOrder(arrays)
  //Create min or max heap based on order
  const heap = increasingOrder ? new MinBinaryHeap() : new MaxBinaryHeap()

  /*
  - Insert first element of all arrays into heap.
  - Each heap item will be an instance of HeapNode which will keep track of 
    the arrIndex, elementIndex and value.
  */
  arrays.forEach((arr, i) => {
    heap.insert(new HeapNode(i, 0, arr[0]))
  })

  if (increasingOrder) {
    /*
    - Keep extracting the top and pushing it into the merged array.
    - If the min value if Infinity, we've reached the end of all arrays
    */
    while (heap.min.value !== Infinity) {
      getAndInsertNextVal(arrays, heap, merged, Infinity, n)
    }
  } else {
    while (heap.max.value !== -Infinity) {
      getAndInsertNextVal(arrays, heap, merged, -Infinity, n)
    }
  }

  return merged
}

// Helper functions
/* 
  - Function to extract the top(min or max val), push top val into merged and insert next array value into heap
  - We'll use the arrIndex, elementIndex from the extracted top to get the next item to insert
  - If we're at the end of the array insert Infinity(min heap or increasing order) or -Infinity
*/
function getAndInsertNextVal(arrays, heap, merged, infinity, n) {
  let top = heap.extractTop()

  merged.push(top.value)

  const arrIndex = top.arrIndex,
    elementIndex = top.elementIndex + 1,
    value = elementIndex >= n ? infinity : arrays[arrIndex][elementIndex]

  heap.insert(new HeapNode(arrIndex, elementIndex, value))
}

/* 
 - Function to get the sort order of the arrays
 - Can't just check the first two values of the first array cause they might be repeated values
 - So keep checking until two values are different and return true or false
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

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// HeapNode will keep track of the array index, the element index and the value
class HeapNode {
  constructor(arrIndex, elementIndex, value) {
    this.arrIndex = arrIndex
    this.elementIndex = elementIndex
    this.value = value
  }
}

// Binary Heaps are modified. Find Binary Heap implementation with notes and tests here --> https://blog.mrinalini.dev/posts/binary-heap/
// Min Binary Heap for increasing sort order
class MinBinaryHeap {
  constructor() {
    this.minArr = []
  }
  // "Private" helper functions
  _bubbleUp(i) {
    const element = this.minArr[i].value

    while (i > 0) {
      const p = Math.floor((i - 1) / 2),
        parent = this.minArr[p].value

      if (element < parent) {
        swap(this.minArr, p, i)
        i = p
      } else {
        break
      }
    }
  }

  _sinkDown(p) {
    const element = this.minArr[p].value,
      lastIndex = this.minArr.length - 1

    while (p < lastIndex) {
      const r = 2 * p + 2,
        l = r - 1,
        left = this.minArr[l] && this.minArr[l].value,
        right = this.minArr[r] && this.minArr[r].value

      let swapIndex = null,
        min = element

      if (l <= lastIndex && left < min) {
        swapIndex = l
        min = left
      }

      if (r <= lastIndex && right < min) {
        swapIndex = r
      }

      if (swapIndex == null) break

      swap(this.minArr, p, swapIndex)

      p = swapIndex
    }
  }

  // Getters
  get size() {
    return this.minArr.length
  }

  get min() {
    return this.size ? this.minArr[0] : null
  }

  // Class methods
  insert(element) {
    this.minArr[this.size] = element
    this._bubbleUp(this.minArr.length - 1)
  }

  extractTop() {
    if (this.minArr.length <= 0) return null

    const lastIndex = this.minArr.length - 1,
      firstIndex = 0

    if (firstIndex !== lastIndex) swap(this.minArr, firstIndex, lastIndex)

    const min = this.minArr.pop()

    if (this.minArr.length > 0) {
      this._sinkDown(0)
    }

    return min
  }
}

// Max Binary Heap for decreasing sort order
class MaxBinaryHeap {
  constructor() {
    this.maxArr = []
  }

  // "Private" helper functions
  _bubbleUp(i) {
    const element = this.maxArr[i].value

    while (i > 0) {
      const p = Math.floor((i - 1) / 2),
        parent = this.maxArr[p].value

      if (element > parent) {
        swap(this.maxArr, p, i)
        i = p
      } else {
        break
      }
    }
  }

  _sinkDown(p) {
    const element = this.maxArr[p].value,
      lastIndex = this.maxArr.length - 1

    while (p < lastIndex) {
      const r = 2 * p + 2,
        l = r - 1,
        left = this.maxArr[l] && this.maxArr[l].value,
        right = this.maxArr[r] && this.maxArr[r].value

      let swapIndex = null,
        max = element

      if (l <= lastIndex && left > max) {
        swapIndex = l
        max = left
      }

      if (r <= lastIndex && right > max) {
        swapIndex = r
      }

      if (swapIndex == null) break

      swap(this.maxArr, p, swapIndex)

      p = swapIndex
    }
  }

  // Getters
  get size() {
    return this.maxArr.length
  }

  get max() {
    return this.size ? this.maxArr[0] : null
  }

  // Class methods
  insert(element) {
    this.maxArr[this.size] = element
    this._bubbleUp(this.maxArr.length - 1)
  }

  extractTop() {
    if (this.maxArr.length <= 0) return null

    const lastIndex = this.maxArr.length - 1,
      firstIndex = 0

    if (firstIndex !== lastIndex) swap(this.maxArr, firstIndex, lastIndex)

    const max = this.maxArr.pop()

    if (this.maxArr.length > 0) {
      this._sinkDown(0)
    }

    return max
  }
}

let arr1 = [
  [5, 6, 8, 16],
  [3, 7, 12, 13],
  [1, 10, 11, 15],
  [2, 4, 9, 14],
]
let arr2 = [
  [200, 50, 18, 1],
  [180, 45, 15, 9],
  [30, 17, 8, 5],
  [190, 40, 12, 7],
]
console.log(mergeArrays(arr1))
console.log(mergeArrays(arr2))
