"use client";

import { useSyncExternalStore } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { Github, Linkedin, Youtube } from "./BrandIcons";
import { person, links } from "@/lib/data";
import Reveal from "./Reveal";

const channels = [
  { href: links.email, label: "Email", value: person.email, Icon: Mail },
  { href: links.github, label: "GitHub", value: "goldenjayr", Icon: Github },
  { href: links.linkedin, label: "LinkedIn", value: "jay-r-joseph-gabunada", Icon: Linkedin },
  { href: links.youtube, label: "YouTube", value: "@JayRGabz", Icon: Youtube },
];

const CEBU = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Manila",
});

// Subscribing to a 30s bucket keeps getSnapshot referentially stable (a fresh
// string each call would loop) while still ticking the clock.
const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
};
const getBucket = () => Math.floor(Date.now() / 30_000);

function LocalTime() {
  // null on the server, so the markup matches until hydration fills the clock in.
  const bucket = useSyncExternalStore(subscribe, getBucket, () => null);

  return (
    <span className="font-mono tabular-nums">
      {bucket === null ? "--:--" : CEBU.format(new Date())} in Cebu City
    </span>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[520px] bg-[radial-gradient(ellipse_at_50%_100%,rgba(224,180,74,0.09),transparent_66%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-44">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-gold uppercase">
            <span>05</span>
            <span className="h-px w-10 bg-gold/40" />
            <span>Contact</span>
          </div>

          <h2 className="mt-8 max-w-4xl text-balance text-4xl leading-[1.03] font-medium tracking-tight text-bright sm:text-6xl md:text-7xl">
            Have something hard
            <br />
            <span className="font-display gold-text italic">worth building?</span>
          </h2>

          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-mute">
            I&rsquo;m open to select engineering work — AI platforms, realtime systems,
            browser 3D, or a codebase that needs someone who enjoys the parts nobody
            volunteers for.
          </p>

          <a
            href={links.email}
            className="group mt-11 inline-flex items-center gap-3 rounded-2xl bg-bright px-8 py-4.5 text-base font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            {person.email}
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ href, label, value, Icon }, i) => (
            <Reveal key={label} delay={i * 0.06} className="bg-ink">
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer noopener"
                className="group flex h-full flex-col justify-between gap-8 p-7 transition-colors hover:bg-raised/50"
              >
                <div className="flex items-start justify-between">
                  <Icon size={19} className="text-mute transition-colors group-hover:text-gold" />
                  <ArrowUpRight
                    size={15}
                    className="text-mute opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-[0.16em] text-mute uppercase">
                    {label}
                  </div>
                  <div className="mt-1.5 truncate text-sm text-soft transition-colors group-hover:text-bright">
                    {value}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <footer className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 text-xs text-mute sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {person.name}. Built with Next.js — no template.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <LocalTime />
          </div>
        </footer>
      </div>
    </section>
  );
}
