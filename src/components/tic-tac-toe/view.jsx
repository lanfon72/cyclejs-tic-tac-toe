import {html} from "snabbdom-jsx"

function playerIcon(clsName, player) {
  return (
    <div classNames={[".player-icon", ...arguments]}>
      <span/>
    </div>
  )
}


function showCol(player, cidx, ridx) {
  return (
    <div classNames={["cell", `row-${ridx}`, `col-${cidx}`]}>
      {playerIcon("cell", player)}
    </div>
  )
}

function showRow(row, idx) {
  return (
    <div selector=".row">
      {row.map((col, cidx) => showCol(col, cidx, idx))}
    </div>
  )
}


export default state$ => state$.map(({gameOver, win, curPlayer, board}) => {
  return (
  <div selector=".tic-tac-toe">
    <div selector=".current-player">
      {gameOver?"": playerIcon("current-player X", curPlayer === "X" && "active")}
      {gameOver?"": playerIcon("current-player O", curPlayer === "O" && "active")}
    </div>
    <div selector=".board-container">
      {board.map((row, idx) => showRow(row, idx))}
      <div selector=".overlay" class-game-over={gameOver}>
        {win? playerIcon("winner", win): ""}
        <h2 selector=".winner"> {win? "WINNER!" : "DRAW!"} </h2>
      </div>
    </div>
    <button selector=".new-game" type="button"> New Game </button>
  </div>
  )
})