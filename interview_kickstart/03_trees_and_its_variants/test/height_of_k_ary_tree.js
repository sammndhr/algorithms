// Traversal - Top down recursive dfs

// - Initialize a global var hmax
//   Recursive helper function
//   - Starting from 0 for root, pass along height to children(increment before passing down)
//   - Update the hmax if the height that was passed to curr node + 1 > hmax
// - return hmax

function find_height(root) {
  let hmax = 0

  function dfs(node, height) {
    if (height > hmax) hmax = height

    if (node.children.length) {
      for (const child of node.children) {
        dfs(child, height + 1)
      }
    }

    return
  }

  dfs(root, 0)
  return hmax
}

function TreeNode() {
  this.children = []
}

const tree = new TreeNode()
const tree1 = new TreeNode()
const tree2 = new TreeNode()
const tree3 = new TreeNode()
const tree4 = new TreeNode()
const tree5 = new TreeNode()
const tree6 = new TreeNode()

tree.children = [tree1, tree2, tree3]
tree1.children = [tree4, tree5]
tree4.children = [tree6]
console.log(find_height(tree))
