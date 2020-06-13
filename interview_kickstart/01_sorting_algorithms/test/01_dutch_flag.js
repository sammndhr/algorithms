function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function dutch_flag_sort(balls) {
  const len = balls.length

  let low = 0,
    high = len - 1,
    i = 0

  while (i <= high) {
    const curr = balls[i]
    if (curr === 'R') swap(balls, i++, low++)
    else if (curr === 'B') swap(balls, i, high--)
    else i++
  }
}

const balls = ['G', 'B', 'G', 'G', 'R', 'B', 'R', 'G']

dutch_flag_sort(balls)
