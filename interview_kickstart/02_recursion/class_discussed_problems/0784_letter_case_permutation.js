// https://leetcode.com/problems/letter-case-permutation/
/* 
Top-down DFS
Time Complexity - O(n * 2^n). Work done by leaf nodes (O(n * 2^n)) + work done by internal nodes (O(2^n))
Space Complexity - O(n * 2^n). Input (O(n)) + Auxiliary stack (O(n)) + Output (O(n * 2^n))
*/
var letterCasePermutation = function (str) {
  const result = []

  function recurse(str, i, slate) {
    // Base case
    if (i === str.length) {
      result.push(slate.join('')) //O(n) time
      return
    }

    // numbers
    if (!isNaN(str[i])) {
      slate.push(str[i])
      recurse(str, i + 1, slate)
      slate.pop()
      // letters
    } else {
      // lowercase
      slate.push(str[i].toLowerCase())
      recurse(str, i + 1, slate)
      slate.pop()
      // uppercase
      slate.push(str[i].toUpperCase())
      recurse(str, i + 1, slate)
      slate.pop()
    }
  }

  recurse(str, 0, [])
  return result
}

// Tests
const tests = [
  ['a1b2', ['a1b2', 'a1B2', 'A1b2', 'A1B2']],
  ['123', ['123']],
  ['abc', ['abc', 'abC', 'aBc', 'aBC', 'Abc', 'AbC', 'ABc', 'ABC']]
]

for (const test of tests) {
  const res = letterCasePermutation(test[0])
  console.log(res)
  console.log(JSON.stringify(res) === JSON.stringify(test[1]))
}
