from typing import List


def swap(arr, i, j):
    temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp


class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        low = 0
        high = len(nums) - 1
        i = 0
        while i <= high:
            if nums[i] == 0:
                swap(nums, i, low)
                i += 1
                low += 1
            elif nums[i] == 2:
                swap(nums, i, high)
                high -= 1
            else:
                i += 1


list = [1, 2, 0, 1, 0, 2, 0, 0]

Solution().sortColors(list)

print(list)
