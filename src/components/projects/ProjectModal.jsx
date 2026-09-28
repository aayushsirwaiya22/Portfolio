import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ensureGsapRegistered,
  shouldAnimate,
} from "../../animations/gsapSetup.js";

// Modal: React state controls it (see Projects.jsx), Escape key and the
// backdrop click both close it. GSAP entrance runs on top on open.
export default function ProjectModal({ project, onClose }) {
  const [imgError, setImgError] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    setImgError(false);
  }, [project?.id]);

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
  }, [project?.id]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl border border-edge bg-bg p-6 sm:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            {project.category}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-edge text-ink hover:border-accent"
          >
            ✕
          </button>
        </div>

        <h3 id="project-modal-title" className="mt-3 font-display text-3xl text-ink sm:text-4xl">
          {project.name}
        </h3>

        {project.image && !imgError && (
          <div className="mt-6 overflow-hidden rounded-xl border border-edge">
            <img
              src={project.image}
              alt={`${project.name} preview`}
              onError={() => setImgError(true)}
              className="h-auto w-full object-cover object-top"
            />
          </div>
        )}

        <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">Overview</h4>
        <p className="mt-2 text-muted">{project.overview}</p>

        <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">My Role</h4>
        <p className="mt-2 text-muted">{project.role}</p>

        <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">Technology</h4>
        <ul className="mt-2 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-edge bg-surface px-3 py-1 text-xs text-ink"
            >
              {tech}
            </li>
          ))}
        </ul>

        <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">Key Features</h4>
        <ul className="mt-2 max-w-xl list-disc space-y-1 pl-5 text-muted marker:text-accent">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accentInk hover:opacity-90"
          >
            View Live Project
          </a>
        ) : (
          <p className="mt-8 text-sm text-muted">No public URL is listed for this project yet.</p>
        )}
      </div>
    </div>
  );
}
