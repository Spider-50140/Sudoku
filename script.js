// We declared 2-D array to perform our backtracking operation
// we declared temp array to store which index is filled(in board array that we will get from API and which are empty),we wil mark filled as
// true and empty as false

var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

// assign each index to each of the boxes in sudoku (Total 81 boxes so assign each box to each index)
for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j)
  }
}

// Initialising temp to false
function initializeTemp(temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      temp[i][j] = false
    }
  }
}

// Here in 2-D temp array we are marking that index as true which is filled (received from API) and empty one's as false
function setTemp(board, temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        temp[i][j] = true
      }
    }
  }
}

// Now we have our board ,what we are doing here is setting all those filled boxes of num as red colour

function setColor(temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (temp[i][j] == true) {
        arr[i][j].style.color = '#DC3545'
      }
    }
  }
}

function resetColor() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j].style.color = 'green'
    }
  }
}
// Declared a 2-D array to store the 2-D sudoku that we will recieve from API
var board = [[], [], [], [], [], [], [], [], []]

let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')

console.log(arr)

// Now we are filling our array which we will use to perform Back-tracking
function changeBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].innerText = board[i][j]
      } else arr[i][j].innerText = ''
    }
  }
}

button.onclick = async function helper() {
  const response = await fetch(
    'https://sugoku.herokuapp.com/board?difficulty=easy'
  )
  const user = await response.json()
  console.log(user)
  initializeTemp(temp)
  resetColor()

  board = user.board
  setTemp(board, temp)
  setColor(temp)
  changeBoard(board)
}

//to be completed by student
function isPossible(board, sr, sc, val) {
  for (var row = 0; row < 9; row++) {
    if (board[row][sc] == val) {
      return false
    }
  }

  for (var col = 0; col < 9; col++) {
    if (board[sr][col] == val) {
      return false
    }
  }

  var r = sr - (sr % 3)
  var c = sc - (sc % 3)

  for (var cr = r; cr < r + 3; cr++) {
    for (var cc = c; cc < c + 3; cc++) {
      if (board[cr][cc] == val) {
        return false
      }
    }
  }
  return true
}

//to be completed by student
function solveSudokuHelper(board, sr, sc) {
  if (sr == 9) {
    changeBoard(board)
    return
  }
  if (sc == 9) {
    solveSudokuHelper(board, sr + 1, 0)
    return
  }

  if (board[sr][sc] != 0) {
    solveSudokuHelper(board, sr, sc + 1)
    return
  }

  for (var i = 1; i <= 9; i++) {
    if (isPossible(board, sr, sc, i)) {
      board[sr][sc] = i
      solveSudokuHelper(board, sr, sc + 1)
      board[sr][sc] = 0
    }
  }
}

function solveSudoku(board) {
  solveSudokuHelper(board, 0, 0)
}

solve.onclick = function () {
  solveSudoku(board)
}
