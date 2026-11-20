// One case study, laid out the way the reference's Work section reads:
// a numbered rail on the left, the case itself in the middle, and a browser
// thumbnail plus the launch link on the right.
//
// The title opens the detailed case file (the modal); the link goes out to
// the live site. Two targets, no nested interactive elements.
import { useRef, useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createProjectRowAnimation } from "../../animations/projectAnimations.js";
import BrowserFrame from "../common/BrowserFrame.jsx";
import ProjectArtwork from "./ProjectArtwork.jsx";

function hostOf(url) {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export default function ProjectRow({ project, index, onSelect }) {
  const number = String(index + 1).padStart(2, "0");
  const [imgError, setImgError] = useState(false);
  const rowRef = useRef(null);
  useScrollAnimation(rowRef, createProjectRowAnimation);

  // Reset the failed-image flag when the artwork source changes, without
  // an effect: React re-renders before painting, so the correct image is
  // never flashed.
  const [lastImage, setLastImage] = useState(project?.image);
  if (project?.image !== lastImage) {
    setLastImage(project?.image);
    setImgError(false);
  }

  const showImage = Boolean(project.image) && !imgError;
  const host = hostOf(project.liveUrl);

  return (
    <article ref={rowRef} className="group border-t border-edge py-9 sm:py-12">
      <div className="grid gap-6 md:grid-cols-[3.5rem_1fr_auto] md:items-center md:gap-10">
        <span className="font-mono text-xs tracking-[0.18em] text-muted">
          {number}
        </span>

        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {project.category}
          </span>

          <h3 className="mt-3 font-display text-3xl uppercase leading-[0.95] tracking-tight text-ink sm:text-4xl lg:text-5xl">
            <button
              type="button"
              onClick={() => onSelect(project)}
              className="py-2 text-left transition-colors duration-200 hover:text-accentText group-hover:text-accentText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accentText"
            >
              {project.title}
            </button>
          </h3>

          <p className="mt-4 max-w-xl text-muted">{project.short}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="u-chip rounded-full border border-edge bg-surfaceLight px-3 py-1 text-xs text-ink"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-end justify-between gap-6 md:flex-col md:items-end md:gap-5">
          <BrowserFrame
            url={host}
            className="w-40 shrink-0 md:w-48"
            bodyClassName="aspect-[16/10] overflow-hidden"
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
              <ProjectArtwork accent={project.accent} variant={project.art} />
            )}
          </BrowserFrame>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="u-link -mx-2 inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap px-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
            >
              Launch project
              <span className="u-arrow-diag" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
