"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { me, projects, tracks } from "@/lib/data";
import { useUI } from "./Providers";

type Item = { id: string; label: string; group: string; hint?: string; run: () => void };

export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen, setTerminalOpen, scrollTo } = useUI();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<string | null>(null);

  const router = useRouter();
  const close = () => setPaletteOpen(false);
  const visit = (href: string) => {
    close();
    router.push(href);
  };
  const go = (target: string) => {
    close();
    setTimeout(() => scrollTo(target), 80);
  };
  const open = (href: string) => {
    close();
    window.open(href, "_blank", "noopener");
  };

  const items: Item[] = useMemo(
    () => [
      { id: "work", group: "Go to", label: "Work", run: () => go("#work") },
      { id: "about", group: "Go to", label: "About and experience", run: () => go("#about") },
      { id: "contact", group: "Go to", label: "Contact", run: () => go("#contact") },
      { id: "top", group: "Go to", label: "Back to the top", run: () => go("#top") },
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        group: "Projects",
        label: p.name,
        hint: p.summary,
        run: () => visit(`/work/${p.slug}`),
      })),
      {
        id: "copy",
        group: "Actions",
        label: "Copy my email",
        hint: me.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(me.email);
            setToast("Email copied");
          } catch {
            setToast(me.email);
          }
          close();
        },
      },
      { id: "resume", group: "Actions", label: "Open my résumé", run: () => open(me.resume) },
      {
        id: "music",
        group: "Actions",
        label: "Play or pause the music",
        hint: `${tracks.length} songs on rotation`,
        run: () => {
          close();
          window.dispatchEvent(new CustomEvent("music", { detail: "toggle" }));
        },
      },
      {
        id: "terminal",
        group: "Actions",
        label: "Open the terminal",
        hint: "or press `",
        run: () => {
          close();
          setTerminalOpen(true);
        },
      },
      ...me.socials.map((s) => ({ id: s.label, group: "Elsewhere", label: s.label, run: () => open(s.href) })),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(s));
  }, [q, items]);

  useEffect(() => {
    if (paletteOpen) {
      setQ("");
      setActive(0);
      setTimeout(() => input.current?.focus(), 30);
    }
  }, [paletteOpen]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(id);
  }, [toast]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      filtered[active]?.run();
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center bg-night/70 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ y: -16, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -10, scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onKey}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-gold/25 bg-night-2/95 shadow-[0_30px_100px_-20px_rgba(0,0,0,.8)]"
            >
              <div className="kente !h-1.5" aria-hidden />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects, links, actions"
                className="w-full bg-transparent px-5 py-4 text-lg text-bone outline-none placeholder:text-bone/40"
                aria-label="Search commands"
              />
              <ul className="max-h-[50vh] overflow-y-auto border-t border-bone/10 p-2" role="listbox" data-lenis-prevent>
                {filtered.length === 0 && (
                  <li className="px-3 py-6 text-center text-bone/50">
                    Nothing matches &ldquo;{q}&rdquo;. Try a project name, like Raute.
                  </li>
                )}
                {filtered.map((item, i) => {
                  const header = item.group !== lastGroup;
                  lastGroup = item.group;
                  return (
                    <li key={item.id}>
                      {header && <div className="px-3 pb-1 pt-3 text-xs text-mist">{item.group}</div>}
                      <button
                        role="option"
                        aria-selected={i === active}
                        onMouseEnter={() => setActive(i)}
                        onClick={item.run}
                        className={`flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          i === active ? "bg-gold text-night" : "text-bone"
                        }`}
                      >
                        <span className="font-medium">{item.label}</span>
                        {item.hint && (
                          <span className={`truncate text-sm ${i === active ? "text-night/70" : "text-bone/45"}`}>
                            {item.hint}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="flex justify-between border-t border-bone/10 px-4 py-2.5 text-xs text-bone/45">
                <span>↑ ↓ to move, Enter to open</span>
                <span>Esc to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-gold px-5 py-2.5 font-display text-sm font-semibold text-night"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
