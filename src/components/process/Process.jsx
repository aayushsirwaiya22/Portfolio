import { process } from "../../data/experience.js";
import Container from "../common/Container.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import ProcessStep from "./ProcessStep.jsx";

export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-28">
      <Container>
        <SectionTitle number="05" eyebrow="How I work" title="From requirements to delivery." />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((step, index) => (
            <ProcessStep key={step.title} step={step} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
