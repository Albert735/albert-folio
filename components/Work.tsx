"use client";

import { projects, type Project } from "@/lib/data";
import Link from "next/link";
import Device from "./Device";
import Magnetic from "./Magnetic";

function StatusDot({ status }: { status: Project["status"] }) {
  const color = status === "Live" ? "bg-kente-green" : status === "Shipping" ? "bg-gold" : "bg-mist";
  return (
    <span className="inline-flex items-center gap-2 text-sm text-bone/70">
      <span className={`relative h-2 w-2 rounded-full ${color}`}>
        {status !== "In development" && (
          <span className={`absolute inset-0 animate-ping rounded-full ${color} opacity-60 motion-reduce:hidden`} />
        )}
      </span>
      {status}
    </span>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article
      id={`project-${project.slug}`}
      className="grid items-center gap-10 border-t border-bone/10 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
    >
      <div className={flip ? "lg:order-2" : ""}>
        <div className="mb-6 flex items-center justify-between gap-4">
          <StatusDot status={project.status} />
          <span className="text-sm text-mist">{project.device === "phone" ? "Mobile app" : "Web app"}</span>
        </div>

        <h3 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.03em]">
          <Link href={`/work/${project.slug}`} className="transition-colors hover:text-gold">
            {project.name}
          </Link>
        </h3>
        <p className="mt-5 max-w-lg font-display text-xl font-medium leading-snug text-gold sm:text-2xl">
          {project.summary}
        </p>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-bone/70">{project.detail}</p>

        {project.highlight && (
          <div className="mt-8 flex max-w-md items-baseline gap-4 border-l-2 border-gold pl-5">
            <span className="font-display text-5xl font-bold text-bone">{project.highlight.value}</span>
            <span className="text-sm leading-snug text-bone/60">{project.highlight.label}</span>
          </div>
        )}

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Built with">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full border border-bone/15 px-3.5 py-1.5 text-sm text-bone/80">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap gap-3">
          <Magnetic>
            <Link
              href={`/work/${project.slug}`}
              data-cursor="Read"
              className="inline-block rounded-full bg-gold px-6 py-3.5 font-display text-sm font-semibold text-night"
            >
              Read the case study
            </Link>
          </Magnetic>
          {project.live && (
            <Magnetic>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                data-cursor="Visit"
                className="inline-block rounded-full border border-bone/20 px-6 py-3.5 font-display text-sm font-medium text-bone transition-colors hover:border-gold hover:text-gold"
              >
                Visit {project.name}
              </a>
            </Magnetic>
          )}
          {project.repo && (
            <Magnetic>
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                data-cursor="Code"
                className="inline-block rounded-full border border-bone/20 px-6 py-3.5 font-display text-sm font-medium text-bone transition-colors hover:border-gold hover:text-gold"
              >
                View the code
              </a>
            </Magnetic>
          )}
        </div>
      </div>

      <div className={flip ? "lg:order-1" : ""}>
        <Device project={project} />
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1400px] px-4 pt-24 sm:px-8 sm:pt-32">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-3xl font-display text-[clamp(2.4rem,7vw,6rem)] font-bold leading-[0.92] tracking-[-0.04em]">
          Things I&rsquo;ve built
        </h2>
        <p className="max-w-sm text-lg text-bone/60">
          Six products for real people. Campus, commerce, health, food, music, sound.
        </p>
      </div>
      {projects.map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} />
      ))}
    </section>
  );
}
