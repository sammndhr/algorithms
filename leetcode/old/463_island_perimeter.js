/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
  var perimeter = 0;
  for (let i = 0; i<grid.length; i++) {
    for (let j = 0; j<grid[i].length; j++) {
      if (grid[i][j] === 1) {
        if (!grid[i][j-1]) {
          perimeter++;
        }
        if (!grid[i][j+1]) {
          perimeter++;
        }
        if (!grid[i-1] || !grid[i-1][j]) {
          perimeter++;
        }
        if (!grid[i+1] || !grid[i+1][j]) {
          perimeter++;
        }
      }
    }
  }
  return perimeter;
};

// console.log(islandPerimeter([[0,1,0,0],
//  [1,1,1,0],
//  [0,1,0,0],
//  [1,1,0,0]]
// ));

console.log(islandPerimeter([[0,1]]));