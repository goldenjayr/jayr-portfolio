import Image from "next/image";
import { about, person, links } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 border-y border-line bg-surface/30"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <SectionHeading index="02" title="Engineer in Cebu City, building for the messy middle." />

        <div className="grid gap-14 lg:grid-cols-[1fr_380px] lg:gap-20">
          <div className="space-y-6">
            {about.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <p className="text-pretty text-base leading-[1.75] text-mute md:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <blockquote className="mt-12 border-l-2 border-gold/50 pl-6">
                <p className="font-display text-xl text-soft italic md:text-2xl">
                  &ldquo;{person.verse}&rdquo;
                </p>
                <cite className="mt-3 block font-mono text-xs tracking-[0.16em] text-mute uppercase not-italic">
                  {person.verseRef} — the line on my GitHub profile since 2018
                </cite>
              </blockquote>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-2xl border border-line">
                <Image
                  src={person.avatar}
                  alt={`Portrait of ${person.name}`}
                  width={460}
                  height={460}
                  className="w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              </div>

              <dl className="mt-7 space-y-0 text-sm">
                {[
                  ["Based in", person.location],
                  ["Timezone", person.timezone],
                  ["Focus", "AI systems · Realtime · 3D"],
                  ["Currently", "ThorneAI at Thorne Consulting"],
                  ["Status", "Open to select work"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                  >
                    <dt className="font-mono text-[11px] tracking-[0.14em] text-mute uppercase">
                      {k}
                    </dt>
                    <dd className="text-right text-soft">{v}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 block text-center font-mono text-xs tracking-[0.14em] text-mute uppercase transition-colors hover:text-gold"
              >
                github.com/goldenjayr →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
