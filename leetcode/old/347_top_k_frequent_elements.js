/*Given a non-empty array of integers, return the k most frequent elements.
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

const arrToHash = (arr) => {
  let res = {};
  for (let i = 0; i < arr.length; i++) {
    (res[arr[i]] === undefined) ? res[arr[i]] = 1 : res[arr[i]]++;
  }
  return res;
}

const sortByValues = (obj) => {
  const keys = Object.keys(obj); 
  return keys.sort(function(a,b){return obj[b]-obj[a]});
}

let topKFrequent = (nums, k) => {
  const numsHash =  arrToHash(nums);
  let res = sortByValues(numsHash).slice(0, k);
  res = res.map((val, i) => { 
    return parseInt(val);
  });
  return res;
};

//condensed version
topKFrequent = (nums, k) => {
  let obj = {};
  let res = [];
  nums.forEach((val) => {
    obj[val]= (obj[val]+1)|| 1;
  });
  Object.keys(obj).sort((a,b) => { return obj[b] - obj[a]}).slice(0,k).forEach((val) => {res.push(parseInt(val))});
  return res;
};


console.log(topKFrequent([1,1,1,2,2,3], 2));