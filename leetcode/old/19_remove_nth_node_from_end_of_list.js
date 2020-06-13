/*
Given a linked list, remove the nth node from the end of list and return its head.
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
 * @param {number} n
 * @return {ListNode}
 */

//O(nodes) space complexity using array. 
var removeNthFromEnd = function(head, n) {
  curr = head;
  let arr = [];

  while (curr !== null) {
    arr.push(curr);
    curr = curr.next;
  }

  let len = arr.length;
  let i = len - n - 1;
  if (i < 0 && n === 1) {
    return null;
  } else if (i < 0 && n === 0) {
    return head;
  } else if (n === len) {
    return arr[1];
  } else { 
    arr[i].next = arr[i+2];
    return head;
  }
};


//O(1) space complexity and using two pass algorithm.
removeNthFromEnd = (head, n) => {
  let len = 0;
  let first = head;
  let dummy = new ListNode(0);
  dummy.next = head;
  while(first !== null) {
    len++;
    first = first.next;
  }
  len -= n;
  first = dummy;
  while (len > 0) {
    len--;
    first = first.next;
  }
  first.next = first.next.next;
  return dummy.next;
}

//using two pointers
removeNthFromEnd = (head, n) => {
  let dummy = new ListNode(0);
  dummy.next = head;
  let first = dummy;
  let second = dummy;
  for (let i = 0; i < n + 1; i++) {
    first = first.next;
  }
  while (first != null) {
    first = first.next;
    second = second.next;
  }
  second.next = second.next.next;
  return dummy.next;
}


function ListNode(val) {
  this.val = val;
  this.next = null;
}

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
console.log(removeNthFromEnd(node4, 2));
console.log(removeNthFromEnd(newLL, 2));
console.log(removeNthFromEnd(node5, 1));
