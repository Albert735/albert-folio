import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import { formatDate, getPost, posts } from "@/lib/blog";
import { getPostHtml, readingMinutes } from "@/lib/blog-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const timeline = [...posts].sort((a, b) => Number(a.year) - Number(b.year));
  const i = timeline.findIndex((p) => p.slug === slug);
  const prev = timeline[i - 1];
  const next = timeline[i + 1];

  return (
    <>
      <Nav />
      <main className="px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
        <article className="mx-auto max-w-[68ch]">
          <Link href="/blog" className="text-sm text-mist transition-colors hover:text-gold">
            ← All writing
          </Link>

          <header className="mt-10">
            <p className="font-display text-[clamp(3.5rem,14vw,7.5rem)] font-bold leading-none tracking-[-0.05em] text-gold">
              {post.year}
            </p>
            <p className="mt-6 text-mist">{post.kicker}</p>
            <h1 className="mt-2 font-display text-[clamp(2rem,6vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
              {post.title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-bone/75">{post.excerpt}</p>
            <p className="mt-6 text-sm text-bone/50">
              By Albert Quaye, {formatDate(post.date)}. {readingMinutes(slug)} min read.
            </p>
          </header>

          <div className="kente mt-10" aria-hidden />

          <div className="article mt-12" dangerouslySetInnerHTML={{ __html: getPostHtml(slug) }} />

          {post.sources.length > 0 && (
            <section className="mt-16 border-t border-bone/10 pt-8" aria-labelledby="sources">
              <h2 id="sources" className="font-display text-lg font-semibold text-gold">
                Sources and further reading
              </h2>
              <ul className="mt-4 space-y-3">
                {post.sources.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-bone/75 underline decoration-bone/25 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <nav aria-label="More writing" className="mx-auto mt-20 grid max-w-[1100px] gap-4 sm:grid-cols-2">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="group rounded-2xl border border-bone/10 p-6 transition-colors hover:border-gold/50">
              <span className="text-sm text-mist">Earlier, {prev.year}</span>
              <span className="mt-2 block font-display text-xl font-semibold leading-tight group-hover:text-gold">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} className="group rounded-2xl border border-bone/10 p-6 text-right transition-colors hover:border-gold/50">
              <span className="text-sm text-mist">Later, {next.year}</span>
              <span className="mt-2 block font-display text-xl font-semibold leading-tight group-hover:text-gold">{next.title}</span>
            </Link>
          )}
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
