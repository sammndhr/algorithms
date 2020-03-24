/**
 * @param {number[][]} clips
 * @param {number} T
 * @return {number}
 */

var videoStitching = function(clips, T) {
  const len = clips.length
  let requiredClips = 0,
    currEnd = 0

  function isOverlapped(end, start) {
    return start <= end
  }

  clips.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]))
  for (let i = 0; i < len && currEnd < T; ) {
    let max = 0
    if (!isOverlapped(currEnd, clips[i][0])) {
      return -1
    }
    while (i < len && isOverlapped(currEnd, clips[i][0])) {
      max = Math.max(max, clips[i][1])
      i++
    }
    requiredClips++
    currEnd = max
  }
  return currEnd >= T ? requiredClips : -1
}

//tests
const clips = [
    [0, 2],
    [4, 6],
    [8, 10],
    [1, 9],
    [1, 5],
    [5, 9]
  ],
  T = 10

console.log(videoStitching(clips, T))
