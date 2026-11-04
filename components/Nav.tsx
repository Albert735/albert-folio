"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AdinkraMark from "./AdinkraMark";
import { useUI } from "./Providers";
import { me } from "@/lib/data";

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

const linkClass =
  "hidden rounded-full px-4 py-2 text-bone/80 transition-colors hover:bg-bone/10 hover:text-bone sm:block";

export default function Nav() {
  const { setPaletteOpen, scrollTo } = useUI();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onBlog = pathname.startsWith("/blog");
  const [mac, setMac] = useState(true);
  const [touch, setTouch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [pathname]);

  // On the home page, section links scroll smoothly; elsewhere they go to that section of the home page
  const sectionLink = (label: string, target: string) => (
    <Link
      key={label}
      href={`/${target}`}
      onClick={(e) => {
        if (!onHome) return;
        e.preventDefault();
        scrollTo(target);
      }}
      className={linkClass}
    >
      {label}
    </Link>
  );

  return (
    <motion.header
      initial={onHome ? { y: -40, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      className={`fixed inset-x-0 top-0 z-50 border-b border-transparent transition-colors duration-200 ${
        // phones and narrow screens: the bar stays transparent, only the floating pills have a backing
        scrolled ? "md:border-bone/10 md:bg-night/90 md:backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-8">
        <Link
          href="/"
          onClick={(e) => {
            if (!onHome) return;
            e.preventDefault();
            scrollTo("#top");
          }}
          className="flex items-center gap-2.5 rounded-full border border-bone/10 bg-night/60 py-1.5 pl-1.5 pr-4 font-display text-sm font-semibold text-bone backdrop-blur-xl md:border-transparent md:bg-transparent md:p-0 md:backdrop-blur-none"
        >
          <AdinkraMark className="text-gold" size={26} />
          Albert
        </Link>

        <div className="flex items-center gap-1 rounded-full border border-bone/10 bg-night/60 p-1 text-sm backdrop-blur-xl">
          {sectionLink("Work", "#work")}
          {sectionLink("About", "#about")}
          <Link
            href="/blog"
            aria-current={onBlog ? "page" : undefined}
            className={`${linkClass} ${onBlog ? "!text-gold" : ""}`}
          >
            Blog
          </Link>
          {sectionLink("Contact", "#contact")}
          {/* Résumé opens in a new tab; shown on every screen size */}
          <a
            href={me.resume}
            target="_blank"
            rel="noreferrer"
            data-cursor="Open"
            className="flex items-center gap-1.5 rounded-full px-4 py-2 text-bone transition-colors hover:bg-bone/10 hover:text-gold"
          >
            Résumé
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="opacity-60">
              <path d="M3 1h6v6M9 1L1 9" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
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
