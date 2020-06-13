/*
Given an array of integers and an integer k, find out whether there are two distinct indices i and j in the array such that nums[i] = nums[j] and the absolute difference between i and j is at most k.*/

var containsNearbyDuplicate = function(nums, k) {
  const numsHash = {};
  for (let i = 0; i < nums.length; i++) {
    if (numsHash[nums[i]] !== undefined) {
      let diff = Math.abs(numsHash[nums[i]] - i);
      if (diff <=k) {
        return true;
      }
    } 
    numsHash[nums[i]] = i;
  }   
  return false;
};

//using set instead of hashMap
var containsNearbyDuplicate = function(nums, k) {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (i > k) { 
      set.delete(nums[i-k-1]); //delete nums before i-k so only  need to check k nums before num at i
    }
    if (set.has(nums[i])) {
      return true; //if set already has num return true
    }
    set.add(nums[i]); 
  }   
    
  return false;
};
console.log(containsNearbyDuplicate([1], 1));
console.log(containsNearbyDuplicate([1,2,3,5,4,5], 3));
console.log(containsNearbyDuplicate([-1, -1], 1));
