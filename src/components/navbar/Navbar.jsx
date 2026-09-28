import { useState } from "react";
import { navLinks } from "../../data/navigation.js";
import { site } from "../../data/site.js";
import { useTheme } from "../../hooks/useTheme.js";
import Container from "../common/Container.jsx";
import Button from "../common/Button.jsx";
import MobileMenu from "./MobileMenu.jsx";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-bg/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="font-display text-lg font-bold text-ink" aria-label={`${site.name}, home`}>
          {site.name.split(" ")[0].toUpperCase()}
          <span className="text-accent">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-edge text-ink hover:border-accent"
          >
            {theme === "dark" ? "◐" : "◑"}
          </button>

          <Button href="#contact" variant="primary" className="hidden md:inline-flex">
            Let's Talk
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

      <MobileMenu isOpen={isMenuOpen} onLinkClick={() => setIsMenuOpen(false)} />
    </header>
  );
}
