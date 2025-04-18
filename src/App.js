import { useState, memo } from "react";

// todo: export to github after the fact

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
    var currentShape = "X";
    if (!xTurn) {
      currentShape = "O";
    }

    if (xTurn) {
      squareCopy[i][j] = currentShape;
    } else {
      squareCopy[i][j] = currentShape;
    }

    setsquares(squareCopy);
    setXTurn(!xTurn);

    if (calcWinner(squares, currentShape)) {
      console.log("Winner!");
    }
  }

  return <>{squareGen}</>;
}

// TODO: Debug like all of it...
function calcWinner(squares, shape) {
  const horizontalWinners = [];
  const verticalWinners = [];

  var diagnalWinner = true;
  var otherDiagnalWinner = true;
  const otherDiagnalCheck = [0, boardSize - 1];

  for (i = 0; i < boardSize; i++) {
    if (squares[i][i] != shape) {
      diagnalWinner = false;
    }

    if (squares[otherDiagnalCheck[0]][otherDiagnalCheck[1]] != shape) {
      otherDiagnalWinner = false;
    }

    otherDiagnalWinner[0]++;
    otherDiagnalWinner[1]--;

    var horizontalWinner = true;
    var verticalWinner = true;

    for (j = 0; j < boardSize; j++) {
      if (squares[i][j] != shape) {
        horizontalWinner = false;
      }

      if (squares[j][i] != shape) {
        verticalWinner = false;
        break;
      }
    }

    horizontalWinners.push(horizontalWinner);
    verticalWinners.push(verticalWinner);
  }

  for (i = 0; i < boardSize; i++) {
    if (horizontalWinners[i] || verticalWinners[i]) {
      return true;
    } else {
      return false;
    }
  }
}
