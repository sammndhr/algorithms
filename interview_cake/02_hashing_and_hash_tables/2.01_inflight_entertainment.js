// https://www.interviewcake.com/question/javascript/inflight-entertainment?course=fc1&section=hashing-and-hash-tables

// Determine if two movie runtimes add up to the flight length
function canTwoMoviesFillFlight(movieLengths, flightLength) {
  // hash to map movie lengths
  const seen = {}

  // iterate through all the possible movies
  for (const possibleFirst of movieLengths) {
    // possible second movie length will be the total flight length minus first movie length
    const possibleSecond = flightLength - possibleFirst
    // check if it exits in seen and return true if it does
    if (seen[possibleSecond]) return true

    // Add possibleFirst to seen which will be checked as possibleSecond in successive iterations
    seen[possibleFirst] = true
  }
  return false
}

// Using sets. interviewcake's solution
function canTwoMoviesFillFlight(movieLengths, flightLength) {
  const movieLengthsSeen = new Set()

  for (const possibleFirst of movieLengths) {
    const secondMovieLen = flightLength - possibleFirst
    if (movieLengthsSeen.has(secondMovieLen)) return true
    movieLengthsSeen.add(possibleFirst)
  }
  return false
}

/*
n = length of movieLengths
Time Complexity - O(n)
Space complexity - O(n)
*/

/* ---------------------------------------------------------------------------- */

// Tests

const testCases = [
  [[2, 4], 1, false],
  [[3, 8, 3], 6, true],
  [[3, 8], 6, false],
  [[1, 2, 3, 4, 5, 6], 7, true]
]

for (const test of testCases) {
  console.log(canTwoMoviesFillFlight(test[0], test[1]) === test[2])
}
