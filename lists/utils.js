function ListNode(val) {
  this.val = val
  this.next = null
}

function arrToLL(arr) {
  const len = arr.length
  if (!len) return null
  const root = new ListNode(arr[0])
  let node = root
  for (let i = 1; i < len; i++) {
    node.next = new ListNode(arr[i])
    node = node.next
  }
  return root
}

function LLToArr(head) {
  const arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  return arr
}
module.exports = { ListNode, arrToLL, LLToArr }
