/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */

var convert = function(s, numRows) {
  if (numRows <= 1) return s
  let i = 0,
    col = 0,
    row = 0,
    res = ''
  const len = s.length,
    zigzag = []

  for (let j = 0; j < numRows; j++) {
    zigzag.push([])
  }

  while (i < len) {
    while (row < numRows && i < len) {
      zigzag[row][col] = s[i]
      i++
      row++
    }
    row--
    while (row > 0 && i < len) {
      col++
      row--
      zigzag[row][col] = s[i]
      i++
    }
    row++
  }

  zigzag.forEach(row => {
    row.forEach(letter => {
      if (letter) res += letter
    })
  })

  return res
}
console.log(convert('hellonooby', 3))

//Time complexity - O(N) where N is the length of the string
//space complexity - size of the matrix + length of the res string
/* 
h - number of rows
N/h
*/
