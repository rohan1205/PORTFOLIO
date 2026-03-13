"use client";

import { useEffect } from "react";
import { useOS } from "./OSProvider";
import Taskbar from "./Taskbar";
import Window from "./Window";
import MatrixRain from "./MatrixRain";
import AppRegistry from "./apps/AppRegistry";
import CursorTrail from "./CursorTrail";

// Easter Egg Overlays
function EasterEggs() {
  const { easterEggFlags } = useOS();

  return (
    <>
      {easterEggFlags.bsod && (
        <div className="absolute inset-0 z-[10000] bg-[#0000AA] text-white font-mono p-16 flex flex-col justify-center items-start">
          <p className="text-8xl font-bold mb-8">:(</p>
          <p className="text-2xl mb-4">Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.</p>
          <p className="text-xl opacity-80 mt-12 bg-white text-[#0000AA] px-2 py-1 inline-block uppercase">SYSTEM FAILURE — just kidding</p>
        </div>
      )}
      {easterEggFlags.hackGlitch && (
        <div className="absolute inset-0 z-[9998] mix-blend-difference bg-black pointer-events-none animate-pulse opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00FF41 2px, #00FF41 4px)' }}>
          <div className="w-full h-full flex items-center justify-center text-[#00FF41] text-9xl font-bold font-mono glitch-text">HACKED</div>
        </div>
      )}
    </>
  );
}

export default function Desktop() {
  const { windows, matrixMode, openApp } = useOS();

  // 30s Idle Screensaver (Snake)
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // If they are idle for 30s, open the snake game as screensaver
        openApp("snake");
      }, 30000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [openApp]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-background text-foreground font-sans">
      
      {/* Background Matrix layer (low opacity) */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${matrixMode ? "opacity-15" : "opacity-0"}`}>
        <MatrixRain />
      </div>

      <CursorTrail />

      {/* OS App Windows */}
      <div className="absolute inset-0 z-10 bottom-12 overflow-hidden pointer-events-none">
        {/* We use pointer-events-none on container so background clicks fall through, 
            but pointer-events-auto on the children (Windows) */}
        <div className="relative w-full h-full pointer-events-auto">
          {windows.map((app) => (
            <Window key={app.id} app={app} defaultWidth={app.id === "terminal" ? 850 : 600} defaultHeight={app.id === "terminal" ? 550 : 500}>
              <AppRegistry id={app.componentId} />
            </Window>
          ))}
        </div>
      </div>

      {/* Desktop Taskbar Layer */}
      <Taskbar />

      {/* Easter Eggs triggered manually */}
      <EasterEggs />
      
      {/* Global scanline overlay */}
      <div className="absolute inset-0 z-[9000] pointer-events-none bg-[url('/scanline.png')] bg-repeat opacity-[0.03]"></div>
    </div>
  );
}
