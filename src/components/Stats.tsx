import { stats } from "@/lib/data";
import Reveal from "./Reveal";
import Counter from "./Counter";

export default function Stats() {
  return (
    <section className="relative border-y border-line bg-surface/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className="bg-ink px-6 py-10 md:px-8 md:py-14"
          >
            <div className="font-display text-4xl leading-none text-bright md:text-5xl">
              <Counter value={s.value} />
            </div>
            <div className="mt-3 text-sm font-medium text-soft">{s.label}</div>
            <div className="mt-1.5 text-xs leading-relaxed text-mute">{s.detail}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
