"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "RohanOS v3.0.1",
  "Loading kernel... OK",
  "Mounting filesystem... OK",
  "Starting services... OK",
  "CAUTION: SYSTEM UNDER CONSTRUCTION...",
  "Welcome to RohanOS."
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 800); // Wait for fade out
      }, 500);
    }
  }, [currentMessageIndex, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-primary font-mono"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <div className="w-full max-w-md p-8 glass-panel border-primary/20 relative overflow-hidden">
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent w-full h-[5px] animate-[scan_2s_ease-in-out_infinite]" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <h1 className="text-xl font-bold tracking-widest neon-text">SYSTEM BOOT</h1>
            </div>
            
            <div className="space-y-2 text-sm text-foreground/80 min-h-[120px]">
              {messages.slice(0, currentMessageIndex).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-2 ${msg.includes("CAUTION") ? "text-red-500 font-bold" : ""}`}
                >
                  <span className="text-secondary">{">"}</span>
                  <span>{msg}</span>
                  {i === messages.length - 1 && (
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1 align-middle" />
                  )}
                </motion.div>
              ))}
              {currentMessageIndex < messages.length && (
                <div className="flex items-center gap-2 text-primary/60">
                  <span className="text-secondary">{">"}</span>
                  <span className="w-2 h-4 bg-primary/60 animate-pulse align-middle" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
