/*
Reverse a singly linked list.
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

 
function ListNode(val) {
  this.val = val;
  this.next = null;
}


let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);
let node4 = new ListNode(4);
node1.next = node2;
node2.next = node3;
node3.next = node4;
let newLL = node1;

//iterative solution
// var reverseList = function(head) {
//   let prev = null;
//   let curr = head;
//   let temp;
//   while (curr !== null) {
//     temp = curr.next;
//     curr.next = prev;
//     prev = curr;
//     curr = temp;
//   }
//   return prev;
// };

//recursive solution
var reverseList = function(head) {
  const inner = function(curr, prev) {
    if (curr === null) {
      return prev;
    }
    let temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
    return inner(curr, prev);
  }
  return inner(head, null);
};

console.log(reverseList(newLL));
console.log(reverseList(null));