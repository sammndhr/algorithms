/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const wordHash = {},
    results = []
  strs.forEach(word => {
    const sorted = word
      .split('')
      .sort()
      .join('')
    if (!wordHash[sorted]) {
      wordHash[sorted] = [word]
    } else {
      wordHash[sorted].push(word)
    }
  })
  Object.keys(wordHash).forEach(arr => {
    results.push(wordHash[arr])
  })
  return results
}
