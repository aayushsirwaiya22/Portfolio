// One entry in the timeline. The dot and the vertical line are drawn by
// Experience.jsx's wrapper; this component only renders the entry's content.
import { useRef } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createFadeUpAnimation } from "../../animations/fadeUp.js";

export default function ExperienceCard({ experience }) {
  const ref = useRef(null);
  useScrollAnimation(ref, createFadeUpAnimation);

  return (
    <article ref={ref} className="relative pb-14">
      <span className="absolute -left-[34px] top-2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />
      <p className="font-mono text-xs text-accent">{experience.period}</p>
      <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
        {experience.role}
      </h3>
      <p className="mt-1 text-muted">
        {experience.company} · {experience.place}
      </p>

      <ul className="mt-4 max-w-2xl space-y-2 text-muted">
        {experience.points.map((point) => (
          <li key={point} className="list-disc pl-1 marker:text-accent">
            {point}
          </li>
        ))}
      </ul>

      <ul className="mt-4 flex flex-wrap gap-2">
        {experience.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-edge bg-surface px-3 py-1 text-xs text-ink"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
