import { useRef } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createFadeUpAnimation } from "../../animations/fadeUp.js";

export default function SkillCard({ group, className = "" }) {
  const count = String(group.items.length).padStart(2, "0");
  const ref = useRef(null);
  useScrollAnimation(ref, createFadeUpAnimation);

  return (
    <div
      ref={ref}
      className={`u-card rounded-2xl border border-edge bg-surface p-6 ${className}`}
    >
      <h3 className="mb-4 flex items-center justify-between text-xl font-medium text-ink">
        {group.title}
        <small className="font-mono text-xs font-normal text-muted">{count}</small>
      </h3>
      <ul className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            key={item}
            className="u-chip rounded-full border border-edge bg-surfaceLight px-3.5 py-1.5 text-sm text-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
