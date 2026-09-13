import { projects } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { CompactProject, FeaturedProject } from "./ProjectCard";

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-40">
      <SectionHeading
        index="01"
        title="Systems I've shipped, and what they had to survive."
        lead="Eleven projects, from a seven-service AI platform to a Python tool that fixes one specific bug everyone else ships. Open a case study for the decisions behind it, or open a live one and use it."
      />

      <div className="space-y-6">
        {featured.map((p, i) => (
          <FeaturedProject key={p.slug} project={p} index={i} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <CompactProject key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
