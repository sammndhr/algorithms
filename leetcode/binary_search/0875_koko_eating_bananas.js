// /**
//  * @param {number[]} piles
//  * @param {number} H
//  * @return {number}
//  */

var minEatingSpeed = function(piles, H) {
  const isPossibleK = k => {
    let t = 0
    for (const pile of piles) {
      t += Math.ceil(pile / k)
    }
    return t <= H
  }

  let max = Math.max(...piles)
  min = 0

  while (min < max) {
    mid = Math.floor((min + max) / 2)
    if (!isPossibleK(mid)) {
      min = mid + 1
    } else max = mid
  }
  return min
}

let piles = [30, 11, 23, 4, 20],
  H = 5
console.log(minEatingSpeed(piles, H))
piles = [30, 11, 23, 4, 20]
H = 6
console.log(minEatingSpeed(piles, H))
piles = [
  332484035,
  524908576,
  855865114,
  632922376,
  222257295,
  690155293,
  112677673,
  679580077,
  337406589,
  290818316,
  877337160,
  901728858,
  679284947,
  688210097,
  692137887,
  718203285,
  629455728,
  941802184
]
h = 823855818

console.log(minEatingSpeed(piles, H))
