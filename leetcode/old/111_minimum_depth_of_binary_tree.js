/*Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.*/

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

const minDepth = (tree) => {
  if (tree === null) return 0;
  const left = minDepth(tree.left);
  const right = minDepth(tree.right);
  const min = Math.min(left, right) || Math.max(left, right);
  return min + 1;
}
