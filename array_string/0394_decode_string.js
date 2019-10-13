/**
 * @param {string} s
 * @return {string}
 */

//First attempt iterative while loop. Doesn't work with nested brackets and multipliers like '3[a2[c]]'
// var decodeString = function(str) {
//   let i = 0,
//     charCode,
//     decoded = '',
//     multiplier,
//     substr
//   const len = str.length
//   while (i < len) {
//     charCode = str.charCodeAt(i)
//     if (charCode >= 97 && charCode <= 122) {
//       decoded += str[i]
//       i++
//       continue
//     } else if (charCode >= 48 && charCode <= 57) {
//       multiplier = str[i]
//       i++
//       while (charCode !== 91) {
//         charCode = str.charCodeAt(i)
//         if (charCode !== 91) {
//           multiplier += str[i]
//         }
//         i++
//       }
//       substr = ''
//       while (charCode !== 93) {
//         charCode = str.charCodeAt(i)
//         if (charCode !== 93) {
//           substr += str[i]
//         }
//         i++
//       }

//       multiplier = parseInt(multiplier)
//       while (multiplier > 0) {
//         decoded += substr
//         multiplier--
//       }
//     }
//   }
//   return decoded
// }

//Second Attempt with Stack
function decodeString(str) {
  const stack = []
  let subStr = '',
    multiplier = ''
  for (curr of str) {
    if (curr === '[') {
      stack.push(subStr)
      stack.push(parseInt(multiplier))
      multiplier = ''
      subStr = ''
    } else if (curr === ']') {
      multiplier = stack.pop()
      const prevStr = stack.pop()
      subStr = prevStr + subStr.repeat(multiplier)
      multiplier = ''
    } else if (Number.isInteger(parseInt(curr))) {
      multiplier += curr
    } else {
      subStr += curr
    }
  }

  return subStr
}

console.log(decodeString('2[aa]3[bc]ef'))
console.log(decodeString('can3[abn2[cc]]'))
console.log(decodeString('adfdb'))
console.log(decodeString(''))
console.log(decodeString('2[]dfsd'))
console.log(decodeString('2[a]3[b]4[c]5[d]'))
console.log(decodeString('0[ad]fd1[b]'))
