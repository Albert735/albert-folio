import Link from "next/link";
import { posts } from "@/lib/blog";

/** Home page section: the six stories as a strip of years, 1834 to 2013 */
export default function Writing() {
  const timeline = [...posts].sort((a, b) => Number(a.year) - Number(b.year));

  return (
    <section id="writing" className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-8 sm:pb-32">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-3xl font-display text-[clamp(2.4rem,7vw,6rem)] font-bold leading-[0.92] tracking-[-0.04em]">
          Writing
        </h2>
        <p className="max-w-sm text-lg text-bone/60">
          On Black history, freedom, and the people who fought for both.
        </p>
      </div>

      <ol className="grid gap-px overflow-hidden border-y border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
        {timeline.map((p) => (
          <li key={p.slug} className="bg-night">
            <Link
              href={`/blog/${p.slug}`}
              data-cursor="Read"
              className="group flex h-full flex-col bg-night p-6 transition-colors hover:bg-night-2 sm:p-8"
            >
              <span className="font-display text-5xl font-bold tracking-[-0.04em] text-gold/90 transition-colors group-hover:text-gold sm:text-6xl">
                {p.year}
              </span>
              <span className="mt-6 text-sm text-mist">{p.kicker}</span>
              <span className="mt-1 font-display text-xl font-semibold leading-tight tracking-tight text-bone">
                {p.title}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <Link
        href="/blog"
        className="mt-10 inline-block rounded-full border border-bone/20 px-6 py-3.5 font-display text-sm font-medium text-bone transition-colors hover:border-gold hover:text-gold"
      >
        Read the blog
      </Link>
    </section>
  );
}
