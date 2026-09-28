import { useRef } from "react";
import { capabilities } from "../../data/skills.js";
import Container from "../common/Container.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import Eyebrow from "../common/Eyebrow.jsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createFadeUpAnimation } from "../../animations/fadeUp.js";

export default function About() {
  const bodyRef = useRef(null);
  useScrollAnimation(bodyRef, createFadeUpAnimation);

  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          number="01"
          eyebrow="Who I am"
          title="Frontend, full stack and CMS work for real clients."
        />

        <div ref={bodyRef} className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-4 text-lg text-muted">
            <p>
              I'm a Full Stack Developer with hands-on experience delivering
              production websites end-to-end, from client research and site
              architecture through responsive frontend implementation.
            </p>
            <p>
              My background spans Drupal and WordPress site development
              alongside the MERN stack: React.js, Node.js, Express.js and
              MongoDB. I work independently, translate business requirements
              into structured, reusable components and collaborate with
              clients and teams from concept to delivery.
            </p>
            <p>My degree is in Automation &amp; Robotics Engineering; my career has been in web development.</p>
          </div>

          <div>
            <Eyebrow>What I do</Eyebrow>
            <ul className="flex flex-wrap gap-2">
              {capabilities.map((capability) => (
                <li
                  key={capability}
                  className="rounded-full border border-edge bg-surface px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-accent"
                >
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
