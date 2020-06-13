/*
Given a non-empty array of non-negative integers nums, the degree of this array is defined as the maximum frequency of any one of its elements.

Your task is to find the smallest possible length of a (contiguous) subarray of nums, that has the same degree as nums.*/
/**
 * @param {number[]} nums
 * @return {number}
 */

//my solution
let findShortestSubArray = (nums) => {
  const numsHash = {};
  let possibles;
  let max = 0;
  let min = 0;
  for (let i = 0; i < nums.length; i++) {
    numsHash[nums[i]] = (numsHash[nums[i]] === undefined) ? 1 : numsHash[nums[i]] + 1;
    max = Math.max(numsHash[nums[i]], max);
  }
  possibles = Object.keys(numsHash).filter((key) => {
    return numsHash[key] >= max;
  });
  
  for (let i = 0; i < possibles.length; i++) {
    let val = parseInt(possibles[i]);
    let subArrLen = nums.lastIndexOf(val) - nums.indexOf(val);
    if (i === 0) {
      min = subArrLen;
    } else {
      min = Math.min(min, subArrLen);
    }
  }
  return min+1;
};

//redone solution after looking at leetcode solution. O(n) time complexity
findShortestSubArray = (nums) => {
  const left = {};
  const right = {};
  const count = {};
  let res, 
      degree;

  for (let i = 0; i < nums.length; i++) {
    if (left[nums[i]] === undefined) {
      left[nums[i]] = i;
      count[nums[i]] = 1;
    } else {
      count[nums[i]]++;
    }
    right[nums[i]] = i;
  }

  res = nums.length;

  degree = Math.max.apply(Math, Object.values(count));
  for (let key in count) {
    if (count[key] === degree) {
      res = Math.min(res, right[key] - left[key] + 1);
    }
  }
  return res;
}
console.log(findShortestSubArray([1,2,3,1,1,6,7,5,5,5]));
console.log(findShortestSubArray([1,2,2,3,1,4,2]));