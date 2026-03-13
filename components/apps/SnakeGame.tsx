"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Point = { x: number; y: number };

const GRID_SIZE = 20;

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const playAreaRef = useRef<HTMLDivElement>(null);

  // Auto focus to capture keystrokes immediately
  useEffect(() => {
    playAreaRef.current?.focus();
  }, []);

  const reset = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDir({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
    playAreaRef.current?.focus();
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake((prev) => {
      const head = prev[0];
      const newHead = { x: head.x + dir.x, y: head.y + dir.y };

      // Wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prev;
      }

      // Self collision
      if (prev.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prev;
      }

      const newSnake = [newHead, ...prev];

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [dir, food, gameOver]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 120);
    return () => clearInterval(interval);
  }, [moveSnake]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault(); // Stop terminal scrolling while playing
    if (e.key === "ArrowUp" && dir.y !== 1) setDir({ x: 0, y: -1 });
    if (e.key === "ArrowDown" && dir.y !== -1) setDir({ x: 0, y: 1 });
    if (e.key === "ArrowLeft" && dir.x !== 1) setDir({ x: -1, y: 0 });
    if (e.key === "ArrowRight" && dir.x !== -1) setDir({ x: 1, y: 0 });
  };

  return (
    <div
      ref={playAreaRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="mt-4 mb-4 p-4 glass-panel border border-primary/20 bg-black/60 outline-none w-fit"
    >
      <div className="flex justify-between items-center mb-4 text-primary">
        <span className="font-bold">Retro Snake</span>
        <span className="font-mono text-accent">SCORE: {score}</span>
      </div>

      <div
        className="relative bg-black border-2 border-primary/40 shadow-inner overflow-hidden"
        style={{ width: GRID_SIZE * 15, height: GRID_SIZE * 15 }}
      >
        {/* Food */}
        <div
          className="absolute bg-accent w-[15px] h-[15px]"
          style={{ left: food.x * 15, top: food.y * 15 }}
        />

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`absolute w-[15px] h-[15px] ${
              i === 0 ? "bg-primary" : "bg-primary/70"
            }`}
            style={{ left: segment.x * 15, top: segment.y * 15 }}
          />
        ))}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
            <p className="text-xl font-bold text-accent mb-4 animate-pulse">GAME OVER</p>
            <button
              onClick={reset}
              className="px-4 py-2 border border-primary text-primary hover:bg-primary/20 font-mono text-sm transition-colors"
            >
              [ RESTART ]
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-foreground/40 mt-4 text-center">Use Arrow Keys. Click to focus.</p>
    </div>
  );
}
