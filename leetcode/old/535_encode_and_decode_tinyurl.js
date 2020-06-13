/*TinyURL is a URL shortening service where you enter a URL such as https://leetcode.com/problems/design-tinyurl and it returns a short URL such as http://tinyurl.com/4e9iAk.

Design the encode and decode methods for the TinyURL service. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.
*/

/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */
let urlMap = {};

const generateAlphabets = () => {
  return ([...Array(26)].map((val, i) => {
    return String.fromCharCode(i + 65).toLowerCase();
  }));
}

const generateInts = () => {
  return ([...Array(10)].map((val, i) => {
    return i;
  }));
}

var encode = (longUrl) => {
  let key = "";
  let i = 6;
  let chars = [...generateAlphabets(), ...generateInts()];
  let len = chars.length;
  let random;
  while (i > 0) {
    random = Math.floor(Math.random() * len);
    key += chars[random];
    i--;
  }

  if (!urlMap[key]) {
    urlMap[key] = longUrl;
  } else {
    return encode(longUrl);
  }
  return `http://tinyurl.com/${key}`;
};
/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
let decode = (shortUrl) => {
  let key = shortUrl.split('.com/')[1];
  return urlMap[key];
};

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */

console.log(encode("https://discuss.leetcode.com/topic/97183/javascript-solution"));
 console.log(decode(encode("https://discuss.leetcode.com/topic/97183/javascript-solution")));
console.log(urlMap);
 