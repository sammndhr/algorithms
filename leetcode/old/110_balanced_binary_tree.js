/*Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

// https://discuss.leetcode.com/topic/7798/the-bottom-up-o-n-solution-would-be-better/48

//using top to bottom approach. 
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

let isBalanced = (root) => {
  const calculateDepth = (node) => {
    if (node === null) {
      return 0;
    }
    return Math.max(calculateDepth(node.left), calculateDepth(node.right)) + 1;
  }
  const checkBalance = (node) => {  
    if (node === null) {
      return true;
    }
    let left = calculateDepth(node.left);
    let right = calculateDepth(node.right);
    return (Math.abs(left-right) <= 1 && checkBalance(node.left) && checkBalance(node.right));
  }
  return checkBalance(root);
};

//using bottom up approach. O(n) time complexity

isBalanced = (root) => {
  const dfsHeight = (node) => {
    if (node === null) {
      return 0;
    }
    let leftH = dfsHeight(node.left);
    if (leftH === -1) {
      return -1;
    }
    let rightH = dfsHeight(node.right);
    if (rightH === -1) {
      return -1;
    }
    if (Math.abs(leftH-rightH) > 1) {
      return -1;
    }
    return Math.max(leftH, rightH) + 1;
  }
  return (dfsHeight(root) !== -1);
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
one.left = new TreeNode(0);
// six.left = five;
// six.right = seven;
console.log(isBalanced(four));

