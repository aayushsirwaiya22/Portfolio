import { ensureGsapRegistered, shouldAnimate } from "./gsapSetup.js";

ensureGsapRegistered();

// Heading reveal. If the element contains [data-reveal-child] children they
// stagger; otherwise the element itself animates. gsap.from keeps no-JS
// content visible.
export function createTextRevealAnimation(
  element,
  { y = 36, duration = 0.9, stagger = 0.08, start = "top 88%" } = {},
) {
  if (!element) return null;
  const { gsap } = ensureGsapRegistered();
  if (!shouldAnimate()) return null;

  const children = element.querySelectorAll("[data-reveal-child]");
  const targets = children.length > 0 ? children : [element];

  const tween = gsap.from(targets, {
    y,
    opacity: 0,
    duration,
    stagger: children.length > 0 ? stagger : 0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: "play none none reverse",
    },
  });
  return tween;
}
