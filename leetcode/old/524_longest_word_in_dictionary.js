/**
 * @param {string} s
 * @param {string[]} d
 * @return {string}
 */

var alphabets = [...Array(26)].map((val, i) => {
  return String.fromCharCode(i + 65).toLowerCase();
});

const sToHash = (str) => {
  const sHash = {};
  for (let i = 0; i < str.length; i++) {
    !sHash[str[i]] ? sHash[str[i]] = 1 : sHash[str[i]]++;
  }
  return sHash;
};


const checkValidSubstr = (s, strHash, word) => {
  for (let i = 0; i < word.length; i++) {
    if (!strHash[word[i]]) {
      return false;
    } else if (s.indexOf(word[i]) !== -1){
      s = s.slice(s.indexOf(word[i])+1);
    } else {
      return false;
    }
  }
  return true;
};

const findSmallestLex = (arr) => {
  let copy = arr.slice(0);
  const inner = (str1, str2) => {
    for (let i = 0; i < str1.length; i++) {
      return (alphabets.indexOf(str1[i]) < alphabets.indexOf(str2[i]) ?  str1:  str2);
    }
  };
  while (copy.length > 1) {
    let compared = inner(copy[0], copy[1]);
    copy = [compared].concat(copy.slice(2));
  }

  return copy[0];
};

const findLongestWord = (s, d) => {
  const sHash = sToHash(s);
  const resArr = [];
  let maxLen = 0;
  let max = [];
    
  for (let i = 0; i < d.length; i++) {
    if (checkValidSubstr(s, sHash, d[i])) {
      resArr.push(d[i]);
    }
  }

  for (let i = 0; i < resArr.length; i++) {
    const len = resArr[i].length;
    if ( len > maxLen) {
      max = [resArr[i]];
      maxLen = len;
    } else if (len === maxLen) {
      max.push(resArr[i]);
    }
  }

  if (max.length ===1) {
    return max[0];
  } else if (max.length === 0) {
    return "";
  } else {
    return findSmallestLex(max);
  }
};

console.log(findLongestWord("apple",["zxc","vbn"]));
console.log(findLongestWord("apple",["app", "ppl","zxc","vbn", "ppal"]));
