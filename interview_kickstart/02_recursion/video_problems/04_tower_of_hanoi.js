const { Stack } = require('../../../utils')
/* 
https://en.wikipedia.org/wiki/Tower_of_Hanoi
https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/

The Tower of Hanoi is a classic math game/puzzle. It consists of three rods and a number of disks of different sizes, which can slide onto any rod. The puzzle starts with the disks in a neat stack in ascending order of size on one rod, the smallest at the top, thus making a conical shape. The objective of the puzzle is to move the entire stack to another rod, with constraints.

Constraints:
  - Only one disk can be moved at a time
  - A disk can only be moved if it is the uppermost disk on a stack
  - No disk can be placed on top of a smaller disk
*/

/* 
Naive Implementation that just prints current move.
Time Complexity - O(2^n)
 - Exact is 2^n - 1. So T(2) = 3, T(3) = 7, T(4) = 15
Space Complexity - O(n). Max possible tree height
*/
function naiveTOH(n, src, dst, aux) {
  if (n === 1) console.log(`Move disk from ${src} to ${dst}.`)
  else {
    naiveTOH(n - 1, src, aux, dst)
    console.log(`Move disk from ${src} to ${dst}.`)
    naiveTOH(n - 1, aux, dst, src)
  }
}

// ---------------------------------------------------
/*
Tower of Hanoi Implemented with Stacks for rods to hold disks.
Time Complexity - O(2^n)
Space Complexity - O(n). O(n) + O(n) from sum of the three stack sizes. 
*/

class TowerOfHanoi {
  /**
   * @param {number} [diskCount] Number of disks.
   * @param {string} [src] Name of source rod.
   * @param {string} [dst] Name of destination rod.
   * @param {string} [src] Name of auxiliary rod.
   */
  constructor(diskCount = 4, src = 'src', dst = 'dst', aux = 'aux') {
    this.diskCount = diskCount
    this.src = src
    this.dst = dst
    this.aux = aux
    this.rods = {}
    this.moveCount = 0
  }

  /** Main recursive function to move all disks */
  recurseAndMoveAlldisks(n, src, dst, aux) {
    this.moveCount++
    if (n === 1) this.moveOnedisk(src, dst)
    else {
      this.recurseAndMoveAlldisks(n - 1, src, aux, dst)
      this.moveOnedisk(src, dst)
      this.recurseAndMoveAlldisks(n - 1, aux, dst, src)
    }
  }

  /** Pop one disk from src, push popped disk into dst and print rods */
  moveOnedisk(src, dst) {
    const disk = this.rods[src].pop()
    this.rods[dst].push(disk)

    console.log(`Move disk from ${src} to ${dst}.`)
    this.printRods()
  }

  /** Function to start puzzle — init rods, print initial state, call recurseAndMoveAlldisks & print moveCount. Call after creating an instance of TowerOfHanoi */
  init() {
    this.initRods()

    this.printDivider()
    console.log('Starting new Tower of Hanoi Puzzle...')
    console.log(`src: ${this.src}, dst: ${this.dst}, aux: ${this.aux}`)
    this.printRods()
    console.log(`disk Count: ${this.diskCount}`)
    console.log(`Total moves: ${this.moveCount}`)
    this.printDivider()

    this.recurseAndMoveAlldisks(this.diskCount, this.src, this.dst, this.aux)
    this.printDivider()
    console.log(`Total moves: 2^${this.diskCount} - 1 = ${this.moveCount}`)
    this.printDivider()
    console.log()
    console.log()
  }

  /** Set src, dst, aux rods to a new stack, push diskCount disks into src stack */
  initRods() {
    this.rods[this.src] = new Stack()
    this.rods[this.dst] = new Stack()
    this.rods[this.aux] = new Stack()

    for (let i = this.diskCount; i > 0; i--) {
      this.rods[this.src].push(i)
    }
  }

  printRods() {
    console.log(
      `${this.src}:`,
      this.rods[this.src].printStack(),
      `${this.dst}:`,
      this.rods[this.dst].printStack(),
      `${this.aux}:`,
      this.rods[this.aux].printStack()
    )
  }

  printDivider() {
    console.log('-----------------------------')
  }
}

// tests
console.log('Naive Tower of Hanoi that just prints current move')
naiveTOH(4, 'A', 'B', 'C')
console.log('-----------------------------')
naiveTOH(3, 'A', 'B', 'C')

console.log()
console.log()
console.log('-----------------------------')
console.log('Tower of Hanoi implemented with Stack to hold disks')
const toh = new TowerOfHanoi(5, 'A', 'B', 'C')
toh.init()

const toh1 = new TowerOfHanoi(3, 'A', 'B', 'C')
toh1.init()
