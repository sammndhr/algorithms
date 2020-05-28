function URLify(string) {
  const arr = [],
    len = string.length

  for (const char of string) {
    if (arr.length === len) break // You can also use string.trim() to trim beginning and ending whitespaces.
    if (char === ' ') arr.push('%', '2', '0')
    else arr.push(char)
  }
  return arr.join('')
}

/*
Space Complexity: O(n).  arr = [] 
Time Complexity: O(n)
*/

/* ---------------------------------------------------------------------------- */

function URLifyConstantSpace(string, trueLength) {
  let spaceCount = 0

  for (let i = 0; i < trueLength; i++) {
    if (string[i] === ' ') spaceCount++
  }

  let index = trueLength + spaceCount * 2 //string.length works too

  for (let i = trueLength - 1; i >= 0; i--) {
    if (string[i] === ' ') {
      string[index - 1] = '0'
      string[index - 2] = '2'
      string[index - 3] = '%'
      index = index - 3
    } else {
      string[index - 1] = string[i]
      index--
    }
  }

  return string.join('')
}

/*
Space Complexity: O(1)
Time Complexity: O(n)
*/

//tests
const string = 'Mr John Smith    '
console.log(URLifyConstantSpace(string.split(''), 13) === 'Mr%20John%20Smith')
console.log(URLify(string) === 'Mr%20John%20Smith')
