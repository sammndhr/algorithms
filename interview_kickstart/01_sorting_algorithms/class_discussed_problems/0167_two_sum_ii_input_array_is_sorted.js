/* 
First intuition: 
  1. Same as two sum. With hashmap it'll be O(n) time and space complexity.
  2. But we that doesn't use the information that it's sorted.
  3. Since it's sorted can time complexity be reduced to O(log(n))?
  4. Possible strategies:
     - Binary search?
     - pointers?

Strategy: Two pointers

Time Complexity — O(n)
Space Complexity — O(1)

Overview:
1. Initialize two pointers to start at start(left) and end(right). 
2. While (left < right)
  - If numbers[left] + numbers[right] > target, decrement right.
  - If numbers[left] + numbers[right] < target, increment left.
  - If numbers[left] + numbers[right] == target, return [left + 1, right + 1]
    Cause index starts at 1 (dunno y it's not 0)
*/

var twoSum = function (numbers, target) {
  let left = 0,
    right = numbers.length - 1

  while (left < right) {
    const possibleTarget = numbers[left] + numbers[right]

    if (possibleTarget === target) return [left + 1, right + 1]
    else if (possibleTarget > target) right--
    else left++
  }

  return [-1, -1]
}
