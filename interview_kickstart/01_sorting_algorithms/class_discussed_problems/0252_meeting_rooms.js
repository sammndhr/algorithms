/* 
First Intuition: 
  1. Sort intervals based on start time.
  2. Iterate through the array checking if start time at i + 1 is less
     than end time at i. Return false if it isnt.
  3. Return true after looping through all intervals.

Strategy: Presort

Time Complexity - O(nlogn) for sorting + O(n) to iterate and check
Space complexity - O(1) if mutating input + whatever space is being used
                  by js for sorting.
                  O(n) if not mutating input
*/

var canAttendMeetings = function (intervals) {
  const sorted = intervals.sort((a, b) => a[0] - b[0]),
    maxIndex = intervals.length - 1

  for (let i = 0; i < maxIndex; i++) {
    if (sorted[i][1] > sorted[i + 1][0]) return false
  }

  return true
}

// Tests
console.log(
  canAttendMeetings([
    [5, 10],
    [0, 30],
    [15, 20]
  ])
)
console.log(
  canAttendMeetings([
    [7, 10],
    [2, 4]
  ])
)
