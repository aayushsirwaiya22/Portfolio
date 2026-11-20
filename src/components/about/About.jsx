import { useRef } from "react";
import { capabilities } from "../../data/skills.js";
import { site } from "../../data/site.js";
import Container from "../common/Container.jsx";
import CountUp from "../common/CountUp.jsx";
import Eyebrow from "../common/Eyebrow.jsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createFadeUpAnimation } from "../../animations/fadeUp.js";

// Each number counts up when the section scrolls into view.
const stats = [
  { value: 2, suffix: "+", label: "Years shipping" },
  { value: 10, suffix: "+", label: "Projects" },
  { value: 6, suffix: "", label: "Stacks in production" },
];

const specRows = [
  { label: "Role", value: site.role },
  { label: "Base", value: "Indore, India" },
  { label: "Stack", value: "React · Node · Python" },
  { label: "Server", value: "Linux" },
  { label: "CMS", value: "Drupal · WordPress" },
  { label: "Degree", value: "B.Tech, Automation & Robotics" },
];

export default function About() {
  const headRef = useRef(null);
  const bodyRef = useRef(null);
  useScrollAnimation(headRef, createFadeUpAnimation);
  useScrollAnimation(bodyRef, createFadeUpAnimation);

  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        <div ref={headRef}>
          <Eyebrow number="01">Who I am</Eyebrow>
          <h2 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Frontend, full stack and CMS work for{" "}
            <span className="text-accentText">real clients.</span>
          </h2>
        </div>

        <div ref={bodyRef} className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Profile dossier — the same editor chrome as the hero, holding
              the facts instead of code. */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-edge bg-surfaceSunken">
              <div className="flex items-center gap-3 border-b border-edge bg-surfaceLight px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </span>
                <span className="truncate font-mono text-xs text-muted">
                  aayush.profile
                </span>
                <span className="ml-auto rounded bg-surface px-1.5 py-0.5 font-mono text-[11px] text-muted">
                  SPEC
                </span>
              </div>

              <div className="flex items-center gap-4 border-b border-edge px-5 py-6">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border border-accentText bg-surface font-display text-2xl text-accentText">
                  AS
                </span>
                <div className="min-w-0">
                  <p className="font-display text-xl text-ink">{site.name}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {site.role}
                  </p>
                </div>
              </div>

              <dl>
                {specRows.map((row, index) => (
                  <div
                    key={row.label}
                    className={`flex items-baseline justify-between gap-4 px-5 py-3 ${
                      index > 0 ? "border-t border-edge" : ""
                    }`}
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      {row.label}
                    </dt>
                    <dd className="text-right text-sm text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-edge px-5 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  What I do
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="u-chip rounded-full border border-edge bg-surface px-2.5 py-1 text-[11px] text-ink"
                    >
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between border-t border-edge bg-surfaceLight px-4 py-2 font-mono text-[11px] text-muted">
                <span>Spec // 01</span>
                <span className="text-accentText">● Open to work</span>
              </div>
            </div>
          </div>

          {/* The story and the numbers */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accentText" aria-hidden="true" />
              Who am I?
            </span>
            <h3 className="mt-4 max-w-2xl text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
              I build{" "}
              <span className="text-accentText">production web apps</span> and the CMS
              platforms behind them.
            </h3>

            <div className="mt-6 space-y-4 text-muted">
              <p>
                I&apos;m a Full Stack Developer with hands-on experience delivering
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
              <p>
                My degree is in Automation &amp; Robotics Engineering; my career
                has been in web development.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="border-t border-edge pt-3">
                  <span className="block font-display text-3xl font-bold leading-none text-accentText tabular-nums sm:text-4xl lg:text-5xl">
                    <CountUp value={stat.value} />
                    {stat.suffix}
                  </span>
                  <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
