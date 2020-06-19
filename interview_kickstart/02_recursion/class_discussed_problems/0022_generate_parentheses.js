// https://leetcode.com/problems/generate-parentheses/
function generateParenthesis(n) {
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

console.log(generateParenthesis(3))
