"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { Github, Linkedin, Youtube } from "./BrandIcons";
import { person, links } from "@/lib/data";
import FieldCanvas from "./FieldCanvas";

const socials = [
  { href: links.github, label: "GitHub", Icon: Github },
  { href: links.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: links.youtube, label: "YouTube", Icon: Youtube },
  { href: links.email, label: "Email", Icon: Mail },
];

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="noise relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-70" />
      <FieldCanvas />

      {/* Vignette: keeps the field from fighting the type */}
      {/* Scrim under the headline only — the field stays fully visible to its right */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,var(--color-ink)_0%,rgba(6,6,8,0.94)_26%,rgba(6,6,8,0.5)_50%,transparent_74%)]" />
      {/* Edge fade so the field never hits the section boundary hard */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(6,6,8,0.42)_80%,var(--color-ink)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32">
        <motion.div
          data-reveal
          custom={0}
          variants={rise}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-3 rounded-full border border-line bg-raised/70 py-1.5 pr-4 pl-1.5 backdrop-blur-sm"
        >
          <Image
            src={person.avatar}
            alt=""
            width={28}
            height={28}
            priority
            className="h-7 w-7 rounded-full object-cover ring-1 ring-line-bright"
          />
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs text-soft">
            Available for select work · {person.location}
          </span>
        </motion.div>

        <motion.h1
          data-reveal
          custom={1}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-9 text-[clamp(3rem,11vw,8.5rem)] leading-[0.86] font-medium tracking-[-0.04em]"
        >
          <span className="gradient-text block">Jay-R</span>
          <span className="font-display gold-text block italic">Gabunada</span>
        </motion.h1>

        <motion.p
          data-reveal
          custom={2}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-soft md:text-xl"
        >
          {person.role} in Cebu City.{" "}
          <span className="text-mute">{person.tagline}</span>
        </motion.p>

        <motion.div
          data-reveal
          custom={3}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-11 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-xl bg-bright px-6 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            View selected work
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-line-bright bg-raised/50 px-6 py-3.5 text-sm font-medium text-soft backdrop-blur-sm transition-colors hover:border-gold/50 hover:text-bright"
          >
            Start a conversation
          </a>

          <div className="ml-1 flex items-center gap-1">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-transparent text-mute transition-colors hover:border-line hover:bg-raised/60 hover:text-gold"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a
        data-reveal
        href="#work"
        aria-label="Scroll to work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-mute transition-colors hover:text-gold"
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
