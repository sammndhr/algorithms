/* 
Two Pointer solution

Time Complexity - O(n^2)
Space Complexity - O(n^2) from possible number of triplets + some space from js native sort

Overview: 
 - Sort the array
 - Iterate through elements calling threeSum(i) on +ve and unique elements
 - threeSum has two pointers low and high with start, direction: i+1 --> <-- end
 - So until low and high don't meet, move pointers & check values at i, low, high adding to result if sum is 0
*/

function findZeroSum(arr) {
  const triplets = [],
    len = arr.length,
    end = arr.length - 1

  arr = arr.sort((a, b) => a - b)

  threeSum(0) // [1]

  for (let i = 1; i < len; i++) {
    const first = arr[i]
    if (first > 0) break // [2]
    if (arr[i - 1] !== arr[i]) threeSum(i)
  }

  function threeSum(i) {
    let low = i + 1,
      high = end

    while (low < high) {
      const sum = arr[i] + arr[low] + arr[high]
      // [3]
      if (sum < 0 || (low > i + 1 && arr[low] === arr[low - 1])) low++
      else if (sum > 0 || (high < end && arr[high] === arr[high + 1])) high--
      else triplets.push([arr[i], arr[low++], arr[high--]])
    }
  }

  return triplets
}

/* 
Notes: 
[1] call for i = 0 once outside and start i = 1, so it doesn't need to be checked in every iteration
[2] threeSum function pointers go from i+1 --> <-- end. So +ve nums will be already be checked in previous iterations.
    Also you can't get three sum with +ve nums only
[3] threeSum comparisons:
  -  if sum is < 0 or low val is duplicate, low pointer needs to be bigger. Eg for sum, -8 + 2 + 1 = -5
  -  else if sum is > 0 or high val is duplicate, higher pointer needs to be smaller. Eg for sum, -1 + (-2) + 8 = 5
  -  else sum is 0 so push triplet to triplets

------------------------------------------------------------------------------------------------------------------
*/

/* 
--------------------------------------------------------------------------------------------
Slightly optmized version using hashmap (sets). Doesn't check already checked first values
Time Complexity - O(n^2)
Space Complexity - O(n^2) from the 'seen' set. Same as possible number of triplets. 
*/

function findZeroSumHash(arr) {
  const triplets = [],
    len = arr.length,
    found = new Set(),
    duplicateVals = new Set()

  for (let i = 0; i < len; i++) {
    const seen = new Set(),
      first = arr[i]
    if (duplicateVals.has(first)) continue

    duplicateVals.add(first)
    for (let j = i + 1; j < len; j++) {
      const second = arr[j],
        third = -first - second

      if (seen.has(third)) {
        const min = Math.min(first, second, third),
          max = Math.max(first, second, third),
          stringPair = `${min},${max}`

        if (!found.has(stringPair)) {
          found.add(stringPair)
          triplets.push([first, second, third].join(','))
        }
      }

      seen.add(second)
    }
  }
  return triplets
}

console.log(findZeroSum([-1, 0, 1, 2, -1, -4]))
console.log(findZeroSum([-1, 0, 1]))
