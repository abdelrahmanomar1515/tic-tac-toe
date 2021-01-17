export default function Square({
  value,
  onClick,
}: {
  value: "X" | "O" | "";
  onClick: () => void;
}) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}
