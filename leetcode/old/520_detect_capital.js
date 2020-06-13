/*
Given a word, you need to judge whether the usage of capitals in it is right or not.

We define the usage of capitals in a word to be right when one of the following cases holds:

All letters in this word are capitals, like "USA".
All letters in this word are not capitals, like "leetcode".
Only the first letter in this word is capital if it has more than one letter, like "Google".
Otherwise, we define that this word doesn't use capitals in a right way.
*/

/**
 * @param {string} word
 * @return {boolean}
 */

var checkLowerCase = function (word) {
  for (let i = 0; i < word.length; i++) {
    if (word[i].toLowerCase() !== word[i]) {
      return false;
    }
  } 
  return true;
}

var checkUpperCase = function (word) {
  for (let i = 0; i < word.length; i++) {
    if (word[i].toUpperCase() !== word[i]) {
      return false;
    }
  } 
  return true;
}

var detectCapitalUse = function(word) {
  if (word[0].toLowerCase() === word[0]) {
    return checkLowerCase(word.slice(1));
  } else {
    return (checkLowerCase(word.slice(1)) || checkUpperCase(word.slice(1)));
  }
};

console.log(detectCapitalUse("WORD"), "true");
console.log(detectCapitalUse("wRord"), "false");
console.log(detectCapitalUse("ord"), "true");
console.log(detectCapitalUse("wORD"), "false");
console.log(detectCapitalUse("Word"), "true");
console.log(detectCapitalUse("WoWrd"), "false");