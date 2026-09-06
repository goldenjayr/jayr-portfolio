import { experience } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-40">
      <SectionHeading
        index="03"
        title="Eight years, three chapters."
        lead="Agency work taught me to ship. 23point5 taught me that a render can be wrong in a way that costs real fabric. ThorneAI taught me what it takes for eight people to move in one codebase."
      />

      <div className="relative">
        {/* Spine */}
        <div className="absolute top-2 bottom-2 left-0 hidden w-px bg-line md:block" />

        <div className="space-y-4">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.09}>
              <div className="group relative md:pl-12">
                <span className="absolute top-9 -left-[3px] hidden h-1.5 w-1.5 rounded-full bg-line-bright ring-4 ring-ink transition-colors duration-300 group-hover:bg-gold md:block" />

                <div className="card p-7 transition-colors duration-500 group-hover:border-line-bright md:p-9">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <div>
                      <h3 className="text-xl font-medium text-bright md:text-2xl">
                        {job.role}
                      </h3>
                      <p className="mt-1.5 text-sm text-soft">
                        {job.company}
                        <span className="text-mute"> · {job.product}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs tracking-[0.14em] text-gold uppercase">
                        {job.period}
                      </div>
                      <div className="mt-1 text-xs text-mute">{job.location}</div>
                    </div>
                  </div>

                  <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-mute">
                    {job.body}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-mute"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
