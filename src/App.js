import { useState, memo } from "react";

const boardSize = 3;

const Square = memo(function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
});

export default function Board() {
  const [xTurn, setXTurn] = useState(true);
  const [squares, setsquares] = useState(
    Array.from(Array(boardSize), () => new Array(boardSize))
  );

  const squareGen = [];

  for (let i = 0; i < boardSize; i++) {
    squareGen.push(
      <div className="board-row" key={i}>
        <Square value={squares[i][0]} onSquareClick={() => handleClick(i, 0)} />
        <Square value={squares[i][1]} onSquareClick={() => handleClick(i, 1)} />
        <Square value={squares[i][2]} onSquareClick={() => handleClick(i, 2)} />
      </div>
    );
  }

  function handleClick(i, j) {
    if (squares[i][j]) {
      return;
    }

    const squareCopy = squares.slice();

    let currentShape = xTurn ? "X" : "O";
    squareCopy[i][j] = currentShape;

    setsquares(squareCopy);
    setXTurn(!xTurn);
  }

  let currentShape = xTurn ? "X" : "O";
  let status = "Next player: " + currentShape;
  if (calcWinner(squares, currentShape)) {
    status = "Winner: " + currentShape;
  }

  return (
    <>
      {squareGen}
      <div className="status">{status}</div>
    </>
  );
}

function calcWinner(squares, shape) {
  const horizontalWinners = [];
  const verticalWinners = [];

  let diagnalWinner = true;
  let otherDiagnalWinner = true;
  const otherDiagnalCheck = [0, boardSize - 1];

  for (let i = 0; i < boardSize; i++) {
    if (squares[i][i] != shape) {
      diagnalWinner = false;
    }

    if (squares[otherDiagnalCheck[0]][otherDiagnalCheck[1]] != shape) {
      otherDiagnalWinner = false;
    }

    otherDiagnalCheck[0]++;
    otherDiagnalCheck[1]--;

    let horizontalWinner = true;
    let verticalWinner = true;

    for (let j = 0; j < boardSize; j++) {
      if (squares[i][j] != shape) {
        horizontalWinner = false;
      }

      if (squares[j][i] != shape) {
        verticalWinner = false;
      }
    }

    horizontalWinners.push(horizontalWinner);
    verticalWinners.push(verticalWinner);
  }

  if (diagnalWinner || otherDiagnalWinner) {
    return true;
  }

  for (let k = 0; k < boardSize; k++) {
    if (horizontalWinners[k] || verticalWinners[k]) {
      return true;
    }
  }

  return false;
}
