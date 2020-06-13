/*Given two binary trees and imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not.

You need to merge them into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of new tree.*/

/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
} 
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
  if (t1 === null) {
    return t2;
  }
  if (t2 === null) {
    return t1;
  }
  t1.val += t2.val;
  t1.left = mergeTrees(t1.left, t2.left);
  t1.right = mergeTrees(t1.right, t2.right);
  return t1;
};

const fifteen = new TreeNode(15);
const fourteen = new TreeNode(14);
const thirteen = new TreeNode(13);
const twelve = new TreeNode(12);
const eleven = new TreeNode(11);
const ten = new TreeNode(10);
const nine = new TreeNode(9);
const eight = new TreeNode(8);
const seven = new TreeNode(7);
const six = new TreeNode(6);
const five = new TreeNode(5);
const four = new TreeNode(4);
const three = new TreeNode(3);
const two = new TreeNode(2);
const one = new TreeNode(1);

four.left = two;
two.left = one;
two.right = three;
// four.right = eleven;
eleven.left = six;
six.left = five;
six.right = eight;
eight.left = seven;
eight.right = ten;
ten.left= nine;
eleven.right = thirteen;
thirteen.left = twelve;
thirteen.right = fifteen;
fifteen.left = fourteen;


console.log(mergeTrees(four, eleven));