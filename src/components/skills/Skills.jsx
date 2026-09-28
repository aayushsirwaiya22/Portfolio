import { skillGroups } from "../../data/skills.js";
import Container from "../common/Container.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import SkillCard from "./SkillCard.jsx";

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28">
      <Container>
        <SectionTitle number="03" eyebrow="Technology" title="The stack I work with." />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <SkillCard key={group.title} group={group} />
          ))}
        </div>
      </Container>
    </section>
  );
}
