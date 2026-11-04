"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AdinkraMark from "./AdinkraMark";
import { useUI } from "./Providers";

function AccraClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Accra",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums text-mist" suppressHydrationWarning>
      Accra {time ?? "--:--"}
    </span>
  );
}

export default function Nav() {
  const { setPaletteOpen, scrollTo } = useUI();
  const [mac, setMac] = useState(true);
  const [touch, setTouch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    { label: "Work", target: "#work" },
    { label: "About", target: "#about" },
    { label: "Contact", target: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "border-b border-bone/10 bg-night/75 backdrop-blur-xl" : ""}`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#top");
          }}
          className="flex items-center gap-2.5 font-display text-sm font-semibold text-bone"
        >
          <AdinkraMark className="text-gold" size={26} />
          Albert
        </a>

        <div className="flex items-center gap-1 rounded-full border border-bone/10 bg-night/60 p-1 text-sm backdrop-blur-xl">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.target}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(l.target);
              }}
              className="hidden rounded-full px-4 py-2 text-bone/80 transition-colors hover:bg-bone/10 hover:text-bone sm:block"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2 rounded-full bg-gold px-4 py-2 font-medium text-night transition-transform active:scale-95"
            aria-label="Open command menu"
          >
            {touch ? "Menu" : <kbd className="font-sans">{mac ? "⌘" : "Ctrl"} K</kbd>}
          </button>
        </div>

        <div className="hidden text-sm md:block">
          <AccraClock />
        </div>
      </nav>
    </motion.header>
  );
}
