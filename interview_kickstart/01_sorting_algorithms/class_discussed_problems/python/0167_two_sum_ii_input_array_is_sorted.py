from typing import List


class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        left = 0
        right = len(numbers) - 1

        while left < right:
            possibleTarget = numbers[left] + numbers[right]

            if possibleTarget == target:
                return [left + 1, right + 1]
            elif possibleTarget > target:
                right -= 1
            else:
                left += 1

        return [-1, -1]


print(Solution().twoSum([1, 2, 3, 4, 7, 11], 7))
