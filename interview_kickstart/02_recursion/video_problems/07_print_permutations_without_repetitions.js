/* Permutations Without Repetitions - Given a set(or string) with n distinct characters, print all permutations (of size n, no repetitions allowed). */
/* 
DFS Recursive
Time Complexity - 
  Lower Bound - Ω(n * n!)
Space Complexity - O(n)
*/

function pHelper(slate, arr) {
  const len = arr.length

  if (len === 0) console.log(slate)
  else {
    for (let i = 0; i < len; i++) {
      pHelper(slate + arr[i], [...arr.slice(0, i), ...arr.slice(i + 1)])
    }
  }
}

function printPermutations(str) {
  pHelper('', str.split(''))
}

// Tests
printPermutations('abc')
printPermutations('abcd')
