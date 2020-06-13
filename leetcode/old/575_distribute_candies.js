/**
 * @param {number[]} candies
 * @return {number}
 */

/* Unnecessary calcution - Solution Takes Too Long
var distributeCandies = function(candies) {
  var candyCount = {},
      totalCandies = 0,
      sister = {types: [], count: 0};
  for (let i = 0; i < candies.length; i++) {
    if (!candyCount[candies[i]]) {
      candyCount[candies[i]] = 1;
    } else {
      candyCount[candies[i]]++;
    }
    totalCandies++;
  }
  
  if (Object.keys(candyCount).length >= totalCandies/2) {
    return totalCandies/2;
  } else {  
    for (let j = 0; j < Object.keys(candyCount).length; j++) {
      if (sister.count === totalCandies/2) {
        break;
      } 
      sister.types.push(Object.keys(candyCount)[j]);
      sister.count++;
    }
  }

  return sister.types.length;
}*/

var distributeCandies = function(candies) {
  var candyCount = {},
      totalCandies = 0;
      
  for (let i = 0; i < candies.length; i++) {
    if (!candyCount[candies[i]]) {
      candyCount[candies[i]] = 1;
    } else {
      candyCount[candies[i]]++;
    }
    totalCandies++;
  }
  
  if (Object.keys(candyCount).length >= totalCandies/2) {
    return totalCandies/2;
  } else { 
      return Object.keys(candyCount).length;
  }
  return sister.types.length;
}

console.log(distributeCandies([1,2,3,1,1,3,5,6,1,2]));
console.log(distributeCandies([1,1,2,3]));