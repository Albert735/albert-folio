"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Cursor from "./Cursor";
import CommandPalette from "./CommandPalette";
import Terminal from "./Terminal";
import MusicPlayer from "./MusicPlayer";

type UI = {
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  scrollTo: (target: string) => void;
};

const UIContext = createContext<UI | null>(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside Providers");
  return ctx;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const l = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.current = l;
    let id = 0;
    const raf = (time: number) => {
      l.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      l.destroy();
    };
  }, []);

  // Freeze page scroll while an overlay is open
  useEffect(() => {
    const open = paletteOpen || terminalOpen;
    if (open) lenis.current?.stop();
    else lenis.current?.start();
  }, [paletteOpen, terminalOpen]);

  // Global shortcuts: ⌘K / Ctrl+K for the palette, backtick for the terminal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea, [contenteditable]");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen(false);
        setPaletteOpen((v) => !v);
      } else if (e.key === "`" && !typing) {
        e.preventDefault();
        setPaletteOpen(false);
        setTerminalOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollTo = useCallback((target: string) => {
    const el = document.querySelector(target) as HTMLElement | null;
    if (!el) return;
    if (lenis.current) lenis.current.scrollTo(el, { offset: -20, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <UIContext.Provider value={{ paletteOpen, setPaletteOpen, terminalOpen, setTerminalOpen, scrollTo }}>
      {children}
      <Cursor />
      <CommandPalette />
      <Terminal />
      <MusicPlayer />
    </UIContext.Provider>
  );
}
