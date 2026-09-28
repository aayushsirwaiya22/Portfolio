import { useRef } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createFadeUpAnimation } from "../../animations/fadeUp.js";

export default function ProcessStep({ step, index }) {
  const number = String(index + 1).padStart(2, "0");
  const ref = useRef(null);
  useScrollAnimation(ref, createFadeUpAnimation);

  return (
    <div ref={ref} className="rounded-2xl border border-edge bg-surface p-6">
      <b className="mb-6 block font-display text-3xl text-accent">{number}</b>
      <h3 className="text-lg font-medium text-ink">{step.title}</h3>
      <p className="mt-2 text-sm text-muted">{step.description}</p>
    </div>
  );
}
