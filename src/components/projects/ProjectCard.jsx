// Only responsible for displaying one project and reporting a click.
// Projects.jsx owns which project (if any) is currently selected and the
// alternating left/right order.
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createProjectCardAnimation } from "../../animations/projectAnimations.js";

export default function ProjectCard({ project, index, onSelect }) {
  const number = String(index + 1).padStart(2, "0");
  const isReversed = index % 2 === 1;
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef(null);
  useScrollAnimation(cardRef, createProjectCardAnimation);

  useEffect(() => {
    setImgError(false);
  }, [project?.id, project?.image]);

  const showImage = Boolean(project.image) && !imgError;

  return (
    <article
      ref={cardRef}
      onClick={() => onSelect(project)}
      className="grid cursor-pointer gap-8 border-t border-edge py-10 sm:py-14 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16"
    >
      <div className={isReversed ? "lg:order-2" : ""}>
        <span className="font-mono text-sm text-accent">{number}</span>
        <h3 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-muted">{project.category}</p>
        <p className="mt-3 max-w-md text-muted">{project.short}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-edge bg-surface px-3 py-1 text-xs text-ink"
            >
              {tech}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSelect(project);
          }}
          className="group mt-5 inline-flex items-center gap-2 border-b border-accent pb-1 font-semibold text-ink"
        >
          View Case Study
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-edge bg-surface ${
          isReversed ? "lg:order-1" : ""
        }`}
      >
        {showImage ? (
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <>
            <div
              className="absolute -inset-[8%]"
              style={{
                background: `radial-gradient(circle at 30% 20%, ${project.accent}33, transparent 60%)`,
              }}
            />
            <div className="absolute inset-[8%] top-[14%] bottom-[14%] grid grid-rows-[auto_1fr_auto] gap-2.5 rounded-xl border border-edge bg-bg/70 p-4">
              <span className="h-2 w-2/5 rounded bg-surfaceLight" />
              <div className="grid grid-cols-3 gap-2">
                <span className="min-h-9 rounded-lg bg-surfaceLight" />
                <span className="min-h-9 rounded-lg bg-surfaceLight" />
                <span className="min-h-9 rounded-lg bg-surfaceLight" />
              </div>
              <span className="h-2 w-2/3 rounded bg-surfaceLight" />
            </div>
          </>
        )}
      </div>
    </article>
  );
}
