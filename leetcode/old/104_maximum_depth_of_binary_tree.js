/*Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}


//My solution using inOrder.
const maxDepth = (root) => { 
  let max = 0; 
  const inOrderTraverse = (tree, h) => {
    if (tree === null) {
      return max;
    }
    max = Math.max(max, h);
    inOrderTraverse(tree.left, h+1);
    inOrderTraverse(tree.right, h+1);
  }
  inOrderTraverse(root, 1);
  return max;
};


//using post order DFS
function postOrder(tree) {
  if (tree === null) return 0;
  var left = postOrder(tree.left);
  var right = postOrder(tree.right);
  console.log(tree.val, left, right);

  return Math.max(left, right) + 1;
}



// const seven = new TreeNode(7);
// const six = new TreeNode(6);
// const five = new TreeNode(5);
// const four = new TreeNode(4);
// const three = new TreeNode(3);
// const two = new TreeNode(2);
// const one = new TreeNode(1);



// four.left = two;
// two.left = one;
// two.right = three;
// four.right = six;
// six.left = five;
// six.right = seven;

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
four.right = eleven;
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

console.log(postOrder(four));