/* 
Given a set S of n distinct numbers, print (enumerate) all of its subsets
*/

/* 
Recursive BFS
Time Complexity - O(n * 2^n)
Space Complexity - O(n)
*/
function printSubsets(S) {
  function subsetHelper(slate, array) {
    if (array.length === 0) console.log(slate)
    else {
      // exclude
      subsetHelper(slate, array.slice(1))
      // include
      subsetHelper([...slate, array[0]], array.slice(1))
    }
  }
  subsetHelper([], S)
}

// Tests
printSubsets([1, 2, 3])
printSubsets(['a', 'b', 'c', 'd'])
