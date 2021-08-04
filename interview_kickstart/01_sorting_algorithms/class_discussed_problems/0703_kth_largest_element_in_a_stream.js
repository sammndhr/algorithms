// https://leetcode.com/problems/kth-largest-element-in-a-stream/
const { MinBinaryHeap } = require('../../../utils')

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.nums = nums
  this.k = k

  this.minHeap = new MinBinaryHeap()

  for (const num of nums) {
    if (this.minHeap.size < k) this.minHeap.insert(num)
    else if (num > this.minHeap.min) {
      this.minHeap.extractMin()
      this.minHeap.insert(num)
    }
  }
}

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  if (this.minHeap.size < this.k) this.minHeap.insert(val)
  else if (val > this.minHeap.min) {
    this.minHeap.extractMin()
    this.minHeap.insert(val)
  }

  return this.minHeap.min
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

/* 
Time Complexity - O(log(k)) per number added

Space Complexity - O(k) from the min heap
*/

const kthLargest0 = new KthLargest(3, [4, 5, 8, 2])

console.log(kthLargest0.add(3))
console.log(kthLargest0.add(5))
console.log(kthLargest0.add(10))
console.log(kthLargest0.add(9))
console.log(kthLargest0.add(4))

console.log('-------------------')

const kthLargest1 = new KthLargest(1, [])

console.log(kthLargest1.add(-3))
console.log(kthLargest1.add(-2))
console.log(kthLargest1.add(-4))
console.log(kthLargest1.add(0))
console.log(kthLargest1.add(4))

console.log('-------------------')

const kthLargest2 = new KthLargest(2, [0])

console.log(kthLargest2.add(-1))
console.log(kthLargest2.add(1))
console.log(kthLargest2.add(-2))
console.log(kthLargest2.add(-4))
console.log(kthLargest2.add(3))
