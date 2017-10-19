import * as most from "most"


function checkWinner(board, player) {
  function checkLine(ridx, cidx, rDelta, cDelta) {
    for (let i = 0; i < 3; i++) {
      if (board[ridx][cidx] !== player) {
        return false
      }
      cidx += cDelta
      ridx += rDelta
    }
    return true
  }

  for (let idx=0; idx <3; idx++) {
    if (checkLine(idx, 0, 0, 1) || checkLine(0, idx, 1, 0)) {
      return true
    }
  }

  return checkLine(0, 0, 1, 1) || checkLine(0, 2, 1, -1)
}

function makeMove(player, {row, col}, pState) {
  const {curPlayer, moveCount, win, gameOver, board} = pState
  if (gameOver || board[row][col] || (curPlayer !== player)) {
    return pState
  }
  board[row][col] = curPlayer
  const isWinner = checkWinner(board, curPlayer)
  return {
    curPlayer: curPlayer === "X" ? "O" : "X",
    moveCount: moveCount + 1,
    win: isWinner ? curPlayer : null,
    gameOver: isWinner || moveCount === 9,
    board: board
  }
}

function pickPosition(board) {
  const randInt = max => Math.floor(Math.random()*(max- 0)) + 0
  const emptyCells = []
  board.map((rows, row) =>
    rows.map((cell, col) => cell? null: emptyCells.push({row, col}))
  )
  return emptyCells[randInt(emptyCells.length)]
}

export default function model(actions) {
  const initState = () => ({
    curPlayer: 'X',
    moveCount: 1,
    win: null,
    gameOver: false,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  })

  const initialReducer$ = most.of(prevState => prevState ? prevState : initState())
  const markCellReducer$ = actions.markCell$
    .map(vs => vs.map(v => v.split("-")).reduce((o, [k,v]) => (o[k]=v) && o, {}))
    .map(pos => prevState => makeMove("X", pos, prevState))

  const computerMarkReducer$ = markCellReducer$.multicast()
    .delay(1000)
    .map(state => pState => 
      pState.gameOver? pState: makeMove("O", pickPosition(pState.board), pState)
    )

  const startGameReducer$ = actions.startGame$
    .map(prevState => initState)

  return most.merge(
    initialReducer$,
    markCellReducer$,
    computerMarkReducer$,
    startGameReducer$
  )
}