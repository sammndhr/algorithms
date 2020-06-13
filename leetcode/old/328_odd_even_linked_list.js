/*
Given a singly linked list, group all odd nodes together followed by the even nodes. Please note here we are talking about the node number and not the value in the nodes.

You should try to do it in place. The program should run in O(1) space complexity and O(nodes) time complexity.*/

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

var oddEvenList = function(head) {
  if (head === null) {
    return null;
  }
  let oddHead = head;
  let evenHead = head.next;
  let odd = head;
  let even = head.next;
  while (even !== null) {
    odd.next = even.next;
    head = even.next;
    if (head === null) {
      break;
    }
    even.next = head.next;
    odd = head;
    even = head.next;
  }
  odd.next = evenHead;
  console.log(util.inspect(oddHead, {showHidden: false, depth: null}));
  return oddHead;
};

//leetcode's solution
var oddEvenList = function(head) {
  if (head === null) {
    return null;
  }
  let odd = head;
  let even = head.next;
  let evenHead = even;
  while (even !== null && even.next !== null) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  console.log(util.inspect(head, {showHidden: false, depth: null}));
  return head;
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
console.log(oddEvenList(newLL));
console.log(oddEvenList(null));
