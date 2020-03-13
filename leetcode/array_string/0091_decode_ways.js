/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  if (!s || s[0] === '0') return 0
  const recurse = len => {
    if (len === 0 || len === 1) return 1
    let count = 0
    if (s[len - 1] > '0') {
      count += recurse(len - 1)
    }
    if (s[len - 2] === '1' || (s[len - 2] === '2' && s[len - 1] < '7')) {
      count += recurse(len - 2)
    }
    return count
  }
  return recurse(s.length)
}

const testCases = ['0', '226134', '17', '226']
testCases.forEach(item => {
  console.log(numDecodings(item))
})
