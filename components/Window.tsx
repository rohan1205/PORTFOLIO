"use client";

import { motion, useDragControls } from "framer-motion";
import { useOS, AppWindow } from "./OSProvider";
import { ReactNode } from "react";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  app: AppWindow;
  children: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
}

export default function Window({ app, children, defaultWidth = 800, defaultHeight = 600 }: WindowProps) {
  const { focusApp, closeApp, minimizeApp } = useOS();
  const dragControls = useDragControls();

  if (!app.isOpen || app.isMinimized) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onPointerDown={() => focusApp(app.id)}
      style={{
        zIndex: app.zIndex,
        width: defaultWidth,
        height: defaultHeight,
      }}
      className={`absolute top-[10%] left-[10%] flex flex-col glass-panel overflow-hidden border ${
        app.isFocused ? "border-primary-bright shadow-[0_0_20px_rgba(0,255,65,0.15)]" : "border-border-base shadow-lg opacity-90"
      }`}
    >
      {/* Title Bar - Drag Handle */}
      <div
        onPointerDown={(e) => {
          dragControls.start(e);
          focusApp(app.id);
        }}
        className={`h-10 flex items-center justify-between px-3 cursor-grab active:cursor-grabbing border-b ${
          app.isFocused ? "bg-surface border-primary/30" : "bg-background border-border-base"
        }`}
      >
        <div className="flex items-center gap-2 text-primary font-mono text-sm font-bold select-none tracking-wider uppercase">
          {app.title}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => minimizeApp(app.id)}
            className="p-1 hover:bg-white/10 text-foreground/50 hover:text-foreground rounded transition-colors"
          >
            <Minus size={14} />
          </button>
          <button
            className="p-1 hover:bg-white/10 text-foreground/50 hover:text-foreground rounded transition-colors disabled:opacity-50"
            disabled
          >
            <Square size={13} />
          </button>
          <button
            onClick={() => closeApp(app.id)}
            className="p-1 hover:bg-red-500/80 text-foreground/50 hover:text-white rounded transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-[#050A05]/90 overflow-auto relative custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
}
