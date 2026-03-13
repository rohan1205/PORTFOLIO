"use client";

import { useState, useEffect, useRef } from "react";
import { useOS } from "@/components/OSProvider";

type CommandEntry = {
  command: string;
  output: React.ReactNode | string;
};

export default function TerminalApp() {
  const { setTheme, matrixMode, setMatrixMode, openApp, triggerBsod, triggerHackGlitch } = useOS();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [heroText, setHeroText] = useState("");
  const [isHeroTyping, setIsHeroTyping] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, heroText]);

  // Focus terminal input
  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  useEffect(() => {
    const text = 'Rohan Yadav.\nSoftware Engineer | AI Systems | Full Stack Developer\n\nType "help" to see available commands.';
    let i = 0;
    const intervalId = setInterval(() => {
      setHeroText(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(intervalId);
        setIsHeroTyping(false);
      }
    }, 40); // Slightly faster typing for OS feel
    return () => clearInterval(intervalId);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isHeroTyping) return;

    const cmdLine = input.trim();
    if (!cmdLine) return;

    const args = cmdLine.split(" ").filter(Boolean);
    const cmd = args[0].toLowerCase();

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="mt-2 mb-4 space-y-1 text-foreground/90 font-mono">
            <p className="text-primary-bright font-bold mb-2">OS CORE COMMANDS:</p>
            <p><span className="text-secondary w-32 inline-block font-bold">help</span> Show available commands</p>
            <p><span className="text-secondary w-32 inline-block font-bold">about</span> Identify system operator</p>
            <p><span className="text-secondary w-32 inline-block font-bold">skills</span> List technical competencies</p>
            <p><span className="text-secondary w-32 inline-block font-bold">experience</span> Show operational history</p>
            <p><span className="text-secondary w-32 inline-block font-bold">certs</span> Display active certifications</p>
            <p><span className="text-secondary w-32 inline-block font-bold">clear</span> Purge terminal output</p>
            <p><span className="text-secondary w-32 inline-block font-bold">neofetch</span> Print system information</p>
            
            <p className="text-primary-bright font-bold mt-4 mb-2">GUI EXECUTABLES:</p>
            <p><span className="text-secondary w-32 inline-block font-bold">projects or ls</span> Open project directory window</p>
            <p><span className="text-secondary w-32 inline-block font-bold">contact</span> Open secure comms window</p>
            <p><span className="text-secondary w-32 inline-block font-bold">open &lt;app&gt;</span> Launch app (snake, tictactoe, ascii, scan, github)</p>
            <p><span className="text-secondary w-32 inline-block font-bold">theme &lt;name&gt;</span> Switch UI: cyber, minimal</p>
            <p><span className="text-secondary w-32 inline-block font-bold">matrix</span> Toggle visual matrix data stream</p>
          </div>
        );
        break;
      case "about":
        output = (
          <div className="mt-4 mb-4 space-y-2 text-foreground/80 font-mono border-l-2 border-primary/50 pl-4 py-2">
            <p>I am a Software Engineer specializing in scalable full-stack applications and AI-driven solutions.</p>
            <p>I build intelligent systems that bridge complex backend logic with beautiful, immersive user interfaces.</p>
            <p>Currently deep-diving into Agentic AI, high-performance distributed systems, and creative web engineering.</p>
          </div>
        );
        break;
      case "neofetch":
        output = (
          <div className="mt-4 mb-4 flex gap-8 font-mono text-sm">
            <pre className="text-primary-bright leading-tight">
{`       /\\        
      /  \\       
     /\\   \\      
    /  ____\\     
   /  /    \\     
  / __\\     \\    
 /___________\\   
                 
 ████████████    
 ████████████`}
            </pre>
            <div className="space-y-1">
              <p className="text-primary-bright font-bold">rohan@rohan-os</p>
              <p>──────────────</p>
              <p><span className="text-secondary font-bold">OS:</span> RohanOS 3.0.1</p>
              <p><span className="text-secondary font-bold">Kernel:</span> Passion 5.1</p>
              <p><span className="text-secondary font-bold">Uptime:</span> Infinite</p>
              <p><span className="text-secondary font-bold">Shell:</span> bash</p>
              <p><span className="text-secondary font-bold">Memory:</span> Coffee / 16384MiB</p>
              <p><span className="text-secondary font-bold">Languages:</span> Python, Go, TypeScript</p>
            </div>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="mt-4 mb-4 space-y-4 font-mono text-sm max-w-xl">
            {/* Animated skill bars could go here, for now keeping it simple */}
            <div>
              <p className="text-primary-bright mb-1">Python / AI</p>
              <div className="w-full bg-black border border-primary/30 h-2"><div className="bg-primary h-full w-[95%]"></div></div>
            </div>
            <div>
              <p className="text-primary-bright mb-1">React / Next.js</p>
              <div className="w-full bg-black border border-primary/30 h-2"><div className="bg-primary h-full w-[90%]"></div></div>
            </div>
            <div>
              <p className="text-primary-bright mb-1">Cloud / AWS</p>
              <div className="w-full bg-black border border-primary/30 h-2"><div className="bg-primary h-full w-[85%]"></div></div>
            </div>
            <div>
              <p className="text-primary-bright mb-1">Cybersecurity (SIEM)</p>
              <div className="w-full bg-black border border-primary/30 h-2"><div className="bg-primary h-full w-[80%]"></div></div>
            </div>
          </div>
        );
        break;
      case "experience":
      case "certs":
        output = <span className="text-secondary mt-2 mb-4 block">Loading data payloads... (Under construction)</span>;
        break;
      case "projects":
      case "ls":
        openApp("projects");
        output = <span className="text-secondary mt-2 mb-4 block font-mono">Launching Projects GUI...</span>;
        break;
      case "contact":
        openApp("contact");
        output = <span className="text-secondary mt-2 mb-4 block font-mono">Launching secure comms GUI...</span>;
        break;
      case "open":
        const target = args[1];
        if (["snake", "tictactoe", "scan", "ascii", "github"].includes(target)) {
          openApp(target);
          output = <span className="text-secondary mt-2 mb-4 block font-mono">Executing GUI payload: {target}...</span>;
        } else {
          output = <span className="text-red-500 mt-2 mb-4 block font-mono">Error: Application '{target}' not found in registry.</span>;
        }
        break;
      case "sudo":
        if (args[1] === "hire" && args[2] === "rohan") {
          output = <span className="text-primary-bright mt-2 mb-4 block font-bold text-lg animate-pulse">INITIATING HIRING PROTOCOL... (Resume download starting)</span>;
          // Trigger actual download here
        } else if (args[1] === "rm" && args[2] === "-rf") {
          triggerBsod();
          output = <span className="text-red-500">FATAL ERROR</span>;
        } else {
          output = <span className="text-red-500 mt-2 mb-4 block font-mono">rohan is not in the sudoers file. This incident will be reported.</span>;
        }
        break;
      case "hack":
        triggerHackGlitch();
        output = <span className="text-primary-bright mt-2 mb-4 block font-mono animate-pulse">OVERRIDING MAINFRAME...</span>;
        break;
      case "coffee":
        output = <span className="text-[#FFAA00] mt-2 mb-4 block font-mono">Brewing... ☕ Done. Caffeination level 100%.</span>;
        break;
      case "cat":
        if (args[1] === "resume.pdf") {
          output = <span className="text-secondary mt-2 mb-4 block font-mono">Reading binary file... (Please use GUI or download instead. This is text only.)</span>;
        } else {
          output = <span className="text-red-500 mt-2 mb-4 block font-mono">cat: {args[1]}: No such file or directory</span>;
        }
        break;
      case "rohan":
        output = (
          <pre className="text-primary-bright mt-4 mb-4 font-mono text-xs leading-tight">
{`   _____      _                 
  |  __ \\    | |                
  | |__) |___| |__   __ _ _ __  
  |  _  // _ \\ '_ \\ / _\` | '_ \\ 
  | | \\ \\  __/ | | | (_| | | | |
  |_|  \\_\\___|_| |_|\\__,_|_| |_|
                                
`}
          </pre>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        setHistoryIndex(-1);
        return;
      case "matrix":
        setMatrixMode(!matrixMode);
        output = <span className="text-secondary mt-2 mb-4 block font-mono">Matrix background {matrixMode ? "disabled" : "enabled"}.</span>;
        break;
      case "theme":
        const newTheme = args[1];
        if (newTheme === "cyber" || newTheme === "minimal") {
          setTheme(newTheme);
          output = <span className="text-secondary mt-2 mb-4 block font-mono">Theme applied: {newTheme}</span>;
        } else {
          output = <span className="text-red-500 mt-2 mb-4 block font-mono">Error: Theme '{newTheme}' invalid.</span>;
        }
        break;
      case "":
        break;
      default:
        output = <span className="text-red-500 mt-2 mb-4 block font-mono">Unrecognized command: '{cmd}'. Type 'help'.</span>;
    }

    const commandStr = cmdLine;
    setHistory((prev) => {
      const newHist = [...prev, { command: commandStr, output }];
      setHistoryIndex(newHist.length - 1); // Set index to the newly added item (or after if doing UP arrow logic)
      return newHist;
    });
    setHistoryIndex(-1); // Resets for up/down arrow usage
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        if (historyIndex === -1) {
          // If at bottom, go to last
          const idx = history.length - 1;
          setHistoryIndex(idx);
          setInput(history[idx].command);
        } else if (historyIndex > 0) {
          const idx = historyIndex - 1;
          setHistoryIndex(idx);
          setInput(history[idx].command);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        if (historyIndex < history.length - 1) {
          const idx = historyIndex + 1;
          setHistoryIndex(idx);
          setInput(history[idx].command);
        } else {
          setHistoryIndex(-1);
          setInput("");
        }
      }
    }
  };

  return (
    <div className="w-full h-full p-4 font-mono text-sm leading-relaxed overflow-x-hidden pt-6 pl-4" onClick={() => inputRef.current?.focus()}>
      
      {/* Intro sequence */}
      <div className="mb-8 whitespace-pre-wrap text-foreground/90 leading-loose">
        {heroText}
        {isHeroTyping && <span className="inline-block w-2-h-4 bg-primary-bright ml-1 animate-pulse" />}
      </div>

      {/* History Stream */}
      <div className="space-y-4">
        {history.map((entry, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 text-primary">
              <span className="font-bold select-none text-primary-bright">rohan@os ~ $</span>
              <span>{entry.command}</span>
            </div>
            {entry.output && <div>{entry.output}</div>}
          </div>
        ))}
      </div>

      {/* Input Line */}
      {!isHeroTyping && (
        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4">
          <span className="font-bold text-primary-bright select-none whitespace-nowrap">rohan@os ~ $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-foreground font-mono"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      )}

      {/* Invisible anchor to scroll down */}
      <div ref={terminalEndRef} className="h-4" />
    </div>
  );
}
