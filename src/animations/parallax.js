import { ensureGsapRegistered, shouldAnimate } from "./gsapSetup.js";

ensureGsapRegistered();

// Slow drift tied to scroll position. Used on the oversized display words
// so the page gains depth while scrolling, instead of every large element
// sitting perfectly still.
export function createParallaxAnimation(
  element,
  { distance = 70, start = "top bottom", end = "bottom top" } = {},
) {
  if (!element) return null;
  const { gsap } = ensureGsapRegistered();
  if (!shouldAnimate()) return null;

  return gsap.fromTo(
    element,
    { y: -distance },
    {
      y: distance,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: true,
      },
    },
  );
}
