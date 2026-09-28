// Composes every section in page order. Wired up for real in Phase 3 —
// for now it just proves every section component imports cleanly.
import Navbar from "../components/navbar/Navbar.jsx";
import Hero from "../components/hero/Hero.jsx";
import About from "../components/about/About.jsx";
import Skills from "../components/skills/Skills.jsx";
import Experience from "../components/experience/Experience.jsx";
import Projects from "../components/projects/Projects.jsx";
import Process from "../components/process/Process.jsx";
import Education from "../components/education/Education.jsx";
import Contact from "../components/contact/Contact.jsx";
import Footer from "../components/footer/Footer.jsx";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
  );
}
