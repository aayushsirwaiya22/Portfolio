import { useState } from "react";
import { projects } from "../../data/projects.js";
import Container from "../common/Container.jsx";
import Marquee from "../common/Marquee.jsx";
import ProjectRow from "./ProjectRow.jsx";
import ProjectModal from "./ProjectModal.jsx";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const scopes = [...new Set(projects.map((project) => project.scope))];

  return (
    <section id="projects" className="pt-20 sm:pt-28">
      <Container>
        {/* Centred display header: a small accent eyebrow over a very large
            word, the way the reference introduces its work section. */}
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-accentText">
            Selected work
          </span>
          <h2 className="mt-5 font-display text-6xl font-bold uppercase leading-[0.85] tracking-[-0.03em] text-ink sm:text-8xl lg:text-9xl">
            Projects
          </h2>
        </div>
      </Container>

      {/* Service band — full bleed, hairline above and below. */}
      <Marquee items={scopes} className="mt-14 py-6" />

      <Container>
        <p className="mt-16 text-center font-mono text-xs uppercase tracking-[0.22em] text-accentText sm:mt-20">
          Select case studies
        </p>

        <div className="mt-10 sm:mt-14">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </Container>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
