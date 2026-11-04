import { experience, me, stack } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div>
          <h2 className="font-display text-[clamp(2.4rem,7vw,6rem)] font-bold leading-[0.92] tracking-[-0.04em]">
            Hi, I&rsquo;m Albert.
          </h2>
          <p className="mt-8 max-w-[34ch] font-display text-2xl font-medium leading-snug sm:text-3xl">
            Some people call me Jaytee. I build software that feels at home here.
          </p>
          <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-bone/70">
            <p>{me.intro}</p>
            <p>
              I care about the part most people skip: the tap that feels right, the screen that still works on a
              weak connection, the payment flow that speaks mobile money first. I design in Figma, build in React
              and React Native, and stay with a product until it ships.
            </p>
            <p>
              I studied Information Technology at the University of Ghana, Legon, and spent three stints
              as a junior developer at Rx Health Info Systems in Accra.
            </p>
          </div>
        </div>

        {/* Experience is genuinely chronological, so it reads as a timeline */}
        <div>
          <h3 className="mb-6 font-display text-xl font-semibold text-gold">Where I&rsquo;ve been</h3>
          <ol className="relative space-y-10 border-l border-bone/15 pl-8">
            {experience.map((x) => (
              <li key={x.org} className="relative">
                <span className="absolute -left-[39px] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-gold bg-night" />
                <div className="text-sm text-mist">
                  {x.period}, {x.place}
                </div>
                <div className="mt-1 font-display text-xl font-semibold">{x.role}</div>
                <div className="text-bone/80">{x.org}</div>
                <p className="mt-3 max-w-md leading-relaxed text-bone/60">{x.note}</p>
                {x.stints > 0 && (
                  <div className="mt-4 flex gap-2" aria-label={`${x.stints} stints`}>
                    {Array.from({ length: x.stints }).map((_, i) => (
                      <span key={i} className="rounded-full bg-gold/10 px-3 py-1 text-sm text-gold">
                        Stint {i + 1}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-28">
        <h3 className="mb-10 font-display text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em]">
          What I work with
        </h3>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(stack).map(([group, items]) => (
            <div key={group}>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-gold/40" />
                <span className="font-display text-sm font-semibold text-gold">{group}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg bg-bone/[0.04] px-3 py-2 text-bone/85 ring-1 ring-bone/10 transition-colors hover:bg-gold hover:text-night"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
