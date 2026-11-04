import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import { posts } from "@/lib/blog";
import { readingMinutes } from "@/lib/blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Topics in Black history that I care about: emancipation, Kwame Nkrumah, Martin Luther King Jr., Nelson Mandela, Barack Obama and Black Lives Matter.",
};

export default function BlogIndex() {
  // The index is a timeline, so it reads in order of the years the stories turn on
  const timeline = [...posts].sort((a, b) => Number(a.year) - Number(b.year));

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[1100px] px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
        <h1 className="font-display text-[clamp(2.8rem,9vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
          Blog
        </h1>
        <p className="mt-6 max-w-xl text-xl leading-relaxed text-bone/70">
          Topics in Black history that I care about, from 1834 to 2013.
        </p>

        <div className="kente mt-14" aria-hidden />

        <ol className="mt-4">
          {timeline.map((p) => (
            <li key={p.slug} className="border-b border-bone/10">
              <Link
                href={`/blog/${p.slug}`}
                data-cursor="Read"
                className="group grid gap-x-10 gap-y-3 py-10 md:grid-cols-[15rem_1fr] md:py-12"
              >
                <span className="font-display text-[clamp(3rem,10vw,4.5rem)] font-bold leading-none tracking-[-0.04em] text-gold/90 transition-colors group-hover:text-gold">
                  {p.year}
                </span>
                <span className="block">
                  <span className="block text-sm text-mist">{p.kicker}</span>
                  <span className="mt-2 block font-display text-2xl font-semibold leading-tight tracking-tight text-bone underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-gold sm:text-3xl">
                    {p.title}
                  </span>
                  <span className="mt-3 block max-w-[60ch] leading-relaxed text-bone/65">{p.excerpt}</span>
                  <span className="mt-4 block text-sm text-bone/45">{readingMinutes(p.slug)} min read</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </>
  );
}
