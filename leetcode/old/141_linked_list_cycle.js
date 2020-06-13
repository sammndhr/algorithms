/*
Given a linked list, determine if it has a cycle in it.

Follow up:
Can you solve it without using extra space?
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
 * @return {boolean}
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

var hasCycle = function(head) {
  if (head === null || head.next === null) {
    return false;
  }
  let slow = head;
  let fast = head.next;
  while (fast !== slow) {
    if (fast === null || fast.next == null) {
      return false;
    }
    fast = fast.next.next;
    slow = slow.next;
  }
  return true;
};

var hasCycle = function(head) {
  if (head === null || head.next === null) {
    return false;
  }
  let node = head;
  while(node !== null) {
    if (node.seen) {
      return true;
    } 
    node.seen = true;
    node = node.next;
  }
  return false;
};

let single = new ListNode(1);
single.next = single;
console.log(hasCycle(single) === true);
let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);
node1.next = node2;
node2.next = node3;
let newLL = node1;
console.log(hasCycle(newLL) === false);
node3.next = node2;
console.log(hasCycle(null) === false);
console.log(hasCycle(node3) === true);
console.log(hasCycle(newLL) === true);

