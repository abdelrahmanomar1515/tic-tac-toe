import { useState } from "react";
import Board, { BoardSquares, Player } from "./Board";

type History = { board: BoardSquares; player: Player }[];

export default function Game() {
  const [history, setHistory] = useState<History>([
    { board: Array(9).fill(""), player: "X" },
  ]);

  const [timeInHistory, setTimeInHistory] = useState(0);
  const players = ["X", "O"] as const;

  const currentSquares = history[timeInHistory].board;
  const currentPlayer = history[timeInHistory].player;
  const winner = calculateWinner(currentSquares);

  function handleTurn(squares: BoardSquares) {
    const newPlayer =
      players[(players.indexOf(currentPlayer) + 1) % players.length];

    const newHistory: History = [
      ...history.slice(0, timeInHistory + 1),
      { board: squares, player: newPlayer },
    ];
    setTimeInHistory((t) => t + 1);
    setHistory(newHistory);
  }

  const moves = history.map((_, index) => {
    const move = index ? "Go to move " + index : "Go to start";
    return (
      <li key={index}>
        <button onClick={() => setTimeInHistory(index)}>{move}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + currentPlayer;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares}
          player={currentPlayer}
          onPlay={handleTurn}
          winner={winner}
        ></Board>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: BoardSquares): Player | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] as Player;
    }
  }
  return null;
}
