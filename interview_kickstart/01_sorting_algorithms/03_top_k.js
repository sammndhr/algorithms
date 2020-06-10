/* 
Time Complexity - O(n + klog(k))
Space Complexity - O(k) from set + O(k) from heap

1. Create a set and a min heap (max size of heap and set will be k). 
2. Add first k unique elements to heap and set
3. Heapify
4. For the rest of the numbers (or for the numbers incoming from stream)
   check if it is greater than the top of the heap and if it already exists
   in the set
5. If these conditions are met, get the min of the heap, delete the min from the set,
   swap the num with the top of the heap (heap min) and sink it down.
   Also add the num to the set
*/

function topK(arr, k) {
  const len = arr.length

  if (len < k) return [new Set(arr)]

  const heap = new MinBinaryHeap(),
    set = new Set()

  let i = 0

  while (i < len && heap.size < k) {
    const curr = arr[i]

    if (!set.has(curr)) {
      heap.insert(curr)
      set.add(curr)
    }
    i++
  }

  heap.heapify()

  while (i < len) {
    const curr = arr[i],
      min = heap.top

    if (curr > min && !set.has(curr)) {
      heap.swapTopAndSinkDown(curr)
      set.delete(min)
      set.add(curr)
    }
    i++
  }

  return heap.heapArray
}

// Min Binary Heap
class MinBinaryHeap {
  constructor() {
    this.heapArr = []
  }
  // getters
  get size() {
    return this.heapArr.length
  }

  get heapArray() {
    return this.heapArr
  }

  get top() {
    return this.heapArr[0]
  }
  // Class methods
  swap(i, j) {
    const temp = this.heapArr[i]
    this.heapArr[i] = this.heapArr[j]
    this.heapArr[j] = temp
  }

  insert(val) {
    this.heapArr[this.size] = val
  }

  swapTopAndSinkDown(newVal) {
    this.heapArr[0] = newVal
    this.sinkDown(0)
  }

  heapify() {
    const lastIndex = this.size - 1
    for (let i = lastIndex; i >= 0; i--) {
      this.sinkDown(i)
    }
  }

  sinkDown(p) {
    const element = this.heapArr[p],
      lastIndex = this.heapArr.length - 1

    while (p < lastIndex) {
      const r = 2 * p + 2,
        l = r - 1,
        left = this.heapArr[l],
        right = this.heapArr[r]

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

      this.swap(p, swapIndex)

      p = swapIndex
    }
  }
}

const arr = [8, 1, 3, 4, 1, 5, 9, 7, 10, 7, 3, 10]
console.log(topK(arr, 10))
console.log(topK(arr, 5))

const arr1 = [4, 2, 1, 6, 2, 10, 4, 3, 10, 6, 5, 6, 7, 2, 10, 10, 4, 6, 5, 8]
console.log(topK(arr1, 7))
