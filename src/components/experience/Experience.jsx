import { useLayoutEffect, useRef } from "react";
import { experience } from "../../data/experience.js";
import Container from "../common/Container.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import ExperienceCard from "./ExperienceCard.jsx";
import {
  ensureGsapRegistered,
  shouldAnimate,
} from "../../animations/gsapSetup.js";

export default function Experience() {
  const lineRef = useRef(null);
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    if (!lineRef.current || !wrapRef.current) return undefined;
    if (!shouldAnimate()) return undefined;
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-20 sm:py-28">
      <Container>
        <SectionTitle number="02" eyebrow="Experience" title="Where I've worked." />

        {/* Vertical line draws itself downward on scroll (scrubbed). */}
        <div ref={wrapRef} className="relative mt-14 pl-9">
          <span ref={lineRef} className="absolute left-[6px] top-0 bottom-0 w-px bg-edge" />
          {experience.map((item) => (
            <ExperienceCard key={item.id} experience={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
