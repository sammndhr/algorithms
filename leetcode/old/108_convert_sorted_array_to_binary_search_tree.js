/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const sortedArrayToBST = (nums) => {
  if (nums.length === 0) {
    return null;
  }
  const inner = (nums, low, high) => {
    let mid, node;
    
    if (low > high) {
      return null;
    }

    mid = parseInt((low+high)/2);
    node = new TreeNode(nums[mid]);
    node.left = inner(nums, low, mid-1);
    node.right = inner(nums, mid+1, high);
    return node;
  }
  let head = inner(nums, 0, nums.length-1);
  return head;
};


console.log(sortedArrayToBST([1,2,3,4,5,6]));
console.log(sortedArrayToBST([1,2,3,4,5,6,7,8,9,10,11]));