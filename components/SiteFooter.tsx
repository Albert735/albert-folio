import Link from "next/link";
import { me } from "@/lib/data";
import AdinkraMark from "./AdinkraMark";

/** Slim footer for pages other than home (home has the full contact section). */
export default function SiteFooter() {
  return (
    <footer className="border-t border-bone/10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-bone/70 hover:text-gold">
          <AdinkraMark size={18} className="text-gold" />
          Albert Quaye, Accra
        </Link>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href={`mailto:${me.email}`} className="text-bone/70 hover:text-gold">
              {me.email}
            </a>
          </li>
          {me.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="text-bone/70 hover:text-gold">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
