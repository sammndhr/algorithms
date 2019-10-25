/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function(people, limit) {
  let boatCount = 0,
    i = 0,
    j = people.length - 1
  people.sort((a, b) => a - b)
  while (i <= j) {
    const curr = people[i] + people[j]
    boatCount++
    if (curr <= limit) {
      i++
    }
    j--
  }
  return boatCount
}

console.log(numRescueBoats([1, 2], 3))
console.log(numRescueBoats([3, 2, 2, 1], 3))
console.log(numRescueBoats([], 3))
console.log(numRescueBoats([3, 5, 3, 4], 5))
console.log(numRescueBoats([3, 5, 3, 4], 0))
