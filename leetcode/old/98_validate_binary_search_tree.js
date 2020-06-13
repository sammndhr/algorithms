/*Given a binary tree, determine if it is a valid binary search tree (BST).

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.*/

/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
*/


//https://discuss.leetcode.com/topic/4659/c-in-order-traversal-and-please-do-not-rely-on-buggy-int_max-int_min-solutions-any-more/2?page=4

let isValidBST = (root) => {
  let pre = new TreeNode(null);
  const validate = (node) => {
    if (node === null) {
      return true;
    }
    if (!validate(node.left)) {
      return false;
    }
    if (pre !== null && pre.val !== null && pre.val >= node.val) {
      return false;
    }
    pre = node;
    return validate(node.right);
  }
  return validate(root);
}

// https://www.youtube.com/watch?v=MILxfAbIhrE
isValidBST = (root) => {
  const validate = (node, min, max) => {
    if (node === null) {
      return true;
    }
    if (node.val <= min || node.val >= max) {
      return false;
    }
    return validate(node.left, min, node.val) && validate(node.right, node.val, max)
  }
  return validate(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
}

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
four.right = six;
six.left = five;
six.right = seven;

let one1 = new TreeNode(1);
one1.left = one;

console.log(isValidBST(four));
console.log(isValidBST(one1));
