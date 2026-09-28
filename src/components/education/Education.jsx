import { useRef } from "react";
import { education } from "../../data/education.js";
import Container from "../common/Container.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createFadeUpAnimation } from "../../animations/fadeUp.js";

export default function Education() {
  const cardsRef = useRef(null);
  useScrollAnimation(cardsRef, createFadeUpAnimation);

  return (
    <section id="education" className="py-20 sm:py-28">
      <Container>
        <SectionTitle number="06" eyebrow="Education" title="Education & training." />

        <div ref={cardsRef} className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-edge bg-surface p-6">
            <h3 className="flex flex-wrap items-baseline justify-between gap-2 text-lg font-medium text-ink">
              {education.degree.title}
              <small className="font-mono text-xs font-normal text-muted">
                {education.degree.years}
              </small>
            </h3>
            <p className="mt-2 text-sm text-muted">
              {education.degree.school}
              <br />
              {education.degree.detail}
            </p>
          </div>

          <div className="rounded-2xl border border-edge bg-surface p-6">
            <h3 className="text-lg font-medium text-ink">Certifications</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {education.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
