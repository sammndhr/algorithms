// https://www.interviewcake.com/question/javascript/merging-ranges?course=fc1&section=array-and-string-manipulation

// Merge meetings ranges
function mergeRanges(meetings) {
  // 1. If array is empty or there is only one meeting return the meetings
  const len = meetings.length
  if (len <= 1) return meetings

  /*
  2. Deep copy array so we don't mutate it
  3. Sort the copied array */
  const meetingsCopy = JSON.parse(JSON.stringify(meetings)),
    sorted = meetingsCopy.sort((a, b) => a.startTime - b.startTime),
    mergedMeetings = []

  // 3. Initialize two variables merged and curr with merged set to the first item from sorted
  let merged = sorted[0],
    curr

  /*
  4. Check if curr.startTime <= merged.endTime and if it is true, merge curr with merged  
  5. Otherwise push the merged into mergedMeetings and set the new merged as the curr */
  for (let i = 1; i < len; i++) {
    curr = sorted[i]
    if (curr.startTime <= merged.endTime) {
      const latestEndT = Math.max(merged.endTime, curr.endTime)
      merged = { startTime: merged.startTime, endTime: latestEndT }
    } else {
      mergedMeetings.push(merged)
      merged = curr
    }
  }

  // 6. Push the last meeting left
  mergedMeetings.push(merged)

  return mergedMeetings
}

/*
Time Complexity - O(nlgn)
Space complexity - O(n)
*/

/* ---------------------------------------------------------------------------- */

const testCases = [
  [
    [
      { startTime: 5, endTime: 6 },
      { startTime: 6, endTime: 8 }
    ],
    [{ startTime: 5, endTime: 8 }]
  ],
  [
    [
      { startTime: 3, endTime: 5 },
      { startTime: 10, endTime: 12 },
      { startTime: 9, endTime: 10 },
      { startTime: 0, endTime: 1 },
      { startTime: 4, endTime: 8 }
    ],
    [
      { startTime: 0, endTime: 1 },
      { startTime: 3, endTime: 8 },
      { startTime: 9, endTime: 12 }
    ]
  ],
  [
    [
      { startTime: 1, endTime: 8 },
      { startTime: 2, endTime: 5 }
    ],
    [{ startTime: 1, endTime: 8 }]
  ],
  [
    [
      { startTime: 1, endTime: 3 },
      { startTime: 4, endTime: 8 }
    ],
    [
      { startTime: 1, endTime: 3 },
      { startTime: 4, endTime: 8 }
    ]
  ],
  [
    [
      { startTime: 1, endTime: 4 },
      { startTime: 2, endTime: 5 },
      { startTime: 5, endTime: 8 }
    ],
    [{ startTime: 1, endTime: 8 }]
  ]
]
for (const test of testCases) {
  console.log(JSON.stringify(mergeRanges(test[0])) === JSON.stringify(test[1]))
}
