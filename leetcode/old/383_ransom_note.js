/*
Given an arbitrary ransom note string and another string containing letters from all the magazines, write a function that will return true if the ransom note can be constructed from the magazines ; otherwise, it will return false.

Each letter in the magazine string can only be used once in your ransom note.
*/

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
  if (ransomNote.length === 0) {
    return true;
  }
  var arrToHash = function(string) {
    var hash = {};
    for (let i = 0; i < string.length; i++) {
      if (!hash[string[i]]) {
        hash[string[i]] = 1;
      } else {
        hash[string[i]]++;
      }
    }    
    return hash;
  }
  var ransomHash = arrToHash(ransomNote);
  var ransomHKeys = Object.keys(ransomHash);
  var magazineHash = arrToHash(magazine);
  var check = false;

  for (let i = 0; i < ransomHKeys.length; i++) {
    if (ransomHash[ransomHKeys[i]] <= magazineHash[ransomHKeys[i]]) {
      check = true;
    } else {
      check = false;
      return check;
    }
  }
  return check;
};

console.log(canConstruct("stirngggg", "aasstirngggg"));
console.log(canConstruct("string", "string"));
console.log(canConstruct("", "string"));
console.log(canConstruct("string", "saaa"));
console.log("string", "saaa");
console.log(canConstruct("ab", "saaa"));
console.log(canConstruct("ab", "aaaaabbbbbccc"));
console.log(canConstruct("a", "bbbbbccc"));
console.log(canConstruct("aabbccsdfaa", "abcbcasdfasabbbbbccc"));