import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ensureGsapRegistered,
  shouldAnimate,
} from "../../animations/gsapSetup.js";
import BrowserFrame from "../common/BrowserFrame.jsx";
import ProjectArtwork from "./ProjectArtwork.jsx";

// Modal: React state controls it (see Projects.jsx), Escape key and the
// backdrop click both close it. GSAP entrance runs on top on open.
export default function ProjectModal({ project, onClose }) {
  const [imgError, setImgError] = useState(false);
  const dialogRef = useRef(null);

  // Reset the failed-image flag while rendering, so switching between
  // projects never shows the previous project's fallback.
  const [lastId, setLastId] = useState(project?.id);
  if (project?.id !== lastId) {
    setLastId(project?.id);
    setImgError(false);
  }

  useLayoutEffect(() => {
    if (!project || !dialogRef.current) return undefined;
    if (!shouldAnimate()) return undefined;
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.from(dialogRef.current, {
        y: 32,
        opacity: 0,
        scale: 0.97,
        duration: 0.45,
        ease: "power3.out",
      });
    }, dialogRef);
    return () => ctx.revert();
  }, [project]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const showImage = Boolean(project.image) && !imgError;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[var(--overlay)] px-4 py-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-edge bg-surface shadow-[0_50px_100px_-40px_var(--shadow)]"
      >
        <div className="p-6 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accentText">
              {project.category}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-edge text-ink transition-colors duration-200 hover:border-accentText hover:text-accentText"
            >
              <span className="transition-transform duration-300 group-hover:rotate-90">✕</span>
            </button>
          </div>

          <h3
            id="project-modal-title"
            className="mt-3 font-display text-3xl uppercase leading-none tracking-tight text-ink sm:text-4xl"
          >
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-muted">{project.title}</p>
        </div>

        {showImage ? (
          <img
            src={project.image}
            alt={`${project.name} preview`}
            onError={() => setImgError(true)}
            className="h-auto w-full border-y border-edge object-cover object-top"
          />
        ) : (
          <div className="border-y border-edge">
            <BrowserFrame url={project.liveUrl} bodyClassName="aspect-[16/10] max-h-[40vh] overflow-hidden" className="rounded-none border-0 border-b-0">
              <ProjectArtwork accent={project.accent} variant={project.art} />
            </BrowserFrame>
          </div>
        )}

        <div className="p-6 sm:p-10">
          <h4 className="font-mono text-xs uppercase tracking-widest text-accentText">
            Overview
          </h4>
          <p className="mt-2 text-muted">{project.overview}</p>

          <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-accentText">
            My Role
          </h4>
          <p className="mt-2 text-muted">{project.role}</p>

          <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-accentText">
            Technology
          </h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="u-chip rounded-full border border-edge bg-surfaceLight px-3 py-1 text-xs text-ink"
              >
                {tech}
              </li>
            ))}
          </ul>

          <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-accentText">
            Key Features
          </h4>
          <ul className="mt-2 max-w-xl list-disc space-y-1 pl-5 text-muted marker:text-accentText">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="u-lift mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accentInk shadow-[0_10px_24px_-18px_var(--shadow)] hover:shadow-[0_18px_36px_-16px_var(--accent-glow)]"
            >
              View Live Project
            </a>
          ) : (
            <p className="mt-8 text-sm text-muted">
              No public URL is listed for this project yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
