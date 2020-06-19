// https://leetcode.com/problems/generate-parentheses/

// Using string for partial
function generateParenthesis(n) {
  if (n === 0) return []

  const result = [],
    total = n * 2

  function parenHelper(i, open, slate) {
    // Valid case so add to result and return
    if (i === total && open === 0) {
      result.push(slate)
      return
    }

    // Backtracking + base case
    if (open < 0 || i == total) return

    // Recursive case
    parenHelper(i + 1, open + 1, slate + '(')
    parenHelper(i + 1, open - 1, slate + ')')
  }

  parenHelper(0, 0, '')
  return result
}

// Using array for partial
function generateParenthesis(n) {
  if (n === 0) return []

  const result = [],
    total = n * 2

  function parenHelper(i, open, slate) {
    if (i === total && open === 0) {
      result.push(slate.join(''))
      return
    }

    if (open < 0 || i == total) return

    slate.push('(')
    parenHelper(i + 1, open + 1, slate)
    slate.pop()
    slate.push(')')
    parenHelper(i + 1, open - 1, slate)
    slate.pop()
  }

  parenHelper(0, 0, [])
  return result
}

//Tests
console.log(generateParenthesis(3))
console.log(generateParenthesis(2))
console.log(generateParenthesis(1))
console.log(generateParenthesis(0))
