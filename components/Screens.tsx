/* Illustrated app screens shown inside the device frames.
   Swap any of these for a real screenshot: <img src="/shots/raute.png" className="h-full w-full object-cover" /> */

import type { Project } from "@/lib/data";

type T = Project["theme"];

export function RauteScreen({ t }: { t: T }) {
  return (
    <video
      src="/shots/raute-nav.mp4"
      poster="/shots/raute-nav-poster.jpg"
      className="h-full w-full object-cover"
      style={{ background: t.bg }}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label="Screen recording of Raute navigating across the University of Ghana campus"
    />
  );
}

export function BeatsScreen({ t }: { t: T }) {
  return (
    <img
      src="/shots/beats.webp"
      alt="Bagna Beats product page for over-ear headphones, in dark mode"
      className="h-full w-full object-cover object-top"
      style={{ background: t.bg }}
      loading="lazy"
    />
  );
}

export function GengScreen({ t }: { t: T }) {
  const items = [
    { n: "Smash Classic", p: "85" },
    { n: "Shito Crunch", p: "95" },
    { n: "Double Geng", p: "120" },
  ];
  return (
    <div
      className="relative h-full w-full overflow-hidden px-3 pt-10"
      style={{ background: t.bg, color: t.fg }}
    >
      <div
        className="font-display text-[15px] font-black"
        style={{ color: t.accent }}
      >
        GENG
      </div>
      <div className="mb-3 text-[9px] opacity-70">
        Hot off the grill in Accra
      </div>
      <div
        className="mb-3 grid aspect-[16/10] place-items-center rounded-2xl"
        style={{ background: t.soft }}
      >
        {/* burger */}
        <svg viewBox="0 0 100 70" className="w-3/4" aria-hidden>
          <path d="M10 32 Q50 -6 90 32 Z" fill="#E9A23B" />
          <rect x="8" y="34" width="84" height="6" rx="3" fill="#6BBF59" />
          <rect x="10" y="40" width="80" height="10" rx="5" fill="#5A2A17" />
          <rect x="8" y="49" width="84" height="4" rx="2" fill="#FFC93C" />
          <path d="M12 55 H88 Q86 66 50 66 Q14 66 12 55 Z" fill="#E9A23B" />
        </svg>
      </div>
      {items.map((it) => (
        <div
          key={it.n}
          className="mb-1.5 flex items-center justify-between rounded-xl px-2.5 py-2 text-[9px]"
          style={{ background: t.soft }}
        >
          <span className="font-semibold">{it.n}</span>
          <span style={{ color: t.accent }}>GH₵ {it.p}</span>
        </div>
      ))}
      <div
        className="absolute inset-x-3 bottom-4 rounded-full py-2 text-center text-[10px] font-bold"
        style={{ background: t.accent, color: t.bg }}
      >
        View order · 2 items
      </div>
    </div>
  );
}

export function CrestlineScreen({ t }: { t: T }) {
  return (
    <img
      src="/shots/crestline-kits.webp"
      alt="Crestline Kits home page with football jerseys on display"
      className="h-full w-full object-cover object-top"
      style={{ background: t.bg }}
      loading="lazy"
    />
  );
}

export function ShiftMedScreen({ t }: { t: T }) {
  return (
    <img
      src="/shots/shiftmed.webp"
      alt="ShiftMed home page connecting hospitals with healthcare professionals"
      className="h-full w-full object-cover object-top"
      style={{ background: t.bg }}
      loading="lazy"
    />
  );
}

export function EduWellScreen({ t }: { t: T }) {
  const people = [
    { role: "Career counsellor", tone: "#C7DAF0" },
    { role: "Mental health", tone: "#E4DEFF" },
    { role: "Academic advisor", tone: "#DCEBDF" },
    { role: "Study skills", tone: "#F6E7C8" },
  ];
  return (
    <div className="h-full w-full overflow-hidden px-4 pt-3 sm:px-6 sm:pt-4" style={{ background: t.bg, color: t.fg, fontFamily: "Montserrat, system-ui, sans-serif" }}>
      <div className="flex items-center justify-between text-[8px] sm:text-[10px]">
        <span className="font-bold sm:text-xs">EduWell Guide</span>
        <span className="hidden gap-4 opacity-70 sm:flex">
          <span>Find counsellors</span>
          <span>Resources</span>
          <span>About us</span>
        </span>
        <span className="rounded-md px-2 py-1 font-semibold" style={{ background: "#C7DAF0" }}>
          Join
        </span>
      </div>
      <div className="mx-auto mt-4 max-w-[85%] text-center sm:mt-6">
        <div className="text-[13px] font-bold leading-tight sm:text-xl">
          Empowering students with
          <br />
          <span style={{ backgroundImage: `linear-gradient(90deg, ${t.accent}, ${t.soft})`, WebkitBackgroundClip: "text", color: "transparent" }}>
            expert guidance
          </span>
        </div>
        <div className="mx-auto mt-2 max-w-[90%] text-[7px] leading-snug opacity-60 sm:text-[9px]">
          Academic, mental health and career support from qualified counsellors, all in one place.
        </div>
        <div className="mt-2.5 flex justify-center gap-1.5 text-[7px] font-semibold sm:text-[9px]">
          <span className="rounded-md px-2.5 py-1" style={{ background: "#C7DAF0" }}>Get started</span>
          <span className="rounded-md border px-2.5 py-1" style={{ borderColor: "#E4E4E7" }}>Learn more</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-1.5 sm:mt-5 sm:gap-2.5">
        {people.map((p) => (
          <div key={p.role} className="overflow-hidden rounded-lg" style={{ background: p.tone }}>
            <div className="relative aspect-[4/5]">
              <div className="absolute left-1/2 top-[22%] h-[26%] w-[34%] -translate-x-1/2 rounded-full" style={{ background: t.fg, opacity: 0.18 }} />
              <div className="absolute bottom-0 left-1/2 h-[38%] w-[70%] -translate-x-1/2 rounded-t-[40%]" style={{ background: t.fg, opacity: 0.12 }} />
            </div>
            <div className="bg-white/70 px-1 py-1 text-[6px] font-semibold sm:text-[8px]">{p.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScreenFor({ project }: { project: Project }) {
  const t = project.theme;
  switch (project.slug) {
    case "raute":
      return <RauteScreen t={t} />;
    case "beats":
      return <BeatsScreen t={t} />;
    case "geng":
      return <GengScreen t={t} />;
    case "crestline":
      return <CrestlineScreen t={t} />;
    case "shiftmed":
      return <ShiftMedScreen t={t} />;
    case "eduwell":
      return <EduWellScreen t={t} />;
    default:
      return null;
  }
}
