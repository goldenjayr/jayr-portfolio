import { skills } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative scroll-mt-24 border-y border-line bg-surface/30"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <SectionHeading
          index="04"
          title="The toolkit."
          lead="Everything here is something I've used to ship something someone depends on — not a list of things I've read about."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.06} className="bg-ink p-7 md:p-8">
              <h3 className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
                {group.group}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-raised/50 px-3 py-1.5 text-sm text-soft transition-colors hover:border-line-bright hover:text-bright"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
