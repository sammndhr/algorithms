/*Given a linked list, return the node where the cycle begins. If there is no cycle, return null.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const util = require('util');
function ListNode(val) {
  this.val = val;
  this.next = null;
}

var detectCycle = function(head) {
  if (head === null || head.next === null) {
    return null;
  }
  let slow = head;
  let fast = head;
  let find = head; 
  while (true) {
    if (fast === null || fast.next === null) {
      return null;
    }
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      break;
    } 
  }
  while (find !== slow) {
    find = find.next;
    slow = slow.next;
  }
  return find;
};

let single = new ListNode(1);
single.next = single;
console.log(detectCycle(single));
let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);
let node4 = new ListNode(4);
node1.next = node2;
node2.next = node3;
node3.next = node2;
console.log(detectCycle(node1));
console.log(detectCycle(null));
node3.next = node4;
node4.next = node3;
console.log(detectCycle(node1));
// console.log(util.inspect(newLL, {showHidden: false, depth: null}));