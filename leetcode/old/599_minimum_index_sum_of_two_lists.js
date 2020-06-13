/*
Suppose Andy and Doris want to choose a restaurant for dinner, and they both have a list of favorite restaurants represented by strings.

You need to help them find out their common interest with the least list index sum. If there is a choice tie between answers, output all of them with no order requirement. You could assume there always exists an answer
*/

/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */

const arrToHash = function(arr) {
  const hash = {};
  for (let i = 0; i < arr.length; i++) {
    hash[arr[i]] = i;
  }
  return hash;
}

const findRestaurant = function(list1, list2) {
  const inner = function(list1, list2) {  
    const hash1 = arrToHash(list1),
          hash2 = arrToHash(list2),
          common = {},
          resArr = [];
    let idx;

    for (let i = 0; i < list1.length; i++) {
      if (hash2[list1[i]] !== undefined) {
        common[list1[i]] = hash2[list1[i]] + hash1[list1[i]];
      }
    }

    const sorted = Object.keys(common).sort((a, b) => {return common[a] - common[b]});
    
    idx = 0;
    resArr.push(sorted[idx]);

    while (common[sorted[idx]] === common[sorted[idx+1]] && idx < sorted.length-1){
      resArr.push(sorted[idx+1]);
      idx++;
    }

    return resArr;
  }
  
  const result = (list1 < list1) ? inner(list1, list2) : inner(list2, list1);
  return result;
};


console.log(findRestaurant(["Shogun", "Tapioca Express", "Burger King", "KFC"],[ "Tapioca Express","Piatti", "The Grill at Torrey Pines", "Hungry Hunter Steakhouse", "Shogun"]));
console.log(findRestaurant(["Shogun","Tapioca Express","Burger King","KFC"], ["KFC","Burger King","Tapioca Express","Shogun"]));
