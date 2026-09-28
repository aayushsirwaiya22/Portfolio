// Fullscreen overlay controlled by Navbar's `isOpen` state. Shown/hidden
// with a plain CSS transition for now — Phase 7 can swap this for the
// reference's clip-path reveal if wanted, same open/close state either way.
import { navLinks } from "../../data/navigation.js";

export default function MobileMenu({ isOpen, onLinkClick }) {
  return (
    <nav
      aria-label="Mobile"
      className={`fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-bg px-6 transition-opacity duration-300 md:hidden ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className="font-display text-4xl text-ink"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
