import { useState } from "react";
import { projects } from "../../data/projects.js";
import Container from "../common/Container.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import ProjectCard from "./ProjectCard.jsx";
import ProjectModal from "./ProjectModal.jsx";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 sm:py-28">
      <Container>
        <SectionTitle number="04" eyebrow="Selected work" title="Client projects." />

        <div className="mt-8">
          {projects.map((project, index) => (
            <ProjectCard
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
