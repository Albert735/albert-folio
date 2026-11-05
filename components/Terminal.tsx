"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { experience, me, projects, proverb, stack, tracks } from "@/lib/data";
import { useUI } from "./Providers";

type Line = { kind: "in" | "out" | "gold" | "err"; text: string };

const BANNER: Line[] = [
  { kind: "gold", text: "   ◎  jaytee-os v1.0  ·  built in Accra" },
  { kind: "out", text: "   Type 'help' to see what I can do." },
];

export default function Terminal() {
  const { terminalOpen, setTerminalOpen, scrollTo } = useUI();
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalOpen) setTimeout(() => input.current?.focus(), 40);
  }, [terminalOpen]);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  const print = (...out: Line[]) => setLines((l) => [...l, ...out]);
  const o = (text: string): Line => ({ kind: "out", text });
  const g = (text: string): Line => ({ kind: "gold", text });

  const run = (raw: string) => {
    const cmd = raw.trim();
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ").toLowerCase();
    print({ kind: "in", text: cmd });
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHIndex(-1);

    switch (name.toLowerCase()) {
      case "help":
        print(
          g("Commands"),
          o("  whoami          who's behind this"),
          o("  projects        list what I've built"),
          o("  open <name>     read a project's case study, e.g. open raute"),
          o("  stack           tools I use"),
          o("  experience      where I've worked"),
          o("  contact         how to reach me"),
          o("  resume          open my résumé"),
          o("  sankofa         a little wisdom"),
          o("  music           what's on rotation (play, pause, next)"),
          o("  clear           clear the screen"),
          o("  exit            close the terminal"),
          o("  (there may be one more. try 'sudo')")
        );
        break;
      case "whoami":
        print(g(`${me.name} (${me.handle})`), o(`${me.role} · ${me.location}`), o(`"${me.tagline}" (${me.taglineCredit})`));
        break;
      case "ls":
      case "projects":
        projects.forEach((p) => print(g(`  ${p.name.padEnd(16)}${p.status}`), o(`    ${p.summary}`)));
        break;
      case "open":
      case "cd": {
        const p = projects.find((p) => p.slug === arg || p.name.toLowerCase().includes(arg));
        if (!arg) print({ kind: "err", text: "open what? try: open raute" });
        else if (!p) print({ kind: "err", text: `No project called '${arg}'. Run 'projects' to see them all.` });
        else {
          print(g(`Opening the ${p.name} case study…`));
          setTimeout(() => {
            setTerminalOpen(false);
            router.push(`/work/${p.slug}`);
          }, 450);
        }
        break;
      }
      case "stack":
        Object.entries(stack).forEach(([k, v]) => print(g(k), o(`  ${v.join(", ")}`)));
        break;
      case "experience":
        experience.forEach((x) => print(g(`${x.role}, ${x.org}`), o(`  ${x.period} · ${x.note}`)));
        break;
      case "contact":
        print(
          o(`  email     ${me.email}`),
          o(`  phone     ${me.phone}`),
          ...me.socials.map((s) => o(`  ${s.label.toLowerCase().padEnd(9)} ${s.href}`))
        );
        break;
      case "resume":
        print(g("Opening résumé in a new tab…"));
        window.open(me.resume, "_blank", "noopener");
        break;
      case "sankofa":
        print(g(`"${proverb.twi}"`), o(`  ${proverb.en}`));
        break;
      case "sudo":
        if (arg.includes("hire")) {
          print(
            g("✦ Permission granted. Excellent decision. ✦"),
            o(`  Drafting an email to ${me.email}…`)
          );
          setTimeout(() => {
            window.location.href = `mailto:${me.email}?subject=${encodeURIComponent("Let's work together")}`;
          }, 700);
        } else {
          print({ kind: "err", text: "Nice try. The only sudo command here is: sudo hire albert" });
        }
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
      case "quit":
        setTerminalOpen(false);
        break;
      case "music":
      case "songs":
        print(g("On rotation"), ...tracks.map((t, i) => o(`  ${i + 1}. ${t.title} by ${t.artist} (${t.year})`)), o("  play · pause · next"));
        break;
      case "play":
      case "pause":
      case "next":
        window.dispatchEvent(new CustomEvent("music", { detail: name.toLowerCase() }));
        print(g(name.toLowerCase() === "pause" ? "Paused." : name.toLowerCase() === "next" ? "Skipping to the next song…" : "Playing ♪"));
        break;
      case "akwaaba":
        print(g("Akwaaba! You're welcome here. 🇬🇭"));
        break;
      default:
        print({ kind: "err", text: `command not found: ${name}. Type 'help'.` });
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "Escape") {
      setTerminalOpen(false);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      if (history[i]) {
        setHIndex(i);
        setValue(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(Math.max(i, -1));
      setValue(i >= 0 ? history[i] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = ["help", "whoami", "projects", "open ", "stack", "experience", "contact", "resume", "sankofa", "music", "play", "pause", "next", "clear", "exit"];
      const hit = cmds.find((c) => c.startsWith(value));
      if (hit) setValue(hit);
    }
  };

  const color = { in: "text-bone", out: "text-bone/70", gold: "text-gold", err: "text-kente-red" };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-end justify-center bg-night/60 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setTerminalOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Terminal"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => {
              e.stopPropagation();
              input.current?.focus();
            }}
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-gold/25 bg-[#0a0a0a] font-mono text-[13px] shadow-[0_30px_100px_-20px_rgba(0,0,0,.9)] sm:text-sm"
          >
            <div className="flex items-center gap-2 border-b border-bone/10 px-4 py-3">
              <button aria-label="Close terminal" onClick={() => setTerminalOpen(false)} className="h-3 w-3 rounded-full bg-kente-red" />
              <span className="h-3 w-3 rounded-full bg-gold" />
              <span className="h-3 w-3 rounded-full bg-kente-green" />
              <span className="ml-3 text-xs text-bone/50">albert@accra: ~</span>
            </div>
            <div ref={body} className="h-[52vh] overflow-y-auto p-4 leading-relaxed sm:h-[440px]" data-lenis-prevent>
              {lines.map((l, i) => (
                <div key={i} className={`whitespace-pre-wrap break-words ${color[l.kind]}`}>
                  {l.kind === "in" ? (
                    <>
                      <span className="text-kente-green">➜</span> <span className="text-gold">~</span> {l.text}
                    </>
                  ) : (
                    l.text
                  )}
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-kente-green">➜</span>
                <span className="text-gold">~</span>
                <input
                  ref={input}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  aria-label="Terminal input"
                  className="flex-1 bg-transparent text-bone caret-gold outline-none"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
