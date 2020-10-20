const textArea = document.getElementById('text-input');
const table = document.getElementById('grid-table')
const errDiv = document.getElementById('error-msg')
const clearButton = document.getElementById('clear-button')
const solveButton = document.getElementById('solve-button')

const cellMap = [
  'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9',
  'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9',
  'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9',
  'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9',
  'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9',
  'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9',
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9',
  'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9'
]



clearButton.addEventListener('click', function() {
  clearAll()
})

solveButton.addEventListener('click', function() {
  getSolution(board)
})

table.addEventListener('change', function(event) {
  const target = event.target
  let val = target.value
  if (!isValidPuzzleGridEntry(val)) {
    fillBoard(board)
    return
  }
  const index = cellMap.indexOf(target.id)
  let arrayFromBoard = Array.from(board)
  if (val === '') { val = '.' }
  arrayFromBoard[index] = val
  let newBoard = arrayFromBoard.join('')
  board = newBoard
  updateTextArea(board)
})

textArea.addEventListener('click', function(event) {
  if (isValidLength(this.value) && isValidPuzzleStr(this.value))
    if (errDiv.firstChild) {
      errDiv.removeChild(errDiv.firstChild)
    }
})


textArea.addEventListener('change', function(event) {
  const text = this.value
  if (isValidLength(text) && isValidPuzzleStr(text)) {
    board = this.value
    fillBoard(board)
    if (errDiv.firstChild) {
      errDiv.removeChild(errDiv.firstChild)
    }
  }
  if (text.length !== 81) {

    const msg = 'Error: Expected puzzle to be 81 characters long.'
    if (errDiv.firstChild) {
      errDiv.removeChild(errDiv.firstChild)
    }
    errDiv.append(msg)
  }

  updateTextArea(board)

}
)

// import { puzzlesAndSolutions } from './puzzle-strings.js';
let board = ''
document.addEventListener('DOMContentLoaded', () => {
  //Load a simple puzzle into the text area
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

  board = getInputText()
  fillBoard(board)
});

function getInputText() {
  return textArea.value
};

function isValidPuzzleStr(text){
  return /^[0-9,.]*$/.test(text);
};

function isValidPuzzleGridEntry(str){
  const validEntries = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ""];
  return validEntries.includes(str);
};

function isValidLength(str){
 return str.length === 81
}
 


function fillBoard(board) {

  if (board === '') {
    board = '.'.repeat(81)
  }

  [...board].forEach((item, index) => {

    let cell = document.getElementById(cellMap[index])
    if (item !== '.') {
      cell.value = item
    }
    if (item === '.') {

      cell.value = ''
    }
  })
}

function updateTextArea(board) {
  textArea.value = board
}

function clearAll() {
  board = ''
  textArea.value = ''
  fillBoard(board)
}

function getSolution(boardToSolve) {
  const solved = solveBoard(boardToSolve)
  // const solved = arrayToStr(solve(stringToArray(boardToSolve)))

  board = solved
  updateTextArea(board)
  fillBoard(board)
}

function solveBoard(boardToSolve){
  return arrayToStr(solve(stringToArray(boardToSolve)))
}

// Sudoku maps ROW COL BOX--------------------------------

const ROWS = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 32, 33, 34, 35],
  [36, 37, 38, 39, 40, 41, 42, 43, 44],
  [45, 46, 47, 48, 49, 50, 51, 52, 53],
  [54, 55, 56, 57, 58, 59, 60, 61, 62],
  [63, 64, 65, 66, 67, 68, 69, 70, 71],
  [72, 73, 74, 75, 76, 77, 78, 79, 80]
];

const COLS = [
  [0, 9, 18, 27, 36, 45, 54, 63, 72],
  [1, 10, 19, 28, 37, 46, 55, 64, 73],
  [2, 11, 20, 29, 38, 47, 56, 65, 74],
  [3, 12, 21, 30, 39, 48, 57, 66, 75],
  [4, 13, 22, 31, 40, 49, 58, 67, 76],
  [5, 14, 23, 32, 41, 50, 59, 68, 77],
  [6, 15, 24, 33, 42, 51, 60, 69, 78],
  [7, 16, 25, 34, 43, 52, 61, 70, 79],
  [8, 17, 26, 35, 44, 53, 62, 71, 80]
];

const BOXES = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80]
];

// -------------------------------------
// SUDOKU ENTRY SOLVE FILE----------

// Grid -> Grid or false (unsolvaable)
// Assume grid is valid
function solve(grid) {
  if (isFull(grid)) {
    return grid
  }

  let nextGridArray = nextGrids(grid)

  for (let grid of nextGridArray) {
    let solved = solve(grid);
    if (solved) {
      return solved;
    }
  }
  return false;
}


// SUDOKU GENERATE GRIDS FILE----------
// Assume the grid has been checked with isFull and is not full
// Grid -> Position index
function nextGrids(grid) {
  let emptyCellIndex = nextEmptyCell(grid)
  let emptyCellRowCol = indexToRowCol(emptyCellIndex)
  let gridArray = []
  for (let num of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    let possibleGrid = grid.slice()
    if (isValid(possibleGrid, emptyCellRowCol, num)) {
      possibleGrid[emptyCellIndex] = num
      gridArray.push(possibleGrid)
    }
  }

  return gridArray
}

// -------------------------------------


//======================================
// SUDOKU ENTRY VALIDATIONS FILE----------

// Grid, Position, Number -> Boolean
function isValidInRow(grid, position, number) {
  let mapRow = ROWS[position[0]];
  let rowVals = mapRow.map(index => grid[index]);
  return !rowVals.includes(number);
}

function isValidInCol(grid, position, number) {
  let mapCol = COLS[position[1]];
  let colVals = mapCol.map(index => grid[index]);
  return !colVals.includes(number);
}

function isValidInBox(grid, position, number) {
  let searchIndex = rowColToIndex(position[0], position[1]);
  var index = BOXES.findIndex(x => x.includes(searchIndex))
  let mapBox = BOXES[index]
  let boxVals = mapBox.map(index => grid[index]);
  return !boxVals.includes(number);
}

// Grid, Position, Number -> Boolean
function isValid(grid, position, number) {
  let boxOK = isValidInBox(grid, position, number)
  let colOK = isValidInCol(grid, position, number)
  let rowOK = isValidInRow(grid, position, number)
  return boxOK && colOK && rowOK
}


// -------------------------------------

// SUDOKU ARRAY ACCESSORS FILE----------
const gridSize = 9

function rowColToIndex(row, col) {
  return row * gridSize + col;
}

function indexToRowCol(index) {
  return [Math.floor(index / gridSize), index % gridSize];
}

// SUDOKU ENTRY VALIDATIONS FILE----------
// Assume the grid has been checked with isFull and is not full
// Grid -> Position index
function nextEmptyCell(grid) {
  // iterate through the grid
  let index = grid.indexOf(false)
  if (index === -1) {
    return new Error('No empty cell found')
  }
  return index
}

// -------------------------------------
// SUDOKU grid is full? FILE----------

// Grid -> Boolean
function isFull(grid) {
  return !grid.includes(false)
}

// -------------------------------------

function arrayToStr(array) {
  const mapFunction = num => num === false ? false : `${num}`
  const reduceFunction = (acc, curr) => curr === false ? acc + "." : acc + curr
  return array.map(mapFunction).reduce(reduceFunction)
}

function stringToArray(str) {
  let arrayOfStr = str.split('')
  const mapFunction = str => str === "." ? false : parseInt(str)

  return arrayOfStr.map(mapFunction)
}

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    solveBoard: solveBoard,
    stringToArray: stringToArray,
    getInputText: getInputText,
    fillBoard: fillBoard,
    updateTextArea: updateTextArea,
    clearAll: clearAll,
    isValidPuzzleGridEntry: isValidPuzzleGridEntry,
    isValidPuzzleStr: isValidPuzzleStr,
    isValidLength: isValidLength
  }
} catch (e) { }
