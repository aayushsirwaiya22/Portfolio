// Gives buttons inside a container a subtle "magnetic" pull toward the
// cursor. Attach the ref to a wrapper; any descendant with [data-magnetic]
// is pulled. Respects prefers-reduced-motion.
import { useLayoutEffect } from "react";
import {
  ensureGsapRegistered,
  shouldAnimate,
} from "../animations/gsapSetup.js";

ensureGsapRegistered();

export function useMagneticButton(containerRef, strength = 0.3) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    if (!shouldAnimate()) return undefined;
    const { gsap } = ensureGsapRegistered();

    const targets = container.querySelectorAll("[data-magnetic]");
    if (targets.length === 0) return undefined;

    const cleanups = [];

    targets.forEach((el) => {
      const onMove = (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: "power3.out",
        });
      };
      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        });
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        gsap.set(el, { x: 0, y: 0 });
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [containerRef, strength]);
}
