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
var sortList = function(head) {
  if (head === null) {
    return null;
  }
  if (head.next === null) {
    return head;
  }
  let dummy = new ListNode(-1);
  let prev = dummy;
  dummy.next = head;
  let curr = head;
  let next = head.next;
  console.log(curr.next);
  let temp;
  const recurse = (prev, curr, next) => {
    if (curr.val < next.val) {
      return;
    }
    while (next !== null && next.val < curr.val) {
      curr = next;
      next = prev.next;
      next.next = curr.next;
      curr.next = next;
      prev.next = curr;
      prev = curr;
      curr = next;
      next = curr.next;
    }
    recurse(dummy, curr, next);
  }
  recurse(prev, curr, next);
  console.log('curr', curr);
  console.log('next', next);
  console.log('prev', prev);
  console.log('head', head);
  console.log('dummy'); 
  console.log(util.inspect(dummy, {showHidden: false, depth: null}));
  // console.log('dummy', dummy);
};

//BAD!! Don't solve it this way!
var sortList = function(head) {
  if (head === null) {
    return null;
  }
  if (head.next === null) {
    return head;
  }
  let curr = head;
  let next = head.next;
  let arr = [];
  while (next !== null) {
    arr.push(curr.val);
    next = curr.next;
    curr = next;
  }
  arr = arr.sort((a, b) => {return a-b;});
  arr = arr.map((val, i) => {
    return (new ListNode(val));
  });

  for (let i = 0; i < arr.length; i++) {
    if (i === arr.length-1) {
      arr[i].next = null;
    } else {
      arr[i].next = arr[i+1];
    }
  }
  return arr[0];
};

var node10 =  new ListNode(10);
var node9 =  new ListNode(9);
var node8 =  new ListNode(8);
var node7 =  new ListNode(7);
var node6 =  new ListNode(6);
var node5 =  new ListNode(5);
node10.next = node9;
node9.next = node8;
node8.next = node7;
node7.next = node6;

sortList(node10);
// console.log(util.inspect(newLL, {showHidden: false, depth: null}));
