from random import randint
from typing import List


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        jthSmallest = len(nums) - k

        return self.quickSelect(nums, 0, len(nums) - 1, jthSmallest)

    def quickSelect(self, nums: List[int], start: int, end: int, jthSmallest: int) -> int:

        pivot = self.partition(nums, start, end)

        if (pivot == jthSmallest):
            return nums[pivot]
        elif (jthSmallest < pivot):
            return self.quickSelect(nums, start, pivot - 1, jthSmallest)
        else:
            return self.quickSelect(nums, pivot + 1, end, jthSmallest)

    def partition(self, nums: List[int], start: int, end: int) -> int:
        randomIndex = randint(start, end)

        self.swap(nums, randomIndex, start)

        pivot = nums[start]

        smaller = start

        for bigger in range(start + 1, end + 1):
            if nums[bigger] < pivot:
                smaller += 1
                self.swap(nums, smaller, bigger)

        self.swap(nums, start, smaller)

        return smaller

    def swap(self, nums: List[int], i: int, j: int) -> None:
        temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp


print(Solution().findKthLargest([4, 1, 2, 11], 2))
