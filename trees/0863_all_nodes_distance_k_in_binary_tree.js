var distanceK = function(root, target, K) {
  root.parent = null

  function findKNodes(node, K) {
    const queue = [node],
      result = []
    while (queue.length) {
      const curr = queue.shift(),
        level = curr.level,
        left = curr.left,
        right = curr.right,
        parent = curr.parent

      if (level === K) {
        result.push(curr.val)
      } else {
        if (left && left.level === undefined) {
          left.level = level + 1
          queue.push(left)
        }
        if (right && right.level === undefined) {
          right.level = level + 1
          queue.push(right)
        }
        if (parent && parent.level === undefined) {
          parent.level = level + 1
          queue.push(parent)
        }
      }
    }
    return result
  }

  function bfsSearch(node, K) {
    const queue = [node]
    while (queue.length) {
      const curr = queue.shift()
      if (curr.val === target.val) {
        curr.level = 0
        return findKNodes(curr, K)
      }
      const left = curr.left,
        right = curr.right
      if (left) {
        left.parent = curr
        queue.push(left)
      }
      if (right) {
        right.parent = curr
        queue.push(right)
      }
    }
  }
  return bfsSearch(root, K)
}

const root = {
  val: 3,
  right: { val: 1, right: { val: 8, right: null, left: null }, left: { val: 0, right: null, left: null } },
  left: {
    val: 5,
    right: { val: 2, right: { val: 4, right: null, left: null }, left: { val: 7, right: null, left: null } },
    left: { val: 6, right: null, left: null }
  }
}

console.log(
  distanceK(
    root,
    {
      val: 5,
      right: { val: 2, right: { val: 4, right: null, left: null }, left: { val: 7, right: null, left: null } },
      left: { val: 6, right: null, left: null }
    },
    2
  )
)
