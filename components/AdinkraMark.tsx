/** Flat Adinkrahene glyph, used as the logo mark. */
export default function AdinkraMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="16" cy="16" r="4.2" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}
