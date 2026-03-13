"use client";

import { useState } from "react";

const projects = [
  {
    id: "1",
    name: "Cyber-Sentry",
    desc: "Built a cloud-native SOC/SIEM platform to ingest and analyze system/network security logs in real time. Implemented threat scoring and incident visualization dashboards to prioritize incidents.",
    tech: ["React", "FastAPI", "Python", "AWS", "MongoDB", "Scikit-Learn"],
    github: "https://github.com/rohan1205/cyber-threat-log-analytics-platform.git",
    demo: "sentry.rohanos.fake",
    codeSnippet: `def analyze_threat(payload):\n  scores = model.predict(payload)\n  return {"severity": "CRITICAL", "score": scores[0]}`
  },
  {
    id: "2",
    name: "NeuraAttend",
    desc: "AI-Powered smart attendance system using OpenCV face recognition and deep learning (DNN and Haar Cascade). Includes a React dashboard and Supabase for duplicate prevention.",
    tech: ["React.js", "FastAPI", "OpenCV", "Deep Learning", "Supabase"],
    github: "https://github.com/rohan1205/NeuraAttend.git",
    demo: "attend.rohanos.fake",
    codeSnippet: `const detectFace = (frame) => {\n  const results = await cvModel.detect(frame);\n  return results.length > 0;\n}`
  },
  {
    id: "3",
    name: "AI Mental Health Chatbot",
    desc: "Developed an AI chatbot providing emotional support and mental health resource guidance. Integrated multilingual translation for cross-language communication.",
    tech: ["Python", "Flask", "BERT", "NLP", "Transformers"],
    github: "https://github.com/rohan1205/Medical_Chatbot.git",
    demo: "chat.rohanos.fake",
    codeSnippet: `@app.route('/ask')\ndef chat():\n  ctx = get_embeddings(request.text)\n  return gpt.generate(ctx)`
  }
];

export default function ProjectsApp() {
  const [selectedProjectId, setSelectedProjectId] = useState("1");

  const project = projects.find((p) => p.id === selectedProjectId)!;

  return (
    <div className="flex h-full w-full bg-background font-sans text-sm">
      {/* Sidebar - Project List */}
      <div className="w-1/3 border-r border-border-base bg-[#050A05] flex flex-col">
        <div className="p-4 border-b border-border-base font-bold text-primary-bright tracking-widest uppercase">
          Directory_ /projects
        </div>
        <div className="flex-1 overflow-auto">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className={`w-full text-left px-4 py-3 border-b border-border-base/50 transition-colors
                ${selectedProjectId === p.id ? "bg-surface text-primary-bright border-l-4 border-l-primary" : "text-foreground/70 hover:bg-white/5"}
              `}
            >
              <div className="font-bold">{p.name}</div>
              <div className="text-xs opacity-50 font-mono mt-1 w-full truncate">{p.tech.join(", ")}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-background relative">
        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-4">{project.name}</h2>
            <p className="text-foreground/80 leading-relaxed mb-6">{project.desc}</p>

            <div className="mb-6">
              <p className="text-primary-bright font-mono text-xs mb-2 uppercase">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-1 bg-surface border border-primary/20 rounded font-mono text-xs text-primary">{t}</span>
                ))}
              </div>
            </div>

            <div className="font-mono text-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-text-muted">GIT:</span>
                <a href={project.github} target="_blank" className="text-blue-accent hover:underline">{project.github}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
