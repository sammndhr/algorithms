/*
Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie. Each child i has a greed factor gi, which is the minimum size of a cookie that the child will be content with; and each cookie j has a size sj. If sj >= gi, we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.

Note:
You may assume the greed factor is always positive. 
You cannot assign more than one cookie to one child.
*/
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
  g = g.sort((a, b) => {return a - b; });
  s = s.sort((a, b) => {return a - b; });
  var i = 0;
  var j = 0;
  while (i<g.length && j<s.length) {
    if (g[i] <= s[j]) {
      i++;
      j++;
    } else {
      j++;
    }
  }
  return i;
};

console.log(findContentChildren([1,2],[1,2,3]));
console.log(findContentChildren([4,5,6,2,1,3], [1,2,3]));
