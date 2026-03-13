"use client";

import { useState, useEffect } from "react";

const frames = [
  `
      ___
    /     \\
   | () () |
    \\  ^  /
     |||||
  `,
  `
      ___
    /     \\
   | () () |
    \\  -  /
     |||||
  `,
  `
      ___
    /     \\
   | (> <) |
    \\  o  /
     |||||
  `,
];

export default function AsciiArt() {
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIdx((i) => (i + 1) % frames.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 mb-4 p-6 glass-panel border border-primary/20 bg-black/60 w-fit">
      <h3 className="text-secondary font-bold mb-4 font-mono">Loading ASCII Asset...</h3>
      <pre className="text-accent font-mono font-bold leading-tight">
        {frames[frameIdx]}
      </pre>
      <p className="mt-4 text-xs text-foreground/50">Hacker OS v1.0 [Active]</p>
    </div>
  );
}
