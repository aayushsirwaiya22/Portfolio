// Infinite band of technology names. The list renders twice so the -50%
// translate in index.css loops without a visible seam.
export default function Marquee({ items, className = "" }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-2xl uppercase tracking-tight text-ink sm:px-8 sm:text-3xl"
        >
          {item}
          <span aria-hidden="true" className="text-accentText">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee-wrap relative overflow-hidden border-y border-edge bg-surface ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-surface to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-surface to-transparent"
      />
      <div className="flex w-max animate-marquee" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}
