/*
Given two arrays, write a function to compute their intersection.
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

//Solutin using hash map
const arrToHash = (arr) => {
  let res = {};
  for (let i = 0; i < arr.length; i++) {
    res[arr[i]] === undefined ? res[arr[i]] = 1 : res[arr[i]]++;
  }
  return res;
}

let intersect = (nums1, nums2) => {
  let res = [];
  let nums1Hash = arrToHash(nums1);
  let nums2Hash = arrToHash(nums2);

  for (let key in nums1Hash) {
    if (nums2Hash[key]) {
      nums1Hash[key] = nums2Hash[key] > nums1Hash[key] ? nums1Hash[key] : nums2Hash[key];
    } else {
      delete nums1Hash[key];
    }
  }
  
  for (let key in nums1Hash) {
    while (nums1Hash[key] > 0) {
      res.push(parseInt(key));
      nums1Hash[key]--;
    }
  }
  return res;
};

//solutin after sorting and using two pointers
intersect = (nums1, nums2) => {

  let short, long, res = [];
  nums1 = nums1.sort((a,b) => {return a -b});
  nums2 = nums2.sort((a,b) => {return a -b});

  if (nums1.length < nums2.length) {
    short = nums1;
    long = nums2;
  } else {
    long = nums1;
    short = nums2;
  }

  let l = 0, s = 0;
  while (s < short.length && long[l] !==undefined) {
    if (long[l] === short[s]) {
      res.push(short[s]);
      l++;
      s++;
    } else if (short[s] < long[l]) {
      s++;
    } else {
      l++;
    }
  }

  return res;
};
console.log(intersect([1,2,3,4,2,5,6], [2,2,2,3,7]));