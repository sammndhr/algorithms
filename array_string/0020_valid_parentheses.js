/* Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.

Example 1:

Input: "()"
Output: true
Example 2:

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false
Example 4:

Input: "([)]"
Output: false
Example 5:

Input: "{[]}"
Output: true */

/**
 * @param {string} s
 * @return {boolean}
 */

//Time = O(n), Sapce = O(n)
var isValid = function(s) {
  const bracketHash = {
      '{': '}',
      '[': ']',
      '(': ')'
    },
    stack = [],
    len = s.length

  for (let i = 0; i < len; i++) {
    const char = s[i]
    if (bracketHash.hasOwnProperty(char)) {
      stack.push(char)
    } else if (bracketHash[stack.pop()] !== char) return false
  }
  return !stack.length //return true returns true for array of length 1
}

console.log(isValid('()[]{}'))
console.log(isValid('['))
