/**
 * @param {number} n
 * @return {string}
 */
var findContestMatch = function(n) {
  let i = 1,
    j = n,
    matches = []
  while (i < j) {
    matches.push(`(${i},${j})`)
    i++
    j--
  }
  const makeMatches = matches => {
    let i = 0,
      j = matches.length - 1
    const res = []
    while (i < j) {
      res.push(`(${matches[i]},${matches[j]})`)
      i++
      j--
    }
    return res
  }

  while (matches.length > 1) {
    matches = makeMatches(matches)
  }
  return matches[0]
}
console.log(findContestMatch(8))
