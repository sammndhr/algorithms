/*Reverse a linked list from position m to n. Do it in-place and in one-pass.
*/
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
const util = require('util');
function ListNode(val) {
  this.val = val;
  this.next = null;
}

const reverseBetween = (head, m, n) => {
  if (head.next === null || m === n) {
    return head;
  }

  const dummyTop = new ListNode(0);
  let count = 0;
  let beginReverse = dummyTop;
  let top;
  dummyTop.next = head;

  while (count < m ) {
    top = beginReverse;
    beginReverse = beginReverse.next
    count++;
  }

  let curr = null;
  let tail;
  let endReverse;

  while (count < n +1 ) {
    if (curr === null) {
      endReverse = beginReverse; //will be tail of the reversed LL after reversal
    }
    tail = beginReverse.next;
    beginReverse.next = curr;
    curr = beginReverse;
    beginReverse = tail;
    count++;
  }

  top.next = curr;
  endReverse.next = tail;

  return dummyTop.next;
};


let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);
let node4 = new ListNode(4);
let node5 = new ListNode(5);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
let newLL = node1;
// console.log(reverseBetween(node6, 1,2));
console.log(reverseBetween(node4, 1,2));
// console.log(reverseBetween(node5, 1,3));
// console.log(reverseBetween(newLL, 6,7));
// console.log(util.inspect(newLL, {showHidden: false, depth: null}));
