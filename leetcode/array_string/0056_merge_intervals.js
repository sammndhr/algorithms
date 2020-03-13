/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  intervals.sort((a, b) => a[0] - b[0])
  const results = [],
    len = intervals.length
  let currRange
  for (let i = 0; i < len; i++) {
    const currPair = intervals[i]
    if (!currRange) {
      currRange = currPair
    } else if (currPair[0] <= currRange[1]) {
      currRange[1] = Math.max(currPair[1], currRange[1])
    } else if (currPair[0] > currRange[1]) {
      results.push(currRange)
      currRange = currPair
    }
  }
  if (currRange) {
    results.push(currRange)
  }
  return results
}
