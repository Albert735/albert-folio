import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import Device from "@/components/Device";
import { projects } from "@/lib/data";
import { caseStudies } from "@/lib/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} case study`,
    description: project.summary,
    openGraph: { title: `${project.name}, a case study`, description: project.summary },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-bone/10 py-12 md:grid-cols-[14rem_1fr] md:gap-10">
      <h2 className="font-display text-lg font-semibold text-gold">{title}</h2>
      <div className="max-w-[62ch] text-lg leading-relaxed text-bone/80">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  const project = projects[i];
  const study = caseStudies[slug];
  if (!project || !study) notFound();
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[1200px] px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
        <Link href="/#work" className="text-sm text-mist transition-colors hover:text-gold">
          ← All work
        </Link>

        <header className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <h1 className="font-display text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[0.92] tracking-[-0.04em]">
              {project.name}
            </h1>
            <p className="mt-6 max-w-lg font-display text-xl font-medium leading-snug text-gold sm:text-2xl">
              {project.summary}
            </p>
            {project.highlight && (
              <div className="mt-8 flex max-w-md items-baseline gap-4 border-l-2 border-gold pl-5">
                <span className="font-display text-5xl font-bold text-bone">{project.highlight.value}</span>
                <span className="text-sm leading-snug text-bone/60">{project.highlight.label}</span>
              </div>
            )}
          </div>
          <Device project={project} />
        </header>

        <dl className="mt-16 grid gap-x-10 gap-y-8 border-t border-bone/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {study.role && (
            <div>
              <dt className="text-sm text-mist">Role</dt>
              <dd className="mt-2 leading-snug">{study.role}</dd>
            </div>
          )}
          <div>
            <dt className="text-sm text-mist">Platform</dt>
            <dd className="mt-2">{project.device === "phone" ? "Mobile app" : "Web app"}</dd>
          </div>
          <div>
            <dt className="text-sm text-mist">Built with</dt>
            <dd className="mt-2 leading-snug">{project.stack.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-sm text-mist">Status</dt>
            <dd className="mt-2">{project.status}</dd>
          </div>
        </dl>

        {(project.live || project.repo) && (
          <div className="mt-10 flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gold px-6 py-3.5 font-display text-sm font-semibold text-night"
              >
                Visit {project.name}
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-bone/20 px-6 py-3.5 font-display text-sm font-medium text-bone transition-colors hover:border-gold hover:text-gold"
              >
                View the code
              </a>
            )}
          </div>
        )}

        <div className="mt-16">
          <Section title="The problem">
            <p>{study.problem}</p>
          </Section>

          <Section title="What was built">
            <ul className="space-y-3">
              {study.built.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Section>

          {study.decisions.length > 0 && (
            <Section title="Key decisions">
              <div className="space-y-8">
                {study.decisions.map((d) => (
                  <div key={d.title}>
                    <h3 className="font-display text-xl font-semibold leading-tight text-bone">{d.title}</h3>
                    <p className="mt-2">{d.body}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <Section title="Where it stands">
            <p>{study.status}</p>
          </Section>
        </div>

        <Link
          href={`/work/${next.slug}`}
          className="group mt-12 flex flex-col gap-2 rounded-2xl border border-bone/10 p-8 transition-colors hover:border-gold/50 sm:flex-row sm:items-end sm:justify-between"
        >
          <span>
            <span className="text-sm text-mist">Next project</span>
            <span className="mt-2 block font-display text-[clamp(1.8rem,5vw,3rem)] font-bold leading-none tracking-[-0.03em] group-hover:text-gold">
              {next.name}
            </span>
          </span>
          <span className="text-bone/60">{next.summary}</span>
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
