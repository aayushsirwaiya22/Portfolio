import { ensureGsapRegistered, shouldAnimate } from "./gsapSetup.js";

ensureGsapRegistered();

// Scroll-triggered fade-up. Uses gsap.from so content is visible if JS/GSAP
// fails. Returns the tween; cleanup kills it + its ScrollTrigger.
export function createFadeUpAnimation(
  element,
  { y = 28, duration = 0.8, delay = 0, start = "top 85%" } = {},
) {
  if (!element) return null;
  const { gsap } = ensureGsapRegistered();
  if (!shouldAnimate()) return null;

  const tween = gsap.from(element, {
    y,
    opacity: 0,
    duration,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: "play none none reverse",
    },
  });
  return tween;
}
