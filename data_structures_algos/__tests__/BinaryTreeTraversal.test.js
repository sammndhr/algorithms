const { BFS, DFSIterative, DFSRecursive } = require('../modules').TreeTraversal
const { BinarySearchTree } = require('../modules')

describe('scoped bst tree', () => {
  let bst
  beforeEach(() => {
    bst = new BinarySearchTree()

    bst.insert(3)
    bst.insert(1)
    bst.insert(0)
    bst.insert(2)
    bst.insert(5)
    bst.insert(4)
    bst.insert(6)
  })

  describe('Breadth First Search, Level Order Traversal', () => {
    test('traverses binary tree in level order and returns array of values', () => {
      const levelOrderArr = [3, 1, 5, 0, 2, 4, 6]
      expect(BFS(bst.root)).toEqual(levelOrderArr)
    })
  })

  describe('Recursive Depth First Search', () => {
    const { preOrder, postOrder, inOrder } = DFSRecursive
    test('traverses tree in in order and returns array of values', () => {
      const inOrderArr = [0, 1, 2, 3, 4, 5, 6]
      expect(inOrder(bst.root)).toEqual(inOrderArr)
    })
    test('traverses tree in post order and returns array of values', () => {
      const postOrderArr = [0, 2, 1, 4, 6, 5, 3]
      expect(postOrder(bst.root)).toEqual(postOrderArr)
    })
    test('traverses tree in pre order and returns array of values', () => {
      const preOrderArr = [3, 1, 0, 2, 5, 4, 6]
      expect(preOrder(bst.root)).toEqual(preOrderArr)
    })
  })

  describe('Iterative Depth First Search', () => {
    const { preOrder, postOrder, inOrder } = DFSIterative
    test('traverses tree in in order and returns array of values', () => {
      const inOrderArr = [0, 1, 2, 3, 4, 5, 6]
      expect(inOrder(bst.root)).toEqual(inOrderArr)
    })
    test('traverses tree in post order and returns array of values', () => {
      const postOrderArr = [0, 2, 1, 4, 6, 5, 3]
      expect(postOrder(bst.root)).toEqual(postOrderArr)
    })
    test('traverses tree in pre order and returns array of values', () => {
      const preOrderArr = [3, 1, 0, 2, 5, 4, 6]
      expect(preOrder(bst.root)).toEqual(preOrderArr)
    })
  })
})
