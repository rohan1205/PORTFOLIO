"use client";

import { useState, useEffect, useRef } from "react";
import { useOS } from "@/components/OSProvider";
import SnakeGame from "@/components/apps/SnakeGame";
import TicTacToe from "@/components/apps/TicTacToe";
import SystemScan from "@/components/apps/SystemScan";
import AsciiArt from "@/components/apps/AsciiArt";
import GithubStats from "@/components/apps/GithubStats";

type CommandEntry = {
  command: string;
  output: React.ReactNode;
};

export default function Terminal() {
  const { theme, setTheme, matrixMode, setMatrixMode } = useOS();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandEntry[]>([]);
  const [heroText, setHeroText] = useState("");
  const [isHeroTyping, setIsHeroTyping] = useState(true);
  
  const fullHeroText = "Rohan Yadav\nSoftware Engineer | AI Systems | Full Stack Developer\n\nType \"help\" to explore";
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentText = "";
    let i = 0;
    const typingInterval = setInterval(() => {
      currentText += fullHeroText[i];
      setHeroText(currentText);
      i++;
      if (i === fullHeroText.length) {
        clearInterval(typingInterval);
        setIsHeroTyping(false);
      }
    }, 40);
    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const focusInput = () => {
      if (!isHeroTyping && inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener("click", focusInput);
    focusInput(); 
    return () => document.removeEventListener("click", focusInput);
  }, [isHeroTyping]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, heroText]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isHeroTyping) return;

    const cmdLine = input.trim();
    const args = cmdLine.split(" ").filter(Boolean);
    const cmd = args[0].toLowerCase();
    
    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="mt-2 mb-4 space-y-1 text-foreground/90">
            <p><span className="text-secondary w-32 inline-block font-bold">help</span> Show available commands</p>
            <p><span className="text-secondary w-32 inline-block font-bold">about</span> Identify system operator</p>
            <p><span className="text-secondary w-32 inline-block font-bold">skills</span> List technical competencies</p>
            <p><span className="text-secondary w-32 inline-block font-bold">projects</span> Access project directory</p>
            <p><span className="text-secondary w-32 inline-block font-bold">open &lt;id&gt;</span> Inspect specific project</p>
            <p><span className="text-secondary w-32 inline-block font-bold">experience</span> Show operational history</p>
            <p><span className="text-secondary w-32 inline-block font-bold">certs</span> Display active certifications</p>
            <p><span className="text-secondary w-32 inline-block font-bold">resume</span> Download mission payload</p>
            <p><span className="text-secondary w-32 inline-block font-bold">contact</span> Open secure comms</p>
            <p><span className="text-secondary w-32 inline-block font-bold">clear</span> Purge terminal output</p>
            <br />
            <p className="text-accent mb-2 tracking-widest text-sm uppercase">Applications & Games_</p>
            <p><span className="text-secondary w-32 inline-block font-bold">snake</span> Launch retro snake game</p>
            <p><span className="text-secondary w-32 inline-block font-bold">tictactoe</span> Play vs simple AI</p>
            <p><span className="text-secondary w-32 inline-block font-bold">matrix</span> Toggle visual matrix data stream</p>
            <p><span className="text-secondary w-32 inline-block font-bold">scan</span> Initialize network scan sim</p>
            <p><span className="text-secondary w-32 inline-block font-bold">ascii</span> Load 3D ASCII graphics</p>
            <p><span className="text-secondary w-32 inline-block font-bold">github</span> Fetch real-time live metrics</p>
            <p><span className="text-secondary w-32 inline-block font-bold">theme &lt;name&gt;</span> Switch UI: cyber, matrix, minimal</p>
          </div>
        );
        break;
      case "about":
        output = (
          <div className="mt-2 mb-4 text-foreground/90 max-w-2xl font-sans text-lg leading-relaxed">
            <p>I am a software engineer focused on building robust AI systems and scalable web applications. 
            My passion lies at the intersection of complex architectural design and minimalist, highly functional interfaces.</p>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="mt-4 mb-4 space-y-5 bg-black/40 p-6 glass-panel border-l-2 border-secondary/50">
            <div>
              <h3 className="text-secondary font-bold mb-2 tracking-widest text-sm uppercase">Programming Languages</h3>
              <div className="text-foreground/90 flex flex-wrap gap-3 font-mono text-sm border-b border-primary/20 pb-4">
                <span>[ Python ]</span> <span>[ Java ]</span> <span>[ JavaScript ]</span> <span>[ SQL ]</span> <span>[ PowerShell ]</span>
              </div>
            </div>
            <div>
              <h3 className="text-secondary font-bold mb-2 pt-2 tracking-widest text-sm uppercase">Full Stack Development</h3>
              <div className="text-foreground/90 flex flex-wrap gap-3 font-mono text-sm border-b border-primary/20 pb-4">
                <span>[ React.js ]</span> <span>[ FastAPI ]</span> <span>[ Flask ]</span> <span>[ HTML/CSS ]</span> <span>[ Tailwind ]</span> <span>[ REST APIs ]</span>
              </div>
            </div>
            <div>
              <h3 className="text-secondary font-bold mb-2 pt-2 tracking-widest text-sm uppercase">AI & Machine Learning</h3>
              <div className="text-foreground/90 flex flex-wrap gap-3 font-mono text-sm border-b border-primary/20 pb-4">
                <span>[ PyTorch ]</span> <span>[ TensorFlow ]</span> <span>[ Keras ]</span> <span>[ Scikit-learn ]</span> <span>[ OpenCV ]</span>
              </div>
            </div>
            <div>
              <h3 className="text-secondary font-bold mb-2 pt-2 tracking-widest text-sm uppercase">Generative AI & NLP</h3>
              <div className="text-foreground/90 flex flex-wrap gap-3 font-mono text-sm border-b border-primary/20 pb-4">
                <span>[ LangChain ]</span> <span>[ OpenAI API ]</span> <span>[ Hugging Face ]</span> <span>[ BERT ]</span> <span>[ RAG ]</span> <span>[ LLM Fine-tuning ]</span> <span>[ Agentic AI ]</span>
              </div>
            </div>
            <div>
              <h3 className="text-secondary font-bold mb-2 pt-2 tracking-widest text-sm uppercase">Databases & Cloud/DevOps</h3>
              <div className="text-foreground/90 flex flex-wrap gap-3 font-mono text-sm border-b border-primary/20 pb-4">
                <span>[ MongoDB ]</span> <span>[ PostgreSQL ]</span> <span>[ MySQL ]</span> <span>[ Supabase ]</span> <span>[ AWS ]</span> <span>[ Docker ]</span> <span>[ CI/CD ]</span> <span>[ Jenkins ]</span>
              </div>
            </div>
            <div>
              <h3 className="text-secondary font-bold mb-2 pt-2 tracking-widest text-sm uppercase">Cybersecurity & Data Eng</h3>
              <div className="text-foreground/90 flex flex-wrap gap-3 font-mono text-sm">
                <span>[ SIEM/IDS/IPS ]</span> <span>[ OWASP ]</span> <span>[ Penetration Testing ]</span> <span>[ ETL Pipelines ]</span> <span>[ Real-time Data Streaming ]</span>
              </div>
            </div>
          </div>
        );
        break;
      case "projects":
        output = (
          <div className="mt-4 mb-4 p-4 glass-panel border border-primary/20 bg-black/60">
            <p className="text-accent mb-4 font-bold tracking-widest uppercase">Available Constructs_</p>
            <ul className="space-y-3 font-sans text-lg">
              <li className="flex gap-4 items-center">
                <span className="text-secondary font-mono font-bold w-8">[1]</span> 
                <span className="font-bold text-foreground">Cyber-Sentry</span>
                <span className="text-foreground/40 text-sm">- SOC/SIEM Platform</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="text-secondary font-mono font-bold w-8">[2]</span> 
                <span className="font-bold text-foreground">NeuraAttend</span>
                <span className="text-foreground/40 text-sm">- AI Attendance System</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="text-secondary font-mono font-bold w-8">[3]</span> 
                <span className="font-bold text-foreground">AI Mental Health Chatbot</span>
                <span className="text-foreground/40 text-sm">- NLP Support Agent</span>
              </li>
            </ul>
            <p className="mt-6 text-accent/80 font-mono text-sm animate-pulse">&gt; Type 'open &lt;id&gt;' to inspect</p>
          </div>
        );
        break;
      case "open":
        const id = args[1];
        const projects: Record<string, {name: string, desc: string, tech: string, github: string, metrics: string}> = {
          "1": { name: "Cyber-Sentry", desc: "Built a cloud-native SOC/SIEM platform to ingest and analyze system/network security logs in real time. Implemented threat scoring and incident visualization dashboards to prioritize incidents.", tech: "React.js, FastAPI, Python, Scikit-learn, AWS (EC2, S3, Lambda), MongoDB", github: "github.com/rohan/cyber-sentry", metrics: "Real-time log analysis and robust threat scoring." },
          "2": { name: "NeuraAttend", desc: "AI-Powered smart attendance system using OpenCV face recognition and deep learning (DNN and Haar Cascade). Includes a React dashboard and Supabase for duplicate prevention.", tech: "React.js, FastAPI, OpenCV, Python, Deep Learning (CNN), Supabase, REST APIs", github: "github.com/rohan/neuraattend", metrics: "Highly automated duplicate prevention." },
          "3": { name: "AI Mental Health Chatbot", desc: "Developed an AI chatbot providing emotional support and mental health resource guidance. Integrated multilingual translation for cross-language communication.", tech: "Python, Flask, BERT, NLP, Transformers, Multilingual Translation APIs", github: "github.com/rohan/chatbot", metrics: "Global reach via translation integration." }
        };
        const p = projects[id];
        if (!p) {
          output = <span className="text-accent mt-2 mb-4 block">Error: Construct ID '{id}' not found. Verify ID and try again.</span>;
        } else {
          output = (
            <div className="mt-4 mb-4 p-6 border-l-4 border-accent bg-black/80 glass-panel max-w-3xl transform transition-all shadow-[0_0_30px_rgba(0,255,65,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <h3 className="text-3xl font-bold font-display text-primary mb-3 neon-text">{p.name}</h3>
              <p className="text-foreground/90 mb-6 font-sans leading-relaxed text-lg">{p.desc}</p>
              <div className="space-y-3 text-sm font-mono text-foreground/80 bg-black/40 p-4 rounded border border-primary/10">
                <p className="flex"><span className="text-secondary w-24 shrink-0">TECH:</span> <span>{p.tech}</span></p>
                <p className="flex"><span className="text-secondary w-24 shrink-0">METRICS:</span> <span>{p.metrics}</span></p>
                <p className="flex"><span className="text-secondary w-24 shrink-0">GITHUB:</span> <a href={`https://${p.github}`} target="_blank" className="underline hover:text-accent transition-colors">{p.github}</a></p>
              </div>
            </div>
          );
        }
        break;
      case "experience":
        output = (
          <div className="mt-4 mb-4 space-y-8 max-w-2xl bg-black/40 p-6 glass-panel border border-primary/20">
            <div className="border-l border-primary/30 pl-6 relative">
              <div className="absolute w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(0,255,65,0.8)] -left-[6px] top-1"></div>
              <h3 className="text-xl font-bold text-foreground font-sans">Software Engineer Intern <span className="text-secondary text-base font-mono ml-2">@ Napino IT</span></h3>
              <p className="text-sm text-foreground/50 font-mono mb-3">May 2025 - Jul 2025</p>
              <p className="text-base font-sans text-foreground/80 leading-relaxed">Engineered microservices for enterprise automation.</p>
            </div>
            <div className="border-l border-primary/30 pl-6 relative">
              <div className="absolute w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_rgba(26,79,92,0.8)] -left-[6px] top-1"></div>
              <h3 className="text-xl font-bold text-foreground font-sans">Web Dev Engineer <span className="text-secondary text-base font-mono ml-2">@ Flyjone</span></h3>
              <p className="text-sm text-foreground/50 font-mono mb-3">Feb 2024 - Aug 2024</p>
              <p className="text-base font-sans text-foreground/80 leading-relaxed">Optimized frontend performance, achieving a 40% reduction in load times.</p>
            </div>
          </div>
        );
        break;
      case "resume":
        output = (
          <div className="mt-4 mb-6">
            <p className="text-foreground/80 mb-4 font-sans text-lg">Downloading securely encrypted payload...</p>
            <a href="/resume.pdf" target="_blank" className="font-mono inline-block px-6 py-3 border-2 border-secondary text-secondary hover:bg-secondary hover:text-black transition-all shadow-[0_0_15px_rgba(26,79,92,0.3)] hover:shadow-[0_0_25px_rgba(26,79,92,0.6)]">
              [ ACCESS_RESUME.pdf ]
            </a>
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="mt-4 mb-4 p-6 glass-panel border border-primary/20 bg-black/60 max-w-lg">
            <p className="text-accent mb-6 font-bold uppercase tracking-wider">Secure comms link established_</p>
            <div className="space-y-4 font-mono text-lg flex flex-col">
              <p className="flex items-center"><span className="text-secondary w-28">Email:</span> <a href="mailto:rohanydv1305@gmail.com" className="hover:text-accent transition-colors underline decoration-primary/50 underline-offset-4">rohanydv1305@gmail.com</a></p>
              <p className="flex items-center"><span className="text-secondary w-28">LinkedIn:</span> <a href="https://www.linkedin.com/in/rohan-yadav-433601313/" target="_blank" className="hover:text-accent transition-colors underline decoration-primary/50 underline-offset-4">/in/rohan-yadav-433601313</a></p>
              <p className="flex items-center"><span className="text-secondary w-28">GitHub:</span> <a href="https://github.com/rohan1205" target="_blank" className="hover:text-accent transition-colors underline decoration-primary/50 underline-offset-4">rohan1205</a></p>
            </div>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "snake":
        output = <SnakeGame />;
        break;
      case "tictactoe":
        output = <TicTacToe />;
        break;
      case "scan":
        output = <SystemScan />;
        break;
      case "ascii":
        output = <AsciiArt />;
        break;
      case "github":
        output = <GithubStats />;
        break;
      case "matrix":
        setMatrixMode(!matrixMode);
        output = <span className="text-secondary mt-2 mb-4 block font-mono">Matrix simulation {matrixMode ? "offline" : "online"}.</span>;
        break;
      case "theme":
        const newTheme = args[1];
        if (newTheme === "cyber" || newTheme === "matrix" || newTheme === "minimal") {
          setTheme(newTheme);
          output = <span className="text-secondary mt-2 mb-4 block font-mono">Theme applied: {newTheme}</span>;
        } else {
          output = <span className="text-accent mt-2 mb-4 block font-mono">Error: Theme '{newTheme}' invalid. Try: cyber, matrix, minimal.</span>;
        }
        break;
      case "":
        break;
      default:
        output = <span className="text-accent mt-2 mb-4 block font-bold">Unrecognized command: '{cmd}'. Type 'help' for available directives.</span>;
    }

    setHistory((prev) => [...prev, { command: cmdLine, output }]);
    setInput("");
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end p-6 md:p-12 pb-24 font-mono pointer-events-none">
      <div className="w-full max-w-5xl mx-auto h-full flex flex-col pointer-events-auto">
        
        {/* Output Stream */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-6 flex flex-col justify-start mt-auto">
          <div className="flex flex-col justify-end min-h-full">
            <div className="space-y-4">
              
              {/* Hero Initialization */}
              <div className="mb-12 p-8 bg-black/60 border border-primary/10 rounded-lg shadow-2xl backdrop-blur-md">
                <pre className="whitespace-pre-wrap text-2xl md:text-5xl font-bold font-display text-primary leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{heroText}</span>
                  {isHeroTyping && <span className="animate-pulse text-accent ml-2">_</span>}
                </pre>
              </div>

              {/* History Loop */}
              {history.map((entry, i) => (
                <div key={i} className="mb-8">
                  <div className="flex items-center gap-3 text-foreground/80 font-bold mb-3 text-xl">
                    <span className="text-accent">guest@rohan-os</span>
                    <span className="text-foreground/50">~</span>
                    <span className="text-foreground">{entry.command}</span>
                  </div>
                  <div className="ml-6 flex items-start relative">
                    {/* Vertical guideline */}
                    <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-primary/10"></div>
                    <div className="w-full">{entry.output}</div>
                  </div>
                </div>
              ))}

              <div ref={endRef} />
            </div>
          </div>
        </div>

        {/* Command Input Filter */}
        {!isHeroTyping && (
          <div className="mt-4 shrink-0 transition-opacity duration-500 opacity-100">
            <form onSubmit={handleCommand} className="flex items-center gap-4 text-2xl bg-black/80 px-6 py-5 border border-secondary/30 rounded-xl shadow-[0_0_20px_rgba(26,79,92,0.2)] focus-within:shadow-[0_0_30px_rgba(0,255,65,0.3)] focus-within:border-accent/60 transition-all relative group backdrop-blur-md">
              <span className="text-accent font-bold whitespace-nowrap">guest@rohan-os<span className="text-foreground/50"> ~ $</span></span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-foreground font-mono placeholder:text-foreground/20 pt-1"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-8 bg-accent opacity-0 group-focus-within:animate-pulse group-focus-within:opacity-100 pointer-events-none"></span>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
