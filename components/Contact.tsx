"use client";

import { useState } from "react";
import { me, proverb } from "@/lib/data";
import AdinkraMark from "./AdinkraMark";
import Magnetic from "./Magnetic";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(me.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${me.email}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="kente" aria-hidden />
      <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-24 sm:px-8 sm:pt-32">
        <h2 className="max-w-5xl font-display text-[clamp(2.8rem,9vw,8.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
          Got something worth building?
        </h2>
        <p className="mt-8 max-w-xl text-xl text-bone/70">
          I&rsquo;m open to roles, freelance builds and the odd wild idea. Tell me what you&rsquo;re making.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Magnetic strength={0.2}>
            <button
              onClick={copy}
              data-cursor={copied ? "Copied" : "Copy"}
              className="rounded-full bg-gold px-8 py-5 font-display text-base font-semibold text-night sm:text-lg"
            >
              {copied ? "Email copied" : me.email}
            </button>
          </Magnetic>
          <a href={`mailto:${me.email}`} className="px-2 text-bone/70 underline decoration-gold/50 underline-offset-4 hover:text-gold">
            Or write an email
          </a>
          <a href={me.phoneHref} className="px-2 text-bone/70 underline decoration-gold/50 underline-offset-4 hover:text-gold">
            {me.phone}
          </a>
        </div>

        <div className="mt-20 grid gap-10 border-t border-bone/10 pt-10 md:grid-cols-[1fr_auto]">
          <figure>
            <blockquote className="font-display text-lg font-medium text-bone sm:text-xl">
              &ldquo;{proverb.twi}&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-bone/60">
              {proverb.en} An Akan proverb, behind the {proverb.symbol} symbol.
            </figcaption>
          </figure>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
            {me.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="font-display text-sm font-medium hover:text-gold">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={me.resume} target="_blank" rel="noreferrer" className="font-display text-sm font-medium text-gold hover:text-bone">
                Résumé
              </a>
            </li>
          </ul>
        </div>

        <footer className="mt-16 flex flex-col items-start justify-between gap-4 text-sm text-mist sm:flex-row sm:items-center">
          <span className="flex items-center gap-2">
            <AdinkraMark size={18} className="text-gold" />
            Designed and built by Albert Quaye in Accra.
          </span>
          <span>
            Press <kbd className="rounded border border-bone/20 px-1.5 py-0.5 font-mono text-xs text-bone">`</kbd> for
            something hidden.
          </span>
        </footer>
      </div>
    </section>
  );
}
