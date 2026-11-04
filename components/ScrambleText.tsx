"use client";

import { useEffect, useRef, useState } from "react";

// Geometric glyphs that echo adinkra stamp shapes
const GLYPHS = "◐◑◒◓⊕⊗⊛✦✧❖◈◇◆○●◎⌘※⁂";

/**
 * Resolves text from random glyphs, left to right.
 * Re-runs on hover when `replayOnHover` is set.
 */
export default function ScrambleText({
  text,
  delay = 0,
  duration = 1400,
  className,
  replayOnHover = false,
}: {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  replayOnHover?: boolean;
}) {
  const [out, setOut] = useState(text);
  const frame = useRef(0);

  const run = (d = 0) => {
    cancelAnimationFrame(frame.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    const startAt = performance.now() + d;
    const tick = (now: number) => {
      const p = Math.max(0, Math.min((now - startAt) / duration, 1));
      const revealed = Math.floor(p * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === " " || i < revealed) s += c;
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    run(delay);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span
      className={className}
      aria-label={text}
      onPointerEnter={replayOnHover ? () => run(0) : undefined}
    >
      <span aria-hidden>{out}</span>
    </span>
  );
}
