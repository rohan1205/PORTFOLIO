"use client";

import { useEffect, useState, useRef } from "react";

interface TrailDot {
  x: number;
  y: number;
  id: number;
  char: string;
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newDot: TrailDot = {
        x: e.clientX,
        y: e.clientY,
        id: idCounter.current++,
        char: Math.random() > 0.5 ? "1" : "0" // Binary character
      };

      setTrail((prev) => [...prev, newDot]);

      // Remove the dot after a short duration for the fade effect
      setTimeout(() => {
        setTrail((prev) => prev.filter((d) => d.id !== newDot.id));
      }, 500); // 500ms life
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {trail.map((dot) => (
        <div
          key={dot.id}
          className="absolute text-primary-bright font-mono text-xs opacity-0"
          style={{
            left: dot.x,
            top: dot.y,
            animation: "fadeDown 0.5s ease-out forwards",
          }}
        >
          {dot.char}
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeDown {
          0% { opacity: 0.8; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(15px); }
        }
      `}} />
    </div>
  );
}
