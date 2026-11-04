"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { me } from "@/lib/data";
import Magnetic from "./Magnetic";
import ScrambleText from "./ScrambleText";
import { useUI } from "./Providers";

const AdinkraScene = dynamic(() => import("./AdinkraScene"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = !!useReducedMotion();
  const { scrollTo, setTerminalOpen } = useUI();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 md:left-[28%]">
        <AdinkraScene reduced={reduced} />
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-4 pb-10 pt-28 sm:px-8 sm:pb-14"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease }}
          className="mb-5 max-w-md text-lg text-bone/75 sm:text-xl"
        >
          {me.role}, building in {me.location}.
        </motion.p>

        <motion.h1
          style={{ y: nameY }}
          className="font-display font-extrabold leading-[0.88] tracking-[-0.04em] text-bone"
        >
          <ScrambleText
            text="Albert"
            delay={300}
            duration={1300}
            replayOnHover
            className="block text-[clamp(3.6rem,15vw,13rem)]"
          />
          <ScrambleText
            text="Quaye"
            delay={600}
            duration={1300}
            replayOnHover
            className="block text-[clamp(3.6rem,15vw,13rem)] text-gold"
          />
        </motion.h1>

        <div className="mt-8 flex flex-col items-start gap-8 sm:mt-10">
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9, ease }}
            className="max-w-xl"
          >
            <blockquote className="font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
              &ldquo;{me.tagline}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-sm text-bone/60">{me.taglineCredit}</figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.9, ease }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <button
                onClick={() => scrollTo("#work")}
                className="rounded-full bg-gold px-7 py-4 font-display text-sm font-semibold text-night transition-transform active:scale-95"
              >
                See the work
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => setTerminalOpen(true)}
                className="rounded-full border border-bone/20 px-7 py-4 font-display text-sm font-medium text-bone transition-colors hover:border-gold hover:text-gold"
              >
                Open terminal
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
