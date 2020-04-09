// https://www.youtube.com/watch?v=WCm3TqScBM8

// Any node has a value at least as small as the values in that node's children.

// Source: https://eloquentjavascript.net/1st_edition/appendix2.html

const MinBinaryHeap = (() => {
  let content
  const swap = (i, j) => {
    const temp = content[i]
    content[i] = content[j]
    content[j] = temp
  }
  /* bubbleUp 
    1. Compare item to parent and check if it's less than parent. 
    2. If it is less than parent, swap it. 
    3. Now, compare to the new parent and keep swapping until it either reaches the top of the heap or it is >= parent. 
    */
  const bubbleUp = i => {
    const element = content[i]
    /* 
      indexing from 0
      p is the index of the parent
      i is the index of either left or right child
      l is index of left child
      r is the index of the right child

      l = 2p + 1
      r = 2p + 2
      p = Math.floor((i-1)/2)
     */
    while (i > 0) {
      const p = Math.floor((i - 1) / 2),
        parent = content[p]

      if (element < parent) {
        swap(p, i)
        // make sure to change index to that of parent after swapping
        i = p
      } else {
        break
      }
    }
  }

  const sinkDown = p => {
    const element = content[p],
      lastIndex = content.length - 1

    while (p < lastIndex) {
      // Info in getting index in bubbleUp
      const r = 2 * p + 2,
        l = r - 1 //Or 2 * p + 1

      let swapIndex = null,
        left,
        right,
        min = element //start out assuming the min between left, right, element is the element
      // if element has left child, compare
      // if left child < element, set swapIndex to the left index (l) and min to left
      if (l <= lastIndex) {
        left = content[l]

        if (left < element) swapIndex = l
        min = left
      }

      if (r <= lastIndex) {
        right = content[r]
        // compare the right to the min so far to make sure the min of the three items gets bubbled up while the parent gets sunk
        if (right < min) swapIndex = r
      }
      // parent is smaller than both left and right child so break
      if (swapIndex == null) break

      swap(p, swapIndex)
      // set the parent index to the swap index so it will continue to sink down
      p = swapIndex
    }
  }

  class MinBinaryHeap {
    constructor() {
      content = []
    }

    get size() {
      return content.length
    }

    get min() {
      return this.size ? content[0] : null
    }

    printMinHeap() {
      console.log(content)
      return content
    }

    /* insert
    1. insert new item into content
    2. bubble it up 
    */
    insert(element) {
      content.push(element)
      bubbleUp(content.length - 1)
    }

    /* extractMin
    1. swap first and last items if content.length > 1 (or first !== last)
    2. pop out last item of array and save it in result
    3. If length is more than one, bubble the first item down
    4. Return the result that was saved 
    */
    extractMin() {
      if (content.length <= 0) return null //return null if array is empty

      const lastIndex = content.length - 1,
        firstIndex = 0

      if (firstIndex !== lastIndex) swap(firstIndex, lastIndex)

      const result = content.pop()

      if (content.length > 0) {
        sinkDown(0)
      }

      return result
    }

    remove(element) {
      for (let i = 0; i < this.size; i++) {
        // if curr item doesn't match the element to remove, continue searching
        if (content[i] !== element) continue

        // if it does match
        const lastIndex = this.size - 1
        // if it's the last item, pop it and break
        if (i === lastIndex) {
          content.pop()
          break
        }
        // if it's not the last item
        //  1. swap it with the last item
        //  2. pop the swapped last item
        //  3. Then call bubbleUp and sinkDown.

        swap(i, lastIndex)
        content.pop()
        bubbleUp(i)
        sinkDown(i)
        break
      }
    }
  }
  return MinBinaryHeap
})()

module.exports = MinBinaryHeap
