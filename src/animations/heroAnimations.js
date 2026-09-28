import { ensureGsapRegistered, shouldAnimate } from "./gsapSetup.js";

ensureGsapRegistered();

// Hero entrance (runs once on mount, no ScrollTrigger) + slow chip float.
export function createHeroEntrance(root) {
  if (!root) return null;
  const { gsap } = ensureGsapRegistered();
  if (!shouldAnimate()) return null;

  const targets = root.querySelectorAll("[data-hero]");
  if (targets.length === 0) return null;

  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  timeline.from(targets, {
    y: 32,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
  });
  return timeline;
}

export function createFloatAnimations(root) {
  if (!root) return [];
  const { gsap } = ensureGsapRegistered();
  if (!shouldAnimate()) return [];

  const chips = root.querySelectorAll("[data-float]");
  const tweens = [];
  chips.forEach((chip, index) => {
    tweens.push(
      gsap.to(chip, {
        y: index % 2 === 0 ? -10 : 10,
        duration: 2.2 + (index % 3) * 0.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.25,
      }),
    );
  });
  return tweens;
}
