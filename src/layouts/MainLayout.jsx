// Composes every section in page order. The intro loader runs before the
// page is mounted, so the hero's entrance animation plays as the terminal
// lifts away rather than being wasted behind it.
import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import Hero from "../components/hero/Hero.jsx";
import Marquee from "../components/common/Marquee.jsx";
import IntroLoader from "../components/common/IntroLoader.jsx";
import About from "../components/about/About.jsx";
import Skills from "../components/skills/Skills.jsx";
import Experience from "../components/experience/Experience.jsx";
import Projects from "../components/projects/Projects.jsx";
import Process from "../components/process/Process.jsx";
import Education from "../components/education/Education.jsx";
import Contact from "../components/contact/Contact.jsx";
import Footer from "../components/footer/Footer.jsx";
import { marqueeItems } from "../data/skills.js";
import { useTheme } from "../hooks/useTheme.js";

const BOOT_KEY = "aayush-booted";

// The terminal runs once per session so a refresh is not punished with it.
// `?boot=1` in the URL forces it back on for testing.
function shouldBoot() {
  if (typeof window === "undefined") return false;
  const forced = new URLSearchParams(window.location.search).get("boot") === "1";
  if (forced) return true;
  try {
    return sessionStorage.getItem(BOOT_KEY) !== "1";
  } catch {
    return true;
  }
}

export default function MainLayout() {
  const { theme, toggleTheme } = useTheme();
  // "booting" -> "revealing" (loader fading, page mounts behind it) -> "ready"
  const [phase, setPhase] = useState(() => (shouldBoot() ? "booting" : "ready"));

  useEffect(() => {
    if (phase !== "booting") return;
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {
      /* private mode — the loader simply runs again next visit */
    }
  }, [phase]);

  const onReveal = useCallback(() => setPhase("revealing"), []);
  const onFinish = useCallback(() => setPhase("ready"), []);

  const showLoader = phase === "booting" || phase === "revealing";
  const showContent = phase === "revealing" || phase === "ready";

  return (
    <>
      {showLoader && <IntroLoader onReveal={onReveal} onFinish={onFinish} />}

      {showContent && (
        <>
          <Navbar theme={theme} onToggleTheme={toggleTheme} />
          <main>
            <Hero />
            <Marquee items={marqueeItems} className="py-5" />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Process />
            <Education />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
