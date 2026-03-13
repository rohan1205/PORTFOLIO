"use client";

import { useEffect, useState } from "react";

export default function SystemScan() {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const sequence = [
      { text: "Initializing Deep Scan Protocol...", delay: 200 },
      { text: "Bypassing external firewalls...", delay: 800 },
      { text: "Connecting to secure local nodes [192.168.1.1]...", delay: 1500 },
      { text: "Checking open ports... Port 22 (SSH) open, Port 443 (HTTPS) open", delay: 2200 },
      { text: "Decrypting payload vectors...", delay: 3000 },
      { text: "Running integrity checks across all clusters...", delay: 3800 },
      { text: "Found devices: 14", delay: 4200 },
      { text: "No immediate threats detected. System Integrity: 98%", delay: 5000 },
    ];

    sequence.forEach(({ text, delay }) => {
      setTimeout(() => setLogs((prev) => [...prev, text]), delay);
    });

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          setComplete(true);
          return 100;
        }
        return p + Math.floor(Math.random() * 5) + 1;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="mt-4 mb-4 max-w-2xl bg-black/60 p-6 glass-panel border border-primary/20 font-mono text-sm">
      <h3 className="text-accent font-bold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
        SYSTEM_SCAN_EXECUTION
      </h3>

      <div className="w-full h-2 bg-black border border-primary/30 mb-4 rounded overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-1 text-foreground/80 h-[160px] flex flex-col justify-end">
        {logs.map((log, i) => (
          <p key={i} className="animate-fade-in">&gt; {log}</p>
        ))}
        {complete && <p className="text-secondary font-bold mt-2 animate-pulse">&gt; SCAN_COMPLETE. ALL SYSTEMS OPERATIONAL.</p>}
      </div>
    </div>
  );
}
