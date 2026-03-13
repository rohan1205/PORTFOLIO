"use client";

import { useOS } from "./OSProvider";
import { useEffect, useState } from "react";
import { TerminalSquare, FolderGit2, Ghost, Rocket, Mail, Trophy } from "lucide-react";

export default function Taskbar() {
  const { windows, openApp, focusApp } = useOS();
  const [time, setTime] = useState("");
  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(45);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fake CPU/RAM load
    const monitor = setInterval(() => {
      setCpu(prev => Math.max(5, Math.min(95, prev + (Math.random() * 20 - 10))));
      setRam(prev => Math.max(20, Math.min(80, prev + (Math.random() * 10 - 5))));
    }, 2000);
    return () => clearInterval(monitor);
  }, []);

  const apps = [
    { id: "terminal", icon: <TerminalSquare size={18} />, label: "Terminal" },
    { id: "projects", icon: <FolderGit2 size={18} />, label: "Projects" },
    { id: "snake", icon: <Ghost size={18} />, label: "Snake.exe" },
    { id: "contact", icon: <Mail size={18} />, label: "Comms" },
  ];

  return (
    <div className="absolute bottom-0 left-0 w-full h-12 bg-background border-t border-border-base flex items-center justify-between px-4 z-50 select-none">
      
      {/* Start Button & Pinned Apps */}
      <div className="flex items-center gap-2 h-full">
        <div className="flex items-center justify-center mr-4 w-10 text-primary-bright font-bold">
          [R]
        </div>
        
        {apps.map((app) => {
          const w = windows.find(x => x.id === app.id);
          const isOpen = w?.isOpen;
          const isFocused = w?.isFocused && !w?.isMinimized;

          return (
            <button
              key={app.id}
              onClick={() => {
                if (!isOpen) openApp(app.id, app.label);
                else focusApp(app.id);
              }}
              className={`relative flex items-center gap-2 px-3 h-9 rounded transition-all duration-200 group
                ${isFocused ? "bg-surface border border-primary/30 text-primary-bright shadow-[inset_0_1px_4px_rgba(0,255,65,0.1)]" : "hover:bg-white/5 text-text-muted hover:text-foreground"}
              `}
            >
              {app.icon}
              <span className="text-sm font-mono hidden sm:inline-block">{app.label}</span>
              
              {/* Active indicator */}
              {isOpen && (
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-t-sm transition-all duration-300
                  ${isFocused ? "w-full bg-primary-bright shadow-[0_0_5px_#00FF41]" : "w-1/2 bg-primary/50"}
                `} />
              )}
            </button>
          );
        })}
      </div>

      {/* Tray (Monitors, Clock) */}
      <div className="flex items-center gap-6 h-full text-text-muted font-mono text-xs">
        {/* System Monitor */}
        <div className="hidden md:flex flex-col gap-1 w-24">
          <div className="flex items-center justify-between">
            <span>CPU</span>
            <span>{cpu.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1 bg-surface border border-border-base rounded-full overflow-hidden">
             <div className="h-full bg-primary transition-all duration-500" style={{ width: `${cpu}%` }} />
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-1 w-24">
          <div className="flex items-center justify-between">
            <span>RAM</span>
            <span>{ram.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1 bg-surface border border-border-base rounded-full overflow-hidden">
             <div className="h-full bg-blue-accent transition-all duration-500" style={{ width: `${ram}%` }} />
          </div>
        </div>
        
        {/* Clock */}
        <div className="flex items-center justify-center bg-surface px-3 py-1 rounded border border-border-base text-primary font-bold">
          {time}
        </div>
      </div>
    </div>
  );
}
