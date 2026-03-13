"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

type Theme = "cyber" | "matrix" | "minimal" | "secret";

export interface AppWindow {
  id: string;
  title: string;
  componentId: string; // "terminal", "snake", "projects", etc
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  zIndex: number;
}

interface OSContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  matrixMode: boolean; // Controls whether matrix rain is on (default true in RohanOS)
  setMatrixMode: (m: boolean) => void;
  
  // Window Management
  windows: AppWindow[];
  openApp: (id: string, title?: string) => void;
  closeApp: (id: string) => void;
  focusApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  
  // OS Event States
  easterEggFlags: {
    bsod: boolean;
    hackGlitch: boolean;
  };
  triggerBsod: () => void;
  triggerHackGlitch: () => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("cyber");
  const [matrixMode, setMatrixMode] = useState(true); // Default ON for RohanOS at 15% opacity
  const [windows, setWindows] = useState<AppWindow[]>([{
    id: "terminal", 
    title: "Terminal", 
    componentId: "terminal", 
    isOpen: true, 
    isMinimized: false, 
    isFocused: true, 
    zIndex: 10 
  }]);
  const [topZ, setTopZ] = useState(10);
  
  const [easterEggFlags, setEasterEggFlags] = useState({ bsod: false, hackGlitch: false });

  const triggerBsod = useCallback(() => {
    setEasterEggFlags(prev => ({ ...prev, bsod: true }));
    setTimeout(() => {
      setEasterEggFlags(prev => ({ ...prev, bsod: false }));
    }, 3000);
  }, []);

  const triggerHackGlitch = useCallback(() => {
    setEasterEggFlags(prev => ({ ...prev, hackGlitch: true }));
    setTimeout(() => {
      setEasterEggFlags(prev => ({ ...prev, hackGlitch: false }));
    }, 3000);
  }, []);

  const openApp = useCallback((id: string, title: string = id) => {
    setTopZ((z) => z + 1);
    setWindows((prev) => {
      const existing = prev.find(w => w.id === id);
      if (existing) {
        return prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false, isFocused: true, zIndex: topZ + 1 } : { ...w, isFocused: false });
      }
      return [
        ...prev.map(w => ({ ...w, isFocused: false })),
        { id, title, componentId: id, isOpen: true, isMinimized: false, isFocused: true, zIndex: topZ + 1 }
      ];
    });
  }, [topZ]);

  const closeApp = useCallback((id: string) => {
    setWindows((prev) => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  }, []);

  const focusApp = useCallback((id: string) => {
    setTopZ((z) => z + 1);
    setWindows((prev) => 
      prev.map(w => w.id === id 
        ? { ...w, isFocused: true, isMinimized: false, zIndex: topZ + 1 } 
        : { ...w, isFocused: false })
    );
  }, [topZ]);

  const minimizeApp = useCallback((id: string) => {
    setWindows((prev) => prev.map(w => w.id === id ? { ...w, isMinimized: true, isFocused: false } : w));
  }, []);

  useEffect(() => {
    document.documentElement.className = ""; 
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Global Konami Code Listener
  useEffect(() => {
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setTheme("secret");
          openApp("secret", "Top Secret");
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [openApp]);

  return (
    <OSContext.Provider value={{ 
      theme, setTheme, 
      matrixMode, setMatrixMode,
      windows, openApp, closeApp, focusApp, minimizeApp,
      easterEggFlags, triggerBsod, triggerHackGlitch
    }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (context === undefined) {
    throw new Error("useOS must be used within an OSProvider");
  }
  return context;
}
