var arrayPairSum = function(nums) {
  var sortedArr = nums.sort(function(a, b) {
    return a-b;
  });
  var sum = 0;
  for (let i =0; i< sortedArr.length - 1; i+=2) {
   sum += Math.min(sortedArr[i], sortedArr[i+1]);
  }
  return sum;
};

console.log(arrayPairSum([3,5,-1,11,2, 1,2]));