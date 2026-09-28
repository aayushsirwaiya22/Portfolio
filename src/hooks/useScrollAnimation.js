// Wraps a GSAP + ScrollTrigger animation in a React-safe lifecycle:
// runs the animation on mount, cleans it up on unmount.
import { useLayoutEffect } from "react";
import { ensureGsapRegistered } from "../animations/gsapSetup.js";

ensureGsapRegistered();

export function useScrollAnimation(ref, animationFn, deps = []) {
  useLayoutEffect(() => {
    if (!ref.current || typeof animationFn !== "function") return undefined;
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      animationFn(ref.current);
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
}
