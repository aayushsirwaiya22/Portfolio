import { useRef } from "react";
import Eyebrow from "./Eyebrow.jsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createFadeUpAnimation } from "../../animations/fadeUp.js";

export default function SectionTitle({ number, eyebrow, title, description }) {
  const ref = useRef(null);
  useScrollAnimation(ref, createFadeUpAnimation);

  return (
    <div ref={ref} className="max-w-2xl">
      {eyebrow && <Eyebrow number={number}>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-muted">{description}</p>}
    </div>
  );
}
