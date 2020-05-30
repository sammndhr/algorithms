// https://www.interviewcake.com/question/javascript/word-cloud?course=fc1&section=hashing-and-hash-tables

//Mine. Ignores case and converts words to lowercase
class WordCloudData {
  constructor(str) {
    this.wordsToCounts = new Map()
    this.populateWordsToCounts(str)
  }

  // valid characters are apostrophes and latin alphabets
  isValidChar(char) {
    if (typeof char !== 'string') return false
    const charCode = char.toLowerCase().charCodeAt(0)
    if (charCode === 39 || this.isLetter(char)) return true
    else return false
  }

  isLetter(char) {
    if (typeof char !== 'string') return false
    const charCode = char.toLowerCase().charCodeAt(0)
    if (charCode >= 97 && charCode <= 122) return true
    else return false
  }

  // Count the frequency of each word
  populateWordsToCounts(str) {
    const strLen = str.length
    let currWordArr = []

    for (let i = 0; i <= strLen; i++) {
      const currChar = str[i],
        isCharValid = this.isValidChar(currChar)
      /* If currChar is a not valid(like standalone or trailing punctuation)
      and we've already handled the word before it, skip it */
      if (!isCharValid && currWordArr.length === 0) continue
      /*
      If currChar is valid (apostrophes and letters) or if it is a hyphen surrounded by letters,
        consider it a letter and push into currWordArr
      Otherwise we've reached end of word
        1. Create lowercase string from currWordArr and check if it exists in the map
        2. Get and set the word count accordingly
        3. Reset currWordArr to be empty
      */
      if (isCharValid || (currChar === '-' && this.isLetter(str[i + 1]))) {
        currWordArr.push(currChar)
      } else {
        const currWord = currWordArr.join('').toLowerCase()

        const wordCount = this.wordsToCounts.has(currWord)
          ? this.wordsToCounts.get(currWord) + 1
          : 1

        this.wordsToCounts.set(currWord, wordCount)
        currWordArr = []
      }
    }
  }
}

/*
n = length of string
Time Complexity - O(n)
Space complexity - O(n) + k (length of current word. comes from currWordArr). Can be refactored to use a pointer
*/

/* ---------------------------------------------------------------------------- */

// Tests

const testCases = [
  [
    'I like cake. i like cake',
    new Map([
      ['i', 2],
      ['like', 2],
      ['cake', 2]
    ])
  ],
  [
    'Mmm...mmm...decisions...decisions',
    new Map([
      ['mmm', 2],
      ['decisions', 2]
    ])
  ],
  ['cake-is-da-best', new Map([['cake-is-da-best', 1]])],
  [
    'Chocolate cake for dinner?! And pound cake for dessert?! Yay!!',
    new Map([
      ['chocolate', 1],
      ['cake', 2],
      ['for', 2],
      ['dessert', 1],
      ['and', 1],
      ['pound', 1],
      ['dinner', 1],
      ['yay', 1]
    ])
  ],
  [
    `We came, we saw, we conquered...then we ate Bill's (Mille-Feuille) cake."
  "The bill came to five dollars.`,
    new Map([
      ['we', 4],
      ['came', 2],
      ['saw', 1],
      ['conquered', 1],
      ['then', 1],
      ['ate', 1],
      ["bill's", 1],
      ['mille-feuille', 1],
      ['cake', 1],
      ['the', 1],
      ['bill', 1],
      ['to', 1],
      ['five', 1],
      ['dollars', 1]
    ])
  ],
  [
    'Hey- wait',
    new Map([
      ['hey', 1],
      ['wait', 1]
    ])
  ]
]

function isMapsEqual(map1, map2) {
  if (map1.size !== map2.size) {
    return false
  }
  for (let [key, val] of map1) {
    const testVal = map2.get(key)
    if (testVal !== val || (testVal === undefined && !map2.has(key))) {
      return false
    }
  }
  return true
}

for (const test of testCases) {
  const worldCloud = new WordCloudData(test[0])
  console.log(worldCloud.wordsToCounts)
  console.log(isMapsEqual(worldCloud.wordsToCounts, test[1]))
}
