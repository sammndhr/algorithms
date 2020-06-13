/*Given a roman numeral, convert it to an integer.
Input is guaranteed to be within the range from 1 to 3999.
*/

/*var romanSymbols = "I V X L C D M";
var romanArr = romanSymbols.split(' ');
var romanHash = function(syms) {
  var res = {};
  for (let i = 0; i < syms.length; i++) {
    switch(syms[i]) {
      case "I":
        res[syms[i]] = 1;
        break;
      case "V":
        res[syms[i]] = 5;
      break;
      case "X":
        res[syms[i]] = 10;
      break;
      case "L":
        res[syms[i]] = 50;
      break;
      case "C":
        res[syms[i]] = 100;
      break;
      case "D":
        res[syms[i]] = 500;
      break;
      case "M":
        res[syms[i]] = 1000;
      break;
      default:
        return "Please enter a valid symbol array."
    }
  }  
  return res;
}*/
// var romans = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
/**
 * @param {string} s
 * @return {number}
 */

// Practice recursive solution
// var romanToInt = function(s) {
//   const roman = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
//   const recurse = (str, int) => {
//     let len = str.length;
//     if (str.length === 0) {
//       return int;
//     }
//     if (roman[str[0]] < roman[str[1]]) {
//       int += roman[str[1]] - roman[str[0]];  
//       temp = str.slice(2);
//     } else {
//       int += roman[str[0]];
//       temp = str.slice(1);
//     }
//     return recurse(temp, int);
//   }
//   return recurse(s, 0);
// };

var romanToInt = function(s) {
  const roman = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 , 0: 0};
  const arr = s.split('');
  let res = 0;

  for (let i = 0; i < arr.length; i++) {
    if (roman[arr[i]] < roman[arr[i+1]] && roman[arr[i]] !==0) {
      res += roman[arr[i+1]] - roman[arr[i]]; 
      arr[i+1] = 0;
    } else {
      res += roman[arr[i]];
    }
  }
  
  // from leetcode discussion
  // for (let i = 0; i < arr.length; i++) {
  //   if (roman[arr[i]] < roman[arr[i+1]]) {
  //     res -= roman[arr[i]]; 
  //   } else {
  //     res += roman[arr[i]];
  //   }
  // }

  return res;
};
console.log(romanToInt("MCMIV"), 1904);
console.log(romanToInt("CD"), 400);
console.log(romanToInt("XL"), 40);
console.log(romanToInt("XC"), 90);
console.log(romanToInt("IXM"), 989);
console.log(romanToInt("MCDLXXVI"), 1476);
console.log(romanToInt("MCMXCVI"), 1996);


