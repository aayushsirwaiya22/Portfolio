import { ensureGsapRegistered, shouldAnimate } from "./gsapSetup.js";

ensureGsapRegistered();

// Project card entrance: card fades up, image settles from a slight zoom and
// drifts on scroll (parallax). Tolerant of the placeholder (no <img>).
export function createProjectCardAnimation(
  element,
  { start = "top 88%" } = {},
) {
  if (!element) return null;
  const { gsap } = ensureGsapRegistered();
  if (!shouldAnimate()) return null;

  const img = element.querySelector("img");

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: "play none none reverse",
    },
  });

  timeline.from(element, {
    y: 36,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  if (img) {
    timeline.from(
      img,
      {
        scale: 1.08,
        duration: 1.1,
        ease: "power3.out",
      },
      0,
    );
    gsap.to(img, {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  return timeline;
}
