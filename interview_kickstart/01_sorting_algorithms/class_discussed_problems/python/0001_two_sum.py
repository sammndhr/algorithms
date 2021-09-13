from typing import List


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        nums_dict = {}

        for i in range(len(nums)):
            complement = target - nums[i]

            if complement in nums_dict:
                return [nums_dict[complement], i]
            nums_dict[nums[i]] = i


print(Solution().twoSum([1, 3, 4, 5, 6, 7], 4))
