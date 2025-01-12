"use client";

import { useState, MouseEvent } from "react";

interface SquareProps {
  value: string | null;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isX: boolean;
}

function Square({ value, onClick, isX }: SquareProps) {
  const textColor = isX ? "text-blue-600" : "text-red-600";
  return (
    <button
      className={`w-20 h-20 border-2 border-gray-300 text-4xl font-bold ${textColor} hover:bg-gray-100 transition-colors bg-white rounded-md flex items-center justify-center`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default function Home() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number): void => {
    if (squares[i] || calculateWinner(squares)) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(square => square !== null)) {
    status = "Game is a draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
      
      <div className="mb-8 text-center">
        <p className="text-lg mb-2">How to play:</p>
        <p className="text-gray-600">Click on any empty square to make your move.</p>
        <p className="text-gray-600">X plays in <span className="text-blue-600">blue</span>, O plays in <span className="text-red-600">red</span>.</p>
      </div>

      <div className="mb-4 text-xl font-semibold">{status}</div>
      
      <div className="inline-grid grid-cols-3 gap-1 bg-gray-300 p-2 rounded-lg">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onClick={() => handleClick(i)}
            isX={square === "X"}
          />
        ))}
      </div>
    </div>
  );
}

function calculateWinner(squares: (string | null)[]): string | null {
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

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}