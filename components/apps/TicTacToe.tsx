"use client";

import { useState } from "react";

type Player = "X" | "O" | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | "Draw">(null);

  const checkWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (!squares.includes(null)) return "Draw";
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);
    
    const w = checkWinner(newBoard);
    setWinner(w);

    if (!w) {
      setIsPlayerTurn(false);
      setTimeout(() => {
        const available = newBoard.map((sq, idx) => sq === null ? idx : null).filter(val => val !== null) as number[];
        if (available.length > 0) {
          const aiMove = available[Math.floor(Math.random() * available.length)];
          newBoard[aiMove] = "O";
          setBoard([...newBoard]);
          setWinner(checkWinner(newBoard));
          setIsPlayerTurn(true);
        }
      }, 500); // AI thinking delay
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  return (
    <div className="mt-4 mb-4 p-6 glass-panel border border-primary/20 bg-black/60 w-fit">
      <div className="flex justify-between items-center mb-6 text-primary">
        <span className="font-bold">Neural Tic-Tac-Toe</span>
      </div>

      <div className="grid grid-cols-3 gap-2 w-48 h-48 mb-6 mx-auto">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={!isPlayerTurn || !!winner || !!cell}
            className={`flex items-center justify-center text-4xl border border-primary/30 bg-black/40 hover:bg-primary/10 transition-colors 
              ${cell === 'X' ? 'text-accent' : cell === 'O' ? 'text-secondary font-bold' : ''}`}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="text-center h-8 font-mono">
        {winner ? (
          <div className="text-accent animate-pulse font-bold">
            {winner === "Draw" ? "STALEMATE DETECTED" : winner === "X" ? "HUMAN VICTORY" : "AI DOMINANCE"}
          </div>
        ) : (
          <div className="text-foreground/70">
            {isPlayerTurn ? "Your turn (X)" : "AI thinking (O)..."}
          </div>
        )}
      </div>

      {winner && (
        <button
          onClick={reset}
          className="mt-4 w-full px-4 py-2 border border-primary text-primary hover:bg-primary/20 font-mono text-sm transition-colors"
        >
          [ PLAY_AGAIN ]
        </button>
      )}
    </div>
  );
}
