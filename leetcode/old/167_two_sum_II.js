/*

Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.

The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.

You may assume that each input would have exactly one solution and you may not use the same element twice.

Input: numbers={2, 7, 11, 15}, target=9
Output: index1=1, index2=2
*/

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  var num2, id2;
  for (let i = 0; i < numbers.length - 1; i++) {
    num2 = target - numbers[i];
    id2 = numbers.slice(i+1).indexOf(num2);
    if (id2 !== -1) {
      return [i+1, id2+1+1+i];
    }
  }
};

//two point O(n) solution referenced from leetcode solutions
var twoSum  = function(numbers, target) {
  var l = 0, 
      r = numbers.length - 1, 
      cur = numbers[l] + numbers[r],
      res = [];
  while (l < r) {
    if (cur === target) {
      res.push(l+1, r+1);
      break;
    } else if (cur < target) {
      cur += numbers[l +1] - numbers[l];
      l++;
    } else {
      cur -= numbers[r] - numbers[r - 1];
      r--;
    }
  }
  return res;
}

// console.log(twoSum([2,3,4], 6));
console.log(twoSum([0,0,3,4], 0));
