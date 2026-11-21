import { useState } from "react";
import { navLinks } from "../../data/navigation.js";
import { site } from "../../data/site.js";
import Container from "../common/Container.jsx";
import Button from "../common/Button.jsx";
import ScrollProgress from "../common/ScrollProgress.jsx";
import MobileMenu from "./MobileMenu.jsx";

// The theme is owned by MainLayout so the intro loader can read it before
// the navbar is mounted.
export default function Navbar({ theme, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-edge bg-[var(--nav-bg)] backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#home"
          className="inline-flex min-h-[44px] items-center font-display text-lg font-bold text-ink"
          aria-label={`${site.name}, home`}
        >          {site.name.split(" ")[0].toUpperCase()}
          <span className="text-accentText">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="u-roll flex min-h-[44px] items-center text-sm text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accentText"
              >
                <span>{link.label}</span>
                <span aria-hidden="true" className="text-accentText">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle light and dark theme"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-edge text-ink transition-colors duration-200 hover:border-accentText hover:text-accentText"
          >
            <span className="transition-transform duration-300 group-hover:rotate-180">
              {theme === "dark" ? "◐" : "◑"}
            </span>
          </button>

          <Button href="#contact" variant="primary" className="hidden md:inline-flex">
            Let&apos;s Talk
          </Button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-edge md:hidden"
          >
            <span
              className={`h-0.5 w-4 bg-ink transition-transform ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-ink transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-ink transition-transform ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </Container>

      <ScrollProgress />
      </header>

      {/* The overlay lives outside the header on purpose: the header's
          backdrop-blur makes it the containing block for fixed children,
          which would shrink a full-screen overlay to the header's height. */}
      <MobileMenu isOpen={isMenuOpen} onLinkClick={() => setIsMenuOpen(false)} />
    </>
  );
}
