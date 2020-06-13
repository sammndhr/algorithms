/*
Given scores of N athletes, find their relative ranks and the people with the top three highest scores, who will be awarded medals: "Gold Medal", "Silver Medal" and "Bronze Medal".
*/

/**
 * @param {number[]} nums
 * @return {string[]}
 */
var findRelativeRanks = function(nums) {
  var sorted = nums.slice(0).sort((a,b) => {return b-a;});
  var hash = {};
  var res = [];
  
  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      hash[sorted[i]] = "Gold Medal"; 
    } else if (i === 1) {
      hash[sorted[i]] = "Silver Medal"; 
    } else if (i === 2) {
      hash[sorted[i]] = "Bronze Medal";
    } 
  }
  //splitting for loop makes it slightly faster 149 --> 146ms. Worth?
  for (let i = 3; i < sorted.length; i++) {
    hash[sorted[i]] = (i+1)+"";
  }

  for (let i = 0; i < nums.length; i++) {
    res.push(hash[nums[i]]);
  }

  return res;
};

console.log(findRelativeRanks([5,4,3,2,1]));
console.log(findRelativeRanks([10,3,8,9,4])); 