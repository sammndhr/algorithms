/* 
  Using Binary Heap (Optimized)

  Time Complexity - O(nklog(k))
  - Heap size will be k. So Heapifying is O(log(k))
  - We're going to be heapifying n * k elements. Therefore, T(n) = O(nklog(k))

  Space Complexity - O(nk) + O(k) from the heap. 
*/

function mergeArrays(arrays) {
  const n = arrays[0].length,
    merged = [],
    increasingOrder = isIncreasingOrder(arrays)
  // [0]
  const heap = increasingOrder ? new MinBinaryHeap() : new MaxBinaryHeap()

  // [1]
  arrays.forEach((arr, i) => {
    heap.insert(new HeapNode(i, 0, arr[0]))
  })

  heap.heapify()

  if (increasingOrder) {
    // [2]
    while (heap.top.value !== Infinity) {
      getAndInsertNextVal(arrays, heap, merged, Infinity, n)
    }
  } else {
    while (heap.top.value !== -Infinity) {
      getAndInsertNextVal(arrays, heap, merged, -Infinity, n)
    }
  }

  return merged
}

/* 
Notes: 
[0] Create min or max heap based on order
[1] - Insert first element of all arrays into heap.
    - Each heap item will be an instance of HeapNode which will keep track of 
      the arrIndex, elementIndex & value.
[2] - Keep getting heap top(min) & pushing it into the merged array.
    - If the min value is Infinity, we've reached the end of all arrays
*/

/* 
 Helper functions
  - Function to get the top(min or max val), push top val into merged
    & insert next array value into heap
  - instead of extracting & inserting, we're going to swap the new value with the top value.
    So we don't have to re-heapify twice for extraction & insertion
  - We'll use the arrIndex, elementIndex from the heap top to get the next item to insert
  - If we're at the end of the array insert Infinity(min heap or increasing order) or -Infinity
*/
function getAndInsertNextVal(arrays, heap, merged, infinity, n) {
  let top = heap.top
  merged.push(top.value)

  const arrIndex = top.arrIndex,
    elementIndex = top.elementIndex + 1,
    value = elementIndex >= n ? infinity : arrays[arrIndex][elementIndex]

  heap.swapTop(new HeapNode(arrIndex, elementIndex, value))
  heap.sinkDown(0)
}

/* 
 - Function to get the sort order of the arrays
 - Can't just check the first two values of the first array cause they might be repeated values
 - So keep checking until two values are different & return true or false
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

// HeapNode will keep track of the array index, the element index & the value
class HeapNode {
  constructor(arrIndex, elementIndex, value) {
    this.arrIndex = arrIndex
    this.elementIndex = elementIndex
    this.value = value
  }
}

// Modified Binary Heaps
// Unmodified Binary Heap implementation here --> https://blog.mrinalini.dev/posts/binary-heap/
class BinaryHeap {
  constructor() {
    this.heapArr = []
  }
  // Getters
  get size() {
    return this.heapArr.length
  }

  get top() {
    return this.heapArr[0]
  }
  // Class methods
  insert(node) {
    this.heapArr[this.size] = node
  }

  swapTop(newNode) {
    this.heapArr[0] = newNode
  }

  heapify() {
    const lastIndex = this.size - 1
    for (let i = lastIndex; i >= 0; i--) {
      this.sinkDown(i)
    }
  }
  // sinkDown will be different for max & min heap
  sinkDown(p) {}
}

// Min Binary Heap for increasing sort order
class MinBinaryHeap extends BinaryHeap {
  constructor() {
    super()
  }

  sinkDown(p) {
    const element = this.heapArr[p].value,
      lastIndex = this.heapArr.length - 1

    while (p < lastIndex) {
      const r = 2 * p + 2,
        l = r - 1,
        left = this.heapArr[l] && this.heapArr[l].value,
        right = this.heapArr[r] && this.heapArr[r].value

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

      swap(this.heapArr, p, swapIndex)

      p = swapIndex
    }
  }
}

// Max Binary Heap for decreasing sort order
class MaxBinaryHeap extends BinaryHeap {
  constructor() {
    super()
  }

  sinkDown(p) {
    const element = this.heapArr[p].value,
      lastIndex = this.heapArr.length - 1

    while (p < lastIndex) {
      const r = 2 * p + 2,
        l = r - 1,
        left = this.heapArr[l] && this.heapArr[l].value,
        right = this.heapArr[r] && this.heapArr[r].value

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

      swap(this.heapArr, p, swapIndex)

      p = swapIndex
    }
  }
}

// Tests
let arr1 = [
  [5, 6, 8, 16],
  [3, 7, 12, 13],
  [1, 10, 11, 15],
  [2, 4, 9, 14]
]
let arr2 = [
  [200, 50, 18, 1],
  [180, 45, 15, 9],
  [30, 17, 8, 5],
  [190, 40, 12, 7]
]
console.log(mergeArrays(arr1))
console.log(mergeArrays(arr2))
