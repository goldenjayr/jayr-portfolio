"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, person } from "@/lib/data";

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile sheet, and let Escape or a jump to desktop
  // width dismiss it.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => desktop.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gold"
      />

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-ink/90 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20">
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-sm font-medium text-bright"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md border border-line-bright bg-raised font-mono text-[11px] text-gold transition-colors group-hover:border-gold/50">
              JG
            </span>
            <span className="hidden sm:inline">{person.short}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3.5 py-2 text-sm text-mute transition-colors hover:bg-white/5 hover:text-bright"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPalette}
              aria-label="Open command menu"
              className="hidden items-center gap-2 rounded-lg border border-line bg-raised/60 px-3 py-1.5 text-xs text-mute transition-colors hover:border-line-bright hover:text-soft sm:flex"
            >
              <span>Jump to</span>
              <kbd className="rounded border border-line-bright px-1.5 py-0.5 font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>

            <a
              href="#contact"
              className="hidden rounded-lg bg-bright px-4 py-2 text-sm font-medium text-ink transition-opacity hover:opacity-85 sm:block"
            >
              Get in touch
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-soft md:hidden"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-30 bg-ink/95 pt-20 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1 px-6">
            {nav.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-5 text-2xl font-medium text-bright"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </>
  );
}
