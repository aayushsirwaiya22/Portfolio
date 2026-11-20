import { Fragment, useRef } from "react";
import Eyebrow from "./Eyebrow.jsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createTextRevealAnimation } from "../../animations/textReveal.js";

// Section heading. The title is split into words that rise one after another
// as the section scrolls into view — the one scroll moment every page shares.
export default function SectionTitle({ number, eyebrow, title, description }) {
  const ref = useRef(null);
  useScrollAnimation(ref, createTextRevealAnimation);

  const words = typeof title === "string" ? title.split(" ") : [];

  return (
    <div ref={ref} className="max-w-2xl">
      {eyebrow && <Eyebrow number={number}>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
        {typeof title === "string"
          ? words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span data-reveal-child className="inline-block">
                  {word}
                </span>
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))
          : title}
      </h2>
      {description && <p className="mt-4 text-muted">{description}</p>}
    </div>
  );
}
