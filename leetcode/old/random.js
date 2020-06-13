var findShortestSubArray = function(nums) {
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

console.log(findShortestSubArray([1,2,3,1,1,6,7,5,5,5]));
console.log(findShortestSubArray([1,2,2,3,1,4,2]));