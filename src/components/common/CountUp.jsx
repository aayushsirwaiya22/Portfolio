import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../animations/gsapSetup.js";

// Counts up to `value` the first time the number scrolls into view, then
// stays put. With prefers-reduced-motion the final number renders straight
// away, so the stat is never animated for people who asked us not to.
export default function CountUp({ value, duration = 1600, className = "" }) {
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion() ? value : 0,
  );
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return undefined;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasRun.current) return;
          hasRun.current = true;
          observer.disconnect();

          const started = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - started) / duration, 1);
            // easeOutQuart — fast at first, settles gently on the last digit.
            const eased = 1 - Math.pow(1 - progress, 4);
            setDisplay(Math.round(eased * value));
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
