// https://www.interviewcake.com/question/javascript/reverse-words?course=fc1&section=array-and-string-manipulation

const { swapArrInPlace } = require('../../utils')

//Helper. Reverses characters in given range in array
function reverseCharacters(arrayOfChars, leftIndex, rightIndex) {
  let i = leftIndex,
    j = rightIndex
  while (i < j) {
    swapArrInPlace(arrayOfChars, i, j)
    i++
    j--
  }
}

// Decode the message by reversing the words
function reverseWords(message) {
  const len = message.length
  /* 
  Reversing the array will get the words in order in the array but reversed. 
  Eg: [cake eat i] --> [i tae ekac]
  */
  reverseCharacters(message, 0, len - 1)

  /* 
  Now we have to iterate through the array one more time to reverse the word.
  We'll keep track of the start of the word that needs to be reversed with currStartIndex
  */
  let currStartIndex = 0

  for (let i = 0; i <= len; i++) {
    // if the current character is a space or the last character, reverse the word
    if (message[i] === ' ' || i === len) {
      reverseCharacters(message, currStartIndex, i - 1)
      currStartIndex = i + 1
    }
  }
}

/*
Time Complexity - O(n)
Space complexity - O(1)
*/

/* ---------------------------------------------------------------------------- */

const testCases = [
  ['vault', 'vault'],
  ['', ''],
  ['thief cake', 'cake thief'],
  [
    'cake down upside pineapple eat to want I',
    'I want to eat pineapple upside down cake'
  ]
]

for (const test of testCases) {
  const arr = test[0].split('')
  reverseWords(arr)
  console.log(arr.join('') === test[1])
}
