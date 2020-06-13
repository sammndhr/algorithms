/*
 * Complete the merger_first_into_second function below.
 */
function merger_first_into_second(arr1, arr2) {
  const n = arr1.length
  let i = n - 1,
    j = n - 1,
    k = 2 * n - 1

  while (i > -1 && j > -1) {
    if (arr2[j] > arr1[i]) arr2[k--] = arr2[j--]
    else arr2[k--] = arr1[i--]
  }

  while (i > -1) {
    arr2[k--] = arr1[i--]
  }

  while (j > -1) {
    arr2[k--] = arr2[j--]
  }
}

const arr1 = [1, 3, 5],
  arr2 = [2, 4, 6, 0, 0, 0]

merger_first_into_second(arr1, arr2)
