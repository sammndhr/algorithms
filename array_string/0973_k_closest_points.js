/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */

function getDistance(x, y) {
  return x * x + y * y
}

var kClosest = function(points, K) {
  let results = []
  const closestSoFar = [],
    pointsHash = {},
    len = points.length
  for (let i = 0; i < len; i++) {
    const curr = getDistance(points[i][0], points[i][1])
    const csfLen = closestSoFar.length
    if (csfLen < K) {
      if (!csfLen || curr >= closestSoFar[csfLen - 1]) {
        closestSoFar.push(curr)
      } else {
        closestSoFar.shift(curr)
      }
    } else {
      closestSoFar.sort((a, b) => a - b)
      closestSoFar[csfLen - 1] = csfLen === 1 ? Math.min(closestSoFar[csfLen - 1], curr) : Math.max(closestSoFar[csfLen - 1], curr)
    }
    if (!pointsHash[curr]) {
      pointsHash[curr] = [points[i]]
    } else {
      pointsHash[curr].push(points[i])
    }
  }
  closestSoFar.forEach(item => {
    results = results.concat(pointsHash[item])
  })
  return results
}
// console.log(kClosest([([3, 3], [5, -1], [-2, 4])], 2))

// console.log(kClosest([[1, 3], [-2, 2]], 1))
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
  Object.values(wordHash).forEach(arr => {
    results.push(arr)
  })
  return results
}

// console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))

function minMeetingRooms(times) {
  if (!times.length) return 0
  const start = [],
    end = [],
    len = times.length
  let count,
    maxCount,
    i = 0,
    j = 0
  times.forEach(time => {
    start.push(time[0])
    end.push(time[1])
  })
  start.sort((a, b) => a - b)
  end.sort((a, b) => a - b)
  while (i < len) {
    if (count === undefined) {
      count = 1
      maxCount = 1
    } else if (start[i] === start[i + 1]) {
      count++
      maxCount = Math.max(count, maxCount)
    } else if (start[i] < end[j]) {
      count++
      maxCount = Math.max(count, maxCount)
    } else {
      count--
      j++
    }
    i++
  }
  return maxCount
}

// console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]]))
// console.log(minMeetingRooms([[1, 5], [8, 9], [8, 9]]))
console.log(minMeetingRooms([[6, 10], [13, 14], [12, 14]]))

graph = {
  $id: '1',
  neighbors: [
    {
      $id: '2',
      neighbors: [{ $ref: '1' }, { $id: '3', neighbors: [{ $ref: '2' }, { $id: '4', neighbors: [{ $ref: '3' }, { $ref: '1' }], val: 4 }], val: 3 }],
      val: 2
    },
    { $ref: '4' }
  ],
  val: 1
}

console.log(graph.neighbors[0])
