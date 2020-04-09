const MaxBinaryHeap = (() => {
  let content
  const swap = (i, j) => {
    const temp = content[i]
    content[i] = content[j]
    content[j] = temp
  }

  const bubbleUp = i => {
    const element = content[i]

    while (i > 0) {
      const p = Math.floor((i - 1) / 2),
        parent = content[p]

      if (element > parent) {
        swap(p, i)

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
      const r = 2 * p + 2,
        l = r - 1

      let swapIndex = null,
        left,
        right,
        min = element
      if (l <= lastIndex) {
        left = content[l]

        if (left > element) swapIndex = l
        min = left
      }

      if (r <= lastIndex) {
        right = content[r]

        if (right > min) swapIndex = r
      }

      if (swapIndex == null) break

      swap(p, swapIndex)

      p = swapIndex
    }
  }

  class MaxBinaryHeap {
    constructor() {
      content = []
    }

    get size() {
      return content.length
    }

    get max() {
      return this.size ? content[0] : null
    }

    printMaxHeap() {
      console.log(content)
      return content
    }

    insert(element) {
      content.push(element)
      bubbleUp(content.length - 1)
    }

    extractMax() {
      if (content.length <= 0) return null

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
        if (content[i] !== element) continue

        const lastIndex = this.size - 1

        if (i === lastIndex) {
          content.pop()
          break
        }

        swap(i, lastIndex)
        content.pop()
        bubbleUp(i)
        sinkDown(i)
        break
      }
    }
  }
  return MaxBinaryHeap
})()

module.exports = MaxBinaryHeap
