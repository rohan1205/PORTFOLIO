"use client";

import { useState } from "react";
import { useOS } from "../OSProvider";

export default function ContactApp() {
  const { closeApp } = useOS();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ to: "rohan@rohan-os.sys", subject: "", message: "" });
  const [logs, setLogs] = useState<string[]>([]);

  const handleSend = () => {
    setStep(1);
    const sequence = [
      { text: "Establishing SSH connection (port 22)...", delay: 500 },
      { text: "Connection verified.", delay: 1200 },
      { text: "Encrypting message payload... OK [RSA-4096]", delay: 2000 },
      { text: "Routing via highly secure proxy nodes...", delay: 3000 },
      { text: "Message delivered. Reply ETA: 24h ✓", delay: 4200 },
    ];

    sequence.forEach(({ text, delay }) => {
      setTimeout(() => setLogs((prev) => [...prev, text]), delay);
    });

    setTimeout(() => {
      setStep(2);
    }, 5500);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#050A05] font-mono text-sm text-foreground p-6">
      <div className="mb-6 flex items-center justify-between border-b border-border-base pb-4">
        <div>
          <h2 className="text-xl text-primary-bright font-bold tracking-widest uppercase">Secure Comms Protocol</h2>
          <p className="text-foreground/50 text-xs mt-1">End-to-End Encryption Enabled</p>
        </div>
        <div className="text-right text-xs">
          <p className="text-text-muted">SERVER: ACTIVE</p>
          <p className="text-primary">LATENCY: 12ms</p>
        </div>
      </div>

      {step === 0 && (
        <div className="animate-fade-in space-y-4 max-w-2xl">
          <div className="flex items-center gap-4">
            <span className="w-20 text-text-muted">TO:</span>
            <input type="text" value={form.to} readOnly className="flex-1 bg-black/40 border-none outline-none text-primary pointer-events-none" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-text-muted">SUBJECT:</span>
            <input 
              type="text" 
              value={form.subject} 
              onChange={e => setForm({...form, subject: e.target.value})} 
              className="flex-1 bg-surface border border-border-base p-2 outline-none focus:border-primary transition-colors text-foreground" 
              placeholder="Enter subject..."
            />
          </div>
          <div className="flex gap-4">
            <span className="w-20 text-text-muted pt-2">PAYLOAD:</span>
            <textarea 
              value={form.message} 
              onChange={e => setForm({...form, message: e.target.value})} 
              className="flex-1 bg-surface border border-border-base p-2 outline-none focus:border-primary transition-colors text-foreground min-h-[200px] resize-none" 
              placeholder="> Type your message here..."
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button onClick={() => closeApp("contact")} className="px-6 py-2 border border-border-base text-text-muted hover:text-foreground hover:bg-surface transition-colors">
              [ CANCEL ]
            </button>
            <button 
              onClick={handleSend}
              disabled={!form.subject || !form.message}
              className="px-6 py-2 bg-primary/10 border border-primary text-primary-bright hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              [ TRANSMIT ]
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-fade-in flex-1 flex flex-col justify-center items-center text-center max-w-lg mx-auto w-full">
          <div className="w-full h-8 bg-surface border border-border-base rounded flex items-center px-1 mb-8 overflow-hidden relative">
            <div className="h-4 bg-primary rounded animate-pulse w-full"></div>
            <div className="absolute inset-0 bg-[url('/scanline.png')] bg-repeat opacity-20 pointer-events-none mix-blend-overlay"></div>
          </div>
          <div className="w-full text-left space-y-2 h-[120px] flex flex-col justify-end">
            {logs.map((log, i) => (
              <p key={i} className="text-secondary animate-fade-in">&gt; {log}</p>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in flex-1 flex flex-col justify-center items-center text-center">
          <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center text-4xl text-primary-bright mb-6 shadow-[0_0_30px_rgba(0,255,65,0.2)]">
            ✓
          </div>
          <h3 className="text-2xl text-primary-bright font-bold mb-2">TRANSMISSION SUCCESSFUL</h3>
          <p className="text-foreground/70 mb-8 max-w-md">Your message has been securely sent. Look out for a reply on your provided channels.</p>
          <button onClick={() => closeApp("contact")} className="px-8 py-3 bg-surface border border-primary text-primary hover:bg-primary/20 transition-colors">
            CLOSE INTERFACE
          </button>
        </div>
      )}
    </div>
  );
}
