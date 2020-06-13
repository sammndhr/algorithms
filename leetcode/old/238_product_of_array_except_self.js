/**
 * @param {number[]} nums
 * @return {number[]}
 */
var withDiv = function(nums) {
  let resArr = [], res = 1;
  for (let i = 0; i < nums.length; i++) {
    res *=nums[i];
  }
  for (let i = 0; i < nums.length; i++) {
    resArr[i] = res/nums[i]
  }
  console.log(res);
  return resArr;
};

var productExceptSelf = function(nums) {
  let len = nums.length;
  let right = {};
  let left = {};
  let mult = 1;
  let result = [];

  for (let i = 0; i < len; i++) {
    mult *= nums[i];
    right[i] = mult;
  }
  
  mult = 1;
  for (let i = len - 1; i > -1; i--) {
    mult *= nums[i];
    left[i] = mult ;
  }

  for (let i = 0; i < len; i++) {
    let r = right[i-1];
    let l = left[i+1];
    if (r === undefined) {
      result[i] = l;
    } else if (l === undefined) {
      result[i] = r;
    } else {
      result[i] = r*l;
    }
  }
  return result;
};


console.log(productExceptSelf([0,0]));
console.log(productExceptSelf([1,2,3,4]));
console.log(productExceptSelf([1,2,3,4,5]));