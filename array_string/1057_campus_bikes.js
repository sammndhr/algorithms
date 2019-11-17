/**
 * @param {number[][]} workers
 * @param {number[][]} bikes
 * @return {number[]}
 */

/**
 * @param {number[][]} workers
 * @param {number[][]} bikes
 * @return {number[]}
 */

const manDistance = (p1, p2) => {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1])
}

var assignBikes = function(workers, bikes) {
  const buckets = [],
    bikesUsed = [],
    res = []

  workers.forEach((worker, i) => {
    bikes.forEach((bike, j) => {
      const dist = manDistance(worker, bike)
      if (!buckets[dist]) buckets[dist] = []
      buckets[dist].push([i, j])
    })
  })

  const bucketLen = buckets.length

  for (let i = 0; i < bucketLen; i++) {
    const dist = buckets[i]
    if (dist === undefined) continue

    for (let j = 0; j < dist.length; j++) {
      const w = dist[j][0],
        b = dist[j][1]
      if (bikesUsed[b] === true || res[w] !== undefined) continue
      res[w] = b
      bikesUsed[b] = true
    }
  }
  return res
}
const workers = [[0, 0], [1, 1], [2, 0]],
  bikes = [[1, 0], [2, 2]]

console.log(assignBikes(workers, bikes))
