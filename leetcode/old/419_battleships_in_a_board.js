/*
Given an 2D board, count how many battleships are in it. The battleships are represented with 'X's, empty slots are represented with '.'s. You may assume the following rules:

You receive a valid board, made of only battleships or empty slots.
Battleships can only be placed horizontally or vertically. In other words, they can only be made of the shape 1xN (1 row, N columns) or Nx1 (N rows, 1 column), where N can be of any size.
At least one horizontal or vertical cell separates between two battleships - there are no adjacent battleships.
*/

/**
 * @param {character[][]} board
 * @return {number}
 */

//Depth First Search from Leetcode discuss
/*
var countBattleships = function(board) {
	let row = board.length;
	let col = board[0].length;
	let map = [];
	for(let i = 0; i < row; ++i) {
		map.push(Array(col));
	}
	//---------------------------//
	let count = 0;
	for(let i = 0; i < row; ++i) {
		for(let j = 0; j < col; ++j) {
			if(map[i][j] || board[i][j] === '.') continue;
			dfs(board, map, i, j);
			count++;
		}
	}
	return count;
	function dfs(board, map, row, col) {
		if(row < 0 || row === board.length || col < 0 || col === board[0].length || board[row][col] === '.' || map[row][col]) return;
		map[row][col] = true;
		dfs(board, map, row-1, col);
		dfs(board, map, row+1, col);
		dfs(board, map, row, col-1);
		dfs(board, map, row, col+1);
	}
};
*/

var countBattleships = function(board) {
	var count = 0;
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			if (i === 0) {
				board[i-1] = [];
			}
			if (board[i][j] === "X"  && board[i-1][j] !== "X" && board[i][j-1] !== "X") {
				count++;
			}      
		}
	}
	return count;
};


console.log(countBattleships(
	[["X", ".", ".", "X"],
	[".", ".", ".", "X"],
	[".", ".", ".", "X"]]));

console.log(countBattleships(
	[["X", "X", "X", "X"],
	[".", ".", ".", ""],
	[".", ".", "X", "X"]]));

console.log(countBattleships(
	[["X", "X", "X", "X"],
	[".", ".", ".", ""],
	["X", ".", "X", "."],
	[".", ".", "X", "."]]));

