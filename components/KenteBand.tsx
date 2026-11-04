/** Woven kente strip with a scrolling line of words through the middle. */
export default function KenteBand({ words }: { words: string[] }) {
  const row = [...words, ...words];
  return (
    <div className="relative my-4 select-none" aria-hidden>
      <div className="kente" />
      <div className="overflow-hidden border-y border-gold/30 bg-night py-5">
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-[clamp(1.6rem,4vw,3.2rem)] font-bold tracking-[-0.03em]">
          {row.map((w, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className={i % 2 ? "text-gold" : "text-bone"}>{w}</span>
              <svg width="26" height="26" viewBox="0 0 32 32" className="text-kente-red">
                <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="3" fill="none" />
                <circle cx="16" cy="16" r="5" fill="currentColor" />
              </svg>
            </span>
          ))}
        </div>
      </div>
      <div className="kente" />
    </div>
  );
}
