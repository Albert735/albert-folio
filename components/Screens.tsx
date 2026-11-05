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
  return (
    <img
      src="/shots/eduwell-guide.webp"
      alt="EduWell Guide home page, connecting students with counsellors"
      className="h-full w-full object-cover object-top"
      style={{ background: t.bg }}
      loading="lazy"
    />
  );
}

export function ScreenFor({ project }: { project: Project }) {
  const t = project.theme;
  switch (project.slug) {
    case "raute":
      return <RauteScreen t={t} />;
    case "beats":
      return <BeatsScreen t={t} />;
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
