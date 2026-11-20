import { useRef } from "react";
import { site } from "../../data/site.js";
import { navLinks } from "../../data/navigation.js";
import { socialLinks } from "../../data/socialLinks.js";
import Container from "../common/Container.jsx";
import { useLocalTime } from "../../hooks/useLocalTime.js";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createTextRevealAnimation } from "../../animations/textReveal.js";
import { createFadeUpAnimation } from "../../animations/fadeUp.js";
import { createParallaxAnimation } from "../../animations/parallax.js";

export default function Footer() {
  const year = new Date().getFullYear();
  const localTime = useLocalTime();

  const wordRef = useRef(null);
  const linksRef = useRef(null);
  useScrollAnimation(wordRef, createTextRevealAnimation);
  useScrollAnimation(linksRef, createFadeUpAnimation);
  useScrollAnimation(wordRef, createParallaxAnimation);

  const elsewhere = [
    { label: "Email", href: `mailto:${site.email}`, value: site.email },
    { label: "Phone", href: site.phoneHref, value: site.phone },
    { label: "LinkedIn", href: socialLinks[0].href, value: "Profile" },
    { label: "Resume", href: site.resume, value: "PDF" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-edge bg-surface">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
          {/* Oversized wordmark */}
          <div className="lg:col-span-7">
            <a
              ref={wordRef}
              href="#home"
              className="group inline-block"
              aria-label={`${site.name}, back to top`}
            >
              {["Aayush"].map((word) => (
                <span
                  key={word}
                  data-reveal-child
                  className="block font-display text-6xl font-bold uppercase leading-[0.85] tracking-[-0.035em] text-ink transition-colors duration-300 group-hover:text-accentText sm:text-7xl lg:text-8xl"
                >
                  {word}
                  <span className="text-accentText transition-colors duration-300 group-hover:text-accentText">
                    .
                  </span>
                </span>
              ))}
            </a>

            <p className="mt-7 max-w-md text-muted">
              {site.role} based in {site.location}. I design and build modern,
              responsive web experiences — from CMS platforms to React front
              ends — and keep them running after launch.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              <span className="flex items-center gap-2 text-accentText">
                <span className="h-1.5 w-1.5 rounded-full bg-accentText" aria-hidden="true" />
                Open to work
              </span>
              <span className="tabular-nums">{localTime} IST</span>
              <span>Indore, India</span>
            </div>
          </div>

          {/* Link columns */}
          <div
            ref={linksRef}
            className="grid gap-10 sm:grid-cols-2 lg:col-span-5"
          >
            <nav aria-label="Footer">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Sections
              </p>
              <ul className="mt-4 space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="u-slide -mx-1.5 inline-flex min-h-[40px] items-center px-1.5 py-1.5 text-sm text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Contact and profiles">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Elsewhere
              </p>
              <ul className="mt-4 space-y-1">
                {elsewhere.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex min-h-[40px] items-center justify-between gap-3 py-1 text-sm text-ink"
                    >
                      <span className="u-link">{link.label}</span>
                      <span className="truncate font-mono text-[11px] tracking-[0.06em] text-muted">
                        {link.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>

      <div className="border-t border-edge">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          <span>
            © {year} {site.name}
          </span>
          <span className="hidden sm:inline">React · Vite · Tailwind</span>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="u-link u-wipe inline-flex min-h-[44px] items-center text-ink"
          >
            Back to top ↑
          </button>
        </Container>
      </div>
    </footer>
  );
}
