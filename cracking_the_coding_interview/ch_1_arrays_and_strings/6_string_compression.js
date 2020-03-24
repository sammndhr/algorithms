function compressString(str) {
  let currChar = str[0],
    currCharCount = 0
  const compressed = [] //Don't concat to string because string concatenation operates in O(n^2) time

  for (const char of str) {
    if (char === currChar) currCharCount++
    else {
      compressed.push(currChar, currCharCount)
      currCharCount = 1
      currChar = char
    }
  }

  compressed.push(currChar, currCharCount)

  const compressedStr = compressed.join('')

  return compressedStr.length < str.length ? compressedStr : str
}

/*
n = length of string
Time Complexity - O(n)
Space complexity - O(n)
*/

/* ---------------------------------------------------------------------------- */

// Optimized. Referenced from book.

function compress(str) {
  const finalLen = countCompression(str),
    strLen = str.length
  if (finalLen >= strLen) return str

  let compressed = [],
    currCharCount = 0

  for (let i = 0; i < strLen; i++) {
    currCharCount++

    if (i + 1 >= strLen || str[i] !== str[i + 1]) {
      compressed.push(str[i], currCharCount)
      currCharCount = 0
    }
  }
  return compressed.join('')
}

function countCompression(str) {
  let compressedLen = 0,
    currCharCount = 0

  for (let i = 0; i < str.length; i++) {
    currCharCount++
    if (i + 1 >= str.length || str[i] !== str[i + 1]) {
      compressedLen += 1 + currCharCount.toString().length
      currCharCount = 0
    }
  }
  return compressedLen
}

// tests
const testCases = [
  ['aabcccccaaa', 'a2b1c5a3'],
  ['a', 'a'],
  ['aaaaaaaaaa', 'a10']
]

for (const test of testCases) {
  const result = compressString(test[0]),
    result1 = compress(test[0])
  console.log(result === test[1], test[0], result, 'compressString')
  console.log(result1 === test[1], test[0], result1, 'compress')
}
