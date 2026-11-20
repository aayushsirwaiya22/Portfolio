import { useRef } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createFadeUpAnimation } from "../../animations/fadeUp.js";
import { skillIcons, skillMonograms } from "../../data/skillIcons.js";

// Official brand mark when one exists, otherwise a letter tile in the same shape.
function SkillMark({ name }) {
  const path = skillIcons[name];

  if (path) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d={path} />
      </svg>
    );
  }

  const mono = skillMonograms[name] ?? name.slice(0, 2).toUpperCase();

  return (
    <span
      className="font-mono text-[11px] font-semibold uppercase leading-none tracking-tight"
      aria-hidden="true"
    >
      {mono}
    </span>
  );
}

function SkillChip({ item }) {
  return (
    <li className="u-chip flex items-center gap-2 rounded-full border border-edge bg-surfaceLight py-1 pl-1 pr-3.5 text-sm text-ink">
      <span className="skill-mark grid h-7 w-7 shrink-0 place-items-center rounded-full border border-edge bg-surface text-ink">
        <SkillMark name={item} />
      </span>
      {item}
    </li>
  );
}

export default function SkillCard({ group, className = "" }) {
  const ref = useRef(null);
  useScrollAnimation(ref, createFadeUpAnimation);

  // A category is either a flat list of technologies or a set of labelled
  // sub-groups (used by Tools to keep hosting platforms apart from the IDEs).
  const sections = group.groups
    ? group.groups.map((section) => ({ ...section, items: section.items }))
    : [{ label: null, items: group.items ?? [] }];

  const total = sections.reduce((sum, section) => sum + section.items.length, 0);
  const count = String(total).padStart(2, "0");

  return (
    <div
      ref={ref}
      className={`u-card rounded-2xl border border-edge bg-surface p-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium leading-tight text-ink">{group.title}</h3>
        <small className="mt-0.5 shrink-0 font-mono text-xs font-normal text-muted">
          {count}
        </small>
      </div>

      {group.note && <p className="mt-2 text-sm leading-relaxed text-muted">{group.note}</p>}

      {sections.map((section, index) => (
        <div key={section.label ?? "items"} className={index === 0 ? "mt-5" : "mt-6"}>
          {section.label && (
            <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {section.label}
            </p>
          )}
          <ul className="flex flex-wrap gap-2">
            {section.items.map((item) => (
              <SkillChip key={item} item={item} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
