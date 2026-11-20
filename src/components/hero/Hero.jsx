import { useLayoutEffect, useRef } from "react";
import { site } from "../../data/site.js";
import { socialLinks } from "../../data/socialLinks.js";
import Container from "../common/Container.jsx";
import Eyebrow from "../common/Eyebrow.jsx";
import Button from "../common/Button.jsx";
import { ensureGsapRegistered } from "../../animations/gsapSetup.js";
import {
  createFloatAnimations,
  createHeroEntrance,
} from "../../animations/heroAnimations.js";
import { useMagneticButton } from "../../hooks/useMagneticButton.js";

// Floating labels around the code window. GSAP gives them the slow
// up/down float from the reference.
const chips = [
  { label: "React", style: "top-[-2%] right-[4%]" },
  { label: "Node.js", style: "top-[30%] right-[-3%]" },
  { label: "MongoDB", style: "bottom-[2%] right-[12%]" },
  { label: "Drupal", style: "bottom-[6%] left-[-2%]" },
  { label: "WordPress", style: "top-[52%] left-[-4%]" },
];

// One phrase in the tagline gets the highlighter treatment — the same
// device the reference design uses to make a single word carry the line.
function Tagline() {
  const [before, after] = site.tagline.split(site.taglineHighlight);

  return (
    <p className="mt-6 max-w-xl text-lg text-muted">
      {before}
      <span className="rounded bg-accent px-1.5 py-0.5 font-semibold text-accentInk">
        {site.taglineHighlight}
      </span>
      {after}
    </p>
  );
}

export default function Hero() {
  const rootRef = useRef(null);
  const ctaRef = useRef(null);
  useMagneticButton(ctaRef, 0.25);

  useLayoutEffect(() => {
    if (!rootRef.current) return undefined;
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      createHeroEntrance(rootRef.current);
      createFloatAnimations(rootRef.current);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={rootRef} className="pt-28 pb-16 sm:pt-36">
      <Container className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <div data-hero>
            <Eyebrow>Full Stack · Frontend · Python · Drupal · Linux</Eyebrow>
          </div>

          <h1 data-hero className="font-display text-4xl leading-[1.05] text-ink sm:text-6xl lg:text-5xl">
            Hi, I&apos;m <span className="text-accentText">Aayush</span> Sirwaiya.
            Building modern, responsive web experiences.
          </h1>

          <div data-hero>
            <Tagline />
          </div>

          <div data-hero ref={ctaRef} className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects" variant="primary" arrow data-magnetic>
              View My Work
            </Button>
            <Button href="#contact" data-magnetic>Let&apos;s Work Together</Button>
            <Button href={site.resume} download data-magnetic>
              Download Resume
            </Button>
            <Button href={socialLinks[0].href} target="_blank" rel="noreferrer" data-magnetic>
              LinkedIn ↗
            </Button>
          </div>

          <div data-hero className="mt-9 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted">
            <span>
              <b className="font-medium text-ink">Now</b> Frontend Dev &amp; Drupal , Codernaline LLP
            </span>
            <span>
              <b className="font-medium text-ink">Stack</b> React · Node · Python · Linux
            </span>
            <span>
              <b className="font-medium text-ink">Base</b> {site.location}
            </span>
          </div>
        </div>

        <div data-hero className="relative py-4">
          {/* The code window is dressed as an editor: title bar, filename,
              language badge and a status bar. */}
          <div className="overflow-hidden rounded-2xl border border-edge bg-surface shadow-[0_30px_80px_-30px_var(--shadow)]">
            <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              </span>
              <span className="truncate font-mono text-xs text-muted">aayush.js</span>
              <span className="ml-auto rounded bg-surfaceLight px-1.5 py-0.5 font-mono text-[11px] text-muted">
                JS
              </span>
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-muted">
              <span className="text-accentText">const</span> aayush = {"{"}
              {"\n"}  role: <span className="text-ink">&quot;Full Stack Developer&quot;</span>,
              {"\n"}  frontend: [<span className="text-ink">&quot;React&quot;</span>, <span className="text-ink">&quot;JavaScript&quot;</span>],
              {"\n"}  backend: [<span className="text-ink">&quot;Node.js&quot;</span>, <span className="text-ink">&quot;Express&quot;</span>],
              {"\n"}  scripting: [<span className="text-ink">&quot;Python&quot;</span>],
              {"\n"}  server: <span className="text-ink">&quot;Linux&quot;</span>,
              {"\n"}  database: [<span className="text-ink">&quot;MongoDB&quot;</span>, <span className="text-ink">&quot;MySQL&quot;</span>],
              {"\n"}  cms: [<span className="text-ink">&quot;Drupal&quot;</span>, <span className="text-ink">&quot;WordPress&quot;</span>],
              {"\n"}  location: <span className="text-ink">&quot;Indore, IN&quot;</span>
              {"\n"}
              {"}"};
            </pre>

            <div className="flex items-center justify-between border-t border-edge bg-surfaceLight px-4 py-2 font-mono text-[11px] text-muted">
              <span>UTF-8</span>
              <span>JavaScript</span>
              <span className="text-accentText">Ln 10, Col 1</span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
            {chips.map((chip) => (
              <span
                key={chip.label}
                data-float
                className={`absolute rounded-full border border-edge bg-surfaceLight px-3 py-1.5 font-mono text-xs shadow-[0_10px_30px_-10px_var(--shadow)] ${chip.style}`}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
