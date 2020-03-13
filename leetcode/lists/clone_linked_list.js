const cloneLinkedList = head => {
  const clone = (originalPrev, clonedCurr) => {
    if (!originalPrev) return
    if (!clonedCurr.val) {
      clonedCurr.val = originalPrev.val
    } else {
      clonedCurr.next = {
        val: originalPrev.val,
        prev: originalPrev,
        next: null
      }
      clonedCurr = clonedCurr.next
    }
    clone(originalPrev.next, clonedCurr)
  }
  const clonedLL = { val: null, next: null, prev: null }
  clone(head, clonedLL)
  return clonedLL
}

node1 = { val: 1, next: null, prev: null }
node2 = { val: 2, next: null, prev: null }
node3 = { val: 3, next: null, prev: null }
node4 = { val: 4, next: null, prev: null }

node1.next = node2
node2.next = node3
node3.next = node4
node2.prev = node1
node3.prev = node2
node4.prev = node3
console.log(cloneLinkedList(node1))
