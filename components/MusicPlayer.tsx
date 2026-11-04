"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { tracks } from "@/lib/data";

/**
 * "On rotation": a now-playing card using the official YouTube uploads.
 *
 * Browsers block sound until the visitor interacts with the page, so the music
 * starts on their first click or key press anywhere. YouTube requires the player
 * to stay visible (at least 200×200) while it plays, so minimising pauses it.
 *
 * Other parts of the site control it with:
 *   window.dispatchEvent(new CustomEvent("music", { detail: "toggle" | "play" | "pause" | "next" }))
 */

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (id: string) => void;
  cueVideoById: (id: string) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const STORAGE_KEY = "aq-music";

function loadYouTubeApi(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT?.Player) return resolve();
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.getElementById("yt-iframe-api")) {
      const s = document.createElement("script");
      s.id = "yt-iframe-api";
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      document.head.appendChild(s);
    }
  });
}

function Bars({ on }: { on: boolean }) {
  return (
    <span className="flex h-3.5 items-end gap-[3px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-gold"
          animate={on ? { height: ["30%", "100%", "45%", "85%", "30%"] } : { height: "30%" }}
          transition={on ? { duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" } : { duration: 0.3 }}
        />
      ))}
    </span>
  );
}

export default function MusicPlayer() {
  const mount = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const wantPlay = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(true);
  // On phones the full card would cover the hero, so it waits as a small pill until music starts
  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches) setOpen(false);
  }, []);
  const indexRef = useRef(0);
  indexRef.current = index;

  const remember = (v: "on" | "off") => {
    try {
      localStorage.setItem(STORAGE_KEY, v);
    } catch {}
  };

  // Create the player
  useEffect(() => {
    let cancelled = false;
    loadYouTubeApi().then(() => {
      if (cancelled || !mount.current || !window.YT) return;
      const YT = window.YT;
      // YouTube replaces its element with an iframe, so give it a child React doesn't own
      const el = document.createElement("div");
      mount.current.appendChild(el);
      player.current = new YT.Player(el, {
        host: "https://www.youtube-nocookie.com",
        videoId: tracks[0].id,
        width: "100%",
        height: "100%",
        playerVars: { playsinline: 1, rel: 0, controls: 0, disablekb: 1, iv_load_policy: 3, fs: 0 },
        events: {
          onReady: () => {
            setReady(true);
            if (wantPlay.current) player.current?.playVideo();
          },
          onStateChange: (e: { data: number }) => {
            if (e.data === YT.PlayerState.PLAYING) setPlaying(true);
            else if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
            else if (e.data === YT.PlayerState.ENDED) {
              const next = (indexRef.current + 1) % tracks.length;
              setIndex(next);
              player.current?.loadVideoById(tracks[next].id);
            }
          },
        },
      });
    });
    return () => {
      cancelled = true;
      player.current?.destroy();
      player.current = null;
    };
  }, []);

  const play = useCallback(() => {
    wantPlay.current = true;
    setOpen(true);
    remember("on");
    player.current?.playVideo();
  }, []);

  const pause = useCallback(() => {
    wantPlay.current = false;
    remember("off");
    player.current?.pauseVideo();
  }, []);

  const go = useCallback((step: number) => {
    const next = (indexRef.current + step + tracks.length) % tracks.length;
    setIndex(next);
    setOpen(true);
    wantPlay.current = true;
    remember("on");
    player.current?.loadVideoById(tracks[next].id);
  }, []);

  const minimise = () => {
    pause();
    setOpen(false);
  };

  // Start on the visitor's first click or key press, unless they turned it off before
  useEffect(() => {
    let off = false;
    try {
      off = localStorage.getItem(STORAGE_KEY) === "off";
    } catch {}
    if (off) return;

    const start = (e: Event) => {
      if (card.current?.contains(e.target as Node)) return; // the card's own buttons handle themselves
      cleanup();
      wantPlay.current = true;
      setOpen(true);
      player.current?.playVideo();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", start, true);
      window.removeEventListener("keydown", start, true);
    };
    window.addEventListener("pointerdown", start, true);
    window.addEventListener("keydown", start, true);
    return cleanup;
  }, []);

  // Commands from the terminal and command palette
  useEffect(() => {
    const onCmd = (e: Event) => {
      const cmd = (e as CustomEvent<string>).detail;
      if (cmd === "play") play();
      else if (cmd === "pause") pause();
      else if (cmd === "next") go(1);
      else if (cmd === "toggle") (playing ? pause : play)();
    };
    window.addEventListener("music", onCmd);
    return () => window.removeEventListener("music", onCmd);
  }, [play, pause, go, playing]);

  const track = tracks[index];

  return (
    <div ref={card} className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6" data-lenis-prevent>
      {/* The YouTube player stays mounted; the card collapses around it only while paused */}
      <motion.div
        layout
        className={`overflow-hidden rounded-2xl border border-bone/15 bg-night-2/90 shadow-[0_20px_60px_-20px_rgba(0,0,0,.9)] backdrop-blur-xl ${
          open ? "w-[224px] p-3" : "w-auto p-1.5"
        }`}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
      >
        <div className={open ? "" : "pointer-events-none absolute h-px w-px overflow-hidden opacity-0"} aria-hidden={!open}>
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs text-mist">
              <Bars on={playing} />
              On rotation
            </span>
            <button
              onClick={minimise}
              aria-label="Minimise and pause music"
              className="grid h-6 w-6 place-items-center rounded-full text-bone/60 transition-colors hover:bg-bone/10 hover:text-bone"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <path d="M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Official YouTube player (kept at 200×200, as YouTube requires) */}
          <div className="relative h-[200px] w-[200px] overflow-hidden rounded-xl bg-black ring-1 ring-bone/10">
            <div ref={mount} className="h-full w-full [&_iframe]:h-full [&_iframe]:w-full" />
            {!ready && (
              <div className="absolute inset-0 grid place-items-center text-xs text-mist">Loading player…</div>
            )}
          </div>

          <div className="mt-3 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <div className="truncate font-display text-sm font-semibold text-bone">{track.title}</div>
                <div className="truncate text-xs text-bone/60">
                  {track.artist}, {track.year}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={() => go(-1)}
              aria-label="Previous song"
              className="grid h-9 w-9 place-items-center rounded-full text-bone/70 transition-colors hover:bg-bone/10 hover:text-bone"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M3 2v10M12 2L5 7l7 5V2z" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => (playing ? pause() : play())}
              aria-label={playing ? "Pause music" : "Play music"}
              className="grid h-11 w-11 place-items-center rounded-full bg-gold text-night transition-transform active:scale-90"
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <rect x="2.5" y="2" width="3" height="10" rx="1" fill="currentColor" />
                  <rect x="8.5" y="2" width="3" height="10" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <path d="M3.5 2l8 5-8 5V2z" fill="currentColor" />
                </svg>
              )}
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next song"
              className="grid h-9 w-9 place-items-center rounded-full text-bone/70 transition-colors hover:bg-bone/10 hover:text-bone"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M11 2v10M2 2l7 5-7 5V2z" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {!playing && ready && (
            <p className="mt-2 text-center text-[11px] text-bone/45">Click anywhere to start the music</p>
          )}
        </div>

        {!open && (
          <button
            onClick={play}
            aria-label={`Play ${track.title} by ${track.artist}`}
            className="flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-3.5 text-left"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-night">
              <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden>
                <path d="M3.5 2l8 5-8 5V2z" fill="currentColor" />
              </svg>
            </span>
            <span className="text-xs leading-tight">
              <span className="block font-display font-semibold text-bone">{track.title}</span>
              <span className="block text-bone/60">{track.artist}</span>
            </span>
          </button>
        )}
      </motion.div>
    </div>
  );
}
