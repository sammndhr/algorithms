/* 
Time Complexity - O(n) + O(sum of length of each string)
- string.split(' ') time is length of string. So whichever is greater -
  O(n) or O(sum of string lengths) will be dominant. 

Space Complexity - O(n) 

Overview: 
 - Initialize hash. It'll hold split key values:
   {key --> {highest val, count of total no. pairs with same key},
    key2 --> {...}}
 - Iterate through array splitting string
 - Check if string key exists in hash
  - if false, set it to {highest: string val, count: 1}
  - if true, increment count of the existing hash[key] val,
    compare and set hash val to highest string
 - Iterate through hash keys, format key, val, count and push to result array


First Intuition:
 - Create hash with keys and values - "fake heap" of values
  (index 0 is biggest and swapping out values if new biggest appears).
  Basically, only heap top is heapified
 - When iterating through keys of hash, get the heap top or max and get array count
 - On discussing problem with Laurent, we came up better space optimized solution.
  Cause you only really need the max val and the total count. So why save every key val?
*/

/* Just use in built string comparisions? */
function getHigherString(first, second) {
  const firstLen = first.length,
    secondLen = second.length

  let i = 0

  while (i < firstLen && i < secondLen) {
    if (first[i] > second[i]) return first
    else if (second[i] > first[i]) return second
    else i++
  }

  return second
}

function solve(arr) {
  const hash = {},
    result = []

  for (const string of arr) {
    const [key, highest] = string.split(' ')

    if (!hash[key]) {
      hash[key] = { highest, count: 1 }
    } else {
      hash[key].count++
      const newHighest = getHigherString(hash[key].highest, highest)
      hash[key].highest = newHighest
    }
  }

  for (const key in hash) {
    const val = hash[key]
    result.push(`${key}:${val.count},${val.highest}`)
  }

  return result
}

// tests
const arr = ['key1 abcd', 'key2 zzz', 'key1 hello', 'key3 world', 'key1 hello']
const arr1 = [
  'this testcase',
  'would be',
  'sitting on',
  'a server',
  'somewhere out',
  'of reach',
  'of an',
  'ordinary man'
]

console.log(solve(arr))
console.log(solve(arr1))
