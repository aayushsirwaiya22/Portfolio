import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ensureGsapRegistered } from "../../animations/gsapSetup.js";

// The greetings that land once the counter reaches 100. Each one carries a
// locale tag so the sequence reads as three welcomes rather than a flicker.
const GREETINGS = [
  { text: "Hello.", code: "EN" },
  { text: "नमस्ते.", code: "HI" },
  { text: "Salve.", code: "LA" },
];

// Timings in seconds. The counter and the exit slide are the two beats that
// carry the whole loader, so they get the longest share of the run.
const COUNTER_TIME = 1.2;
const GREET_IN = 0.4;
const GREET_HOLD = 0.28;
const GREET_OUT = 0.18;
const EXIT_TIME = 0.85;
const HANDOFF = 0.1;

// Nothing should hold the page hostage: whatever happens above, the overlay
// still lifts and the portfolio shows up.
const FAILSAFE_MS = 8000;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
}

/**
 * Full-screen pre-boot counter. It counts 0 → 100 while an arc draws itself
 * in and out, swaps to a run of greetings, then slides away to hand the
 * portfolio over.
 *
 * `onReveal` fires when the exit slide starts (the page is mounted then, so
 * its entrance plays behind the moving overlay). `onFinish` fires once the
 * overlay is fully gone.
 */
export default function IntroLoader({ onReveal, onFinish }) {
  const { gsap } = ensureGsapRegistered();
  const reduced = usePrefersReducedMotion();

  const [count, setCount] = useState(() => (reduced ? 100 : 0));
  const [stage, setStage] = useState(() => (reduced ? "greet" : "counter"));
  const [greetIndex, setGreetIndex] = useState(0);

  const overlayRef = useRef(null);
  const arcRef = useRef(null);
  const greetRef = useRef(null);

  // Keep the callbacks fresh without restarting the timeline.
  const revealRef = useRef(onReveal);
  const finishRef = useRef(onFinish);
  const settledRef = useRef(false);
  useEffect(() => {
    revealRef.current = onReveal;
    finishRef.current = onFinish;
  });

  useEffect(() => {
    const timers = [];    const tweens = [];
    const later = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timers.push(id);
      return id;
    };

    const finish = () => {
      if (settledRef.current) return;
      settledRef.current = true;
      finishRef.current?.();
    };

    // Lift the overlay. The page is revealed first so its entrance animation
    // plays behind the overlay while it is still on screen.
    const exit = () => {
      setStage("exit");
      revealRef.current?.();

      const overlay = overlayRef.current;
      if (!overlay || reduced) {
        finish();
        return;
      }

      tweens.push(
        gsap.to(overlay, {
          yPercent: -100,
          duration: EXIT_TIME,
          ease: "power4.inOut",
          onComplete: finish,
        })
      );
    };

    // Reduced motion: no counting, no popping, no slide. The greetings are
    // simply there, one after the other, and the overlay goes away.
    if (reduced) {
      later(() => {
        setCount(100);
        setStage("greet");
      }, 0);
      GREETINGS.forEach((_, index) => later(() => setGreetIndex(index), index * 300));
      later(exit, GREETINGS.length * 300 + 200);
      return () => timers.forEach(clearTimeout);
    }

    // One greeting: it scales up into place, holds, then lifts out as the
    // next one arrives.
    const showGreeting = (index) => {
      setGreetIndex(index);

      later(() => {
        const element = greetRef.current;
        if (!element) return;

        tweens.push(
          gsap.fromTo(
            element,
            { opacity: 0, scale: 0.8, y: 10 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: GREET_IN,
              ease: "power3.out",
              onComplete: () => {
                later(() => {
                  tweens.push(
                    gsap.to(element, {
                      opacity: 0,
                      scale: 1.05,
                      y: -10,
                      duration: GREET_OUT,
                      ease: "power2.in",
                      onComplete: () => {
                        if (index + 1 < GREETINGS.length) {
                          showGreeting(index + 1);
                        } else {
                          later(exit, 150);
                        }
                      },
                    })
                  );
                }, GREET_HOLD * 1000);
              },
            }
          )
        );
      }, 30);
    };

    // The counter itself.
    const counter = { value: 0 };
    tweens.push(
      gsap.to(counter, {
        value: 100,
        duration: COUNTER_TIME,
        ease: "power1.inOut",
        onUpdate: () => setCount(Math.floor(counter.value)),
        onComplete: () => {
          setStage("greet");
          later(() => showGreeting(0), HANDOFF * 1000);
        },
      })
    );

    // The arc turns slowly while its dash offset draws it in and back out.
    if (arcRef.current) {
      tweens.push(
        gsap.fromTo(
          arcRef.current,
          { strokeDashoffset: 160 },
          {
            strokeDashoffset: 0,
            duration: COUNTER_TIME,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          }
        )
      );
    }

    later(exit, FAILSAFE_MS);

    return () => {
      timers.forEach(clearTimeout);
      tweens.forEach((tween) => tween.kill());
    };
  }, [reduced, gsap]);

  return (
    <div ref={overlayRef} className="boot-overlay" data-stage={stage} aria-hidden="true">
      <div className="boot-stage">
        <div className="boot-block" data-off={stage !== "counter"}>
          <p className="boot-counter font-display text-7xl tabular-nums sm:text-8xl">
            {count}
            <span>%</span>
          </p>

          <svg
            className="animate-spin-slow"
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              ref={arcRef}
              d="M 25 35 C 25 75, 75 75, 75 35"
              stroke="rgba(198, 255, 61, 0.55)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="160"
            />
          </svg>

          <p className="boot-tag">aayush sirwaiya · full stack developer</p>
        </div>

        <div className="boot-block" data-off={stage === "counter"}>
          <p
            ref={greetRef}
            className="boot-greeting font-script text-8xl sm:text-9xl md:text-[7.5rem]"
          >
            {GREETINGS[greetIndex].text}
          </p>
          <p className="boot-locale">{GREETINGS[greetIndex].code}</p>
        </div>
      </div>
    </div>
  );
}
