import Square from "./Square";

export type BoardSquares = ("" | "X" | "O")[];
export type Player = "X" | "O";

export default function Board({
  squares,
  player,
  winner,
  onPlay,
}: {
  squares: BoardSquares;
  player: Player;
  winner: Player | null;
  onPlay: (squares: BoardSquares) => void;
}) {
  function handleClick(i: number) {
    const newSquares = [...squares];

    if (!newSquares[i] && !winner) {
      newSquares[i] = player;
      onPlay(newSquares);
    }
  }

  function renderSquare(i: number) {
    const value = squares[i];
    return <Square value={value} onClick={() => handleClick(i)} />;
  }

  return (
    <>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
}
