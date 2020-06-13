/*
Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.
*/

/**
 * @param {string} s
 * @return {number}
 */
//Runtime ~= 175ms
var firstUniqChar = function(s) {
  var hash = {}, 
      keys = Object.keys(hash),
      possibleRes = [],
      idx = [];

  for (let i = 0; i < s.length; i++) {
    if (!hash[s[i]]) {
      hash[s[i]] = [1];
      hash[s[i]].push(i)
    } else {
      hash[s[i]][0]++;
    }
  }

  keys = Object.keys(hash);
  
  for (let i = 0; i < keys.length; i++) {
    if (hash[keys[i]][0] === 1) {
      idx.push(hash[keys[i]][1]);
    }
  }

  idx = idx.sort((a,b) => {return a-b;});

  if (idx.length === 0) {
    return -1;
  }
  return idx[0]; 
};

//Runtime ~= 165ms
var firstUniqChar = function(s) {
  var hashCount = {}, 
      keys, 
      possibleRes = [], 
      idx = [];

  for (let i = 0; i < s.length; i++) {
    if (!hashCount[s[i]]) {
      hashCount[s[i]] = 1;
    } else {
      hashCount[s[i]]++;
    }
  }

  keys = Object.keys(hashCount);

  for (let i = 0; i < keys.length; i++) {
    if (hashCount[keys[i]] === 1) {
      possibleRes.push(keys[i]);
    }
  }

  for (let i = 0; i < possibleRes.length; i++) {
    idx.push(s.indexOf(possibleRes[i]));
  }

  idx = idx.sort((a,b) => {return a-b;});
  if (idx.length === 0) {
    return -1;
  }
  return idx[0]; 
};

//using indexOf and lastIndexOf from leetcode discussions. Runtime ~= 208ms
var firstUniqChar = function(s) {
  for(i=0;i<s.length;i++){
    if (s.indexOf(s[i])===s.lastIndexOf(s[i])){
      return i;
    } 
  }
  return -1;
};

console.log(firstUniqChar("aastdrsptr"));