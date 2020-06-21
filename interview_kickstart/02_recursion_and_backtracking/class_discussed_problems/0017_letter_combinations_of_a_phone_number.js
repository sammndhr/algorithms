// https://leetcode.com/problems/letter-combinations-of-a-phone-number

// Time Complexity - O(3^n * 4^m)
// Space Complexity - O(3^n * 4^m)

function letterCombinations(digits) {
  if (!digits) return []

  const pMap = {
      '2': ['a', 'b', 'c'],
      '3': ['d', 'e', 'f'],
      '4': ['g', 'h', 'i'],
      '5': ['j', 'k', 'l'],
      '6': ['m', 'n', 'o'],
      '7': ['p', 'q', 'r', 's'],
      '8': ['t', 'u', 'v'],
      '9': ['w', 'x', 'y', 'z']
    },
    result = [],
    len = digits.length

  function lcHelper(slate, numI) {
    // Base Case
    if (numI === len) {
      result.push(slate)
      return
    }

    // Recursive
    for (let j = 0; j < pMap[digits[numI]].length; j++) {
      lcHelper(slate + pMap[digits[numI]][j], numI + 1)
    }
  }

  lcHelper('', 0)
  return result
}

// Tests
console.log(letterCombinations('234'))
console.log(letterCombinations('23'))
