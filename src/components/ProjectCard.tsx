"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import type { Project } from "@/lib/data";
import Counter from "./Counter";

function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return { ref, onMove };
}

export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const { ref, onMove } = useSpotlight();

  return (
    <motion.article
      data-reveal
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{ ["--accent" as string]: project.accent }}
      className="group card relative overflow-hidden p-7 transition-colors duration-500 hover:border-line-bright md:p-11"
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(460px circle at var(--mx) var(--my), color-mix(in srgb, var(--accent) 11%, transparent), transparent 62%)",
        }}
      />
      {/* Accent hairline along the top edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent), transparent)",
        }}
      />

      <div className="relative grid gap-10 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.16em] uppercase">
            <span className="text-mute">{String(index + 1).padStart(2, "0")}</span>
            <span style={{ color: project.accent }}>{project.kind}</span>
            <span className="text-mute">{project.year}</span>
          </div>

          <h3 className="mt-5 text-3xl font-medium tracking-tight text-bright md:text-[2.6rem] md:leading-[1.05]">
            {project.name}
          </h3>

          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-soft">
            {project.summary}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-raised/60 px-4 py-2 text-xs font-medium text-soft transition-colors hover:border-line-bright hover:text-bright"
            >
              {open ? <Minus size={13} /> : <Plus size={13} />}
              {open ? "Close case study" : "Read the case study"}
            </button>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-mute transition-colors hover:text-gold"
              >
                Source <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>

        <div className="lg:border-l lg:border-line lg:pl-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-7">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-2xl leading-none text-bright md:text-3xl">
                  <Counter value={m.value} />
                </div>
                <div className="mt-2 text-[11px] leading-snug text-mute">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden"
          >
            <div className="mt-10 border-t border-line pt-9">
              <div className="grid gap-10 md:grid-cols-[1fr_1.35fr]">
                <div>
                  <h4 className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
                    The problem
                  </h4>
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-mute">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
                    What I built
                  </h4>
                  <ul className="mt-4 space-y-4">
                    {project.approach.map((a, i) => (
                      <li key={i} className="flex gap-3.5 text-sm leading-relaxed text-mute">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full"
                          style={{ background: project.accent }}
                        />
                        <span className="text-pretty">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-line bg-raised/60 px-2.5 py-1 font-mono text-[11px] text-mute"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function CompactProject({ project }: { project: Project }) {
  const { ref, onMove } = useSpotlight();
  // The card as a whole opens the live site when there is one, else the source.
  const primary = project.href ?? project.repo;

  return (
    <motion.div
      data-reveal
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ ["--accent" as string]: project.accent }}
      className="group card relative flex flex-col overflow-hidden transition-colors duration-500 hover:border-line-bright"
    >
      {/* Preview: a real screenshot where one exists, an accent wash where it doesn't */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-raised">
        {project.thumb ? (
          <Image
            src={project.thumb}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 30% 0%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 70%), linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
            }}
          />
        )}
        {!project.thumb && (
          <div className="absolute inset-0 grid place-items-center px-6">
            <span
              className="font-display text-balance text-center text-2xl leading-tight italic opacity-70 sm:text-3xl"
              style={{ color: project.accent }}
            >
              {project.name}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        {project.href && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-line-bright bg-ink/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-soft uppercase backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx) var(--my), color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%)",
        }}
      />

      <div className="relative flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <span
            className="font-mono text-[11px] tracking-[0.16em] uppercase"
            style={{ color: project.accent }}
          >
            {project.kind}
          </span>
          {primary && (
            <ArrowUpRight
              size={16}
              className="shrink-0 text-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bright"
            />
          )}
        </div>

        <h3 className="mt-3 text-xl font-medium tracking-tight text-bright">
          {project.name}
        </h3>
        <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-mute">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-1.5">
          {project.stack.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-mute"
            >
              {t}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="px-1 py-0.5 font-mono text-[10px] text-mute">
              +{project.stack.length - 3}
            </span>
          )}
          {project.href && project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
              className="relative z-20 ml-auto font-mono text-[10px] tracking-wide text-mute uppercase transition-colors hover:text-gold"
            >
              Source
            </a>
          )}
        </div>
      </div>

      {/* Overlay link keeps the whole card clickable without nesting a ref-typed anchor. */}
      {primary && (
        <a
          href={primary}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={
            project.href
              ? `${project.name} — open live site`
              : `${project.name} — view source on GitHub`
          }
          className="absolute inset-0 z-10 rounded-2xl"
        />
      )}
    </motion.div>
  );
}
