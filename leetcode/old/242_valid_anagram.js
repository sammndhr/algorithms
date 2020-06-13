/*
Given two strings s and t, write a function to determine if t is an anagram of s.

For example,
s = "anagram", t = "nagaram", return true.
s = "rat", t = "car", return false.
*/


/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  s = s.split('').sort();
  t = t.split('').sort();
  
  var j = 0;
  while (i<s.length) {
    if (s[i] !== t[i]) {
      return false;
    }
    i++;
  }
  return true;
};

//Runtime too long with two for loops. 1055ms vs 138ms
// var isAnagram = function(s, t) {
//   if (s.length !== t.length) {
//     return false;
//   }
//   var count = 0;
//   for (let i = 0; i < s.length; i++) {
//     for (let j = 0; j < t.length; j++) {
//       if (s[i] === t[j]) {
//         count++;
//         t = t.slice(0, j) + t.slice(j+1, t.length);
//         break;
//       }
//     }
//   }
//   if (count === s.length) {
//     return true;
//   } else {
//     return false;
//   }
// };

console.log(isAnagram("abc", "bac"));
console.log(isAnagram("a", "b"));
console.log(isAnagram("ca", "bc"));
console.log(isAnagram("aacc", "ccac"));
console.log(isAnagram("aacc", "caac"));