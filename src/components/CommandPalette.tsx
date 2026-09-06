"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";
import { links, nav, projects } from "@/lib/data";

type Item = { label: string; hint: string; href: string; external?: boolean };

const items: Item[] = [
  ...nav.map((n) => ({ label: n.label, hint: "Section", href: n.href })),
  ...projects.map((p) => ({
    label: p.name,
    hint: p.kind,
    href: p.repo ?? "#work",
    external: Boolean(p.repo),
  })),
  { label: "GitHub", hint: "goldenjayr", href: links.github, external: true },
  { label: "LinkedIn", hint: "Profile", href: links.linkedin, external: true },
  { label: "YouTube", hint: "@JayRGabz", href: links.youtube, external: true },
  { label: "Email", hint: "goldenjayr@gmail.com", href: links.email, external: true },
];

const LIST_ID = "palette-list";
const optionId = (i: number) => `palette-option-${i}`;

/**
 * Only mounted while the palette is open, so query/active start fresh every
 * time without an effect resetting them.
 *
 * Follows the ARIA combobox pattern: focus stays on the input and the active
 * row is announced via aria-activedescendant, so there is exactly one tab stop
 * to trap.
 */
function PaletteBody({ close }: { close: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q),
    );
  }, [query]);

  // Focus the input on open, restore focus to the opener on close, and stop the
  // page behind from scrolling while the overlay is up.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const id = setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      clearTimeout(id);
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, []);

  // Keep the highlighted row inside the scroll viewport.
  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (item: Item) => {
    close();
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    // The input is the only tab stop, so swallowing Tab traps focus in the dialog.
    if (e.key === "Tab") {
      e.preventDefault();
      inputRef.current?.focus();
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      return close();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(results.length, 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % Math.max(results.length, 1));
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setActive(Math.max(results.length - 1, 0));
    }
    if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
      initial={{ opacity: 0, scale: 0.97, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={onKeyDown}
      className="w-full max-w-lg overflow-hidden rounded-2xl border border-line-bright bg-surface shadow-2xl shadow-black/60"
    >
      <div className="flex items-center gap-3 border-b border-line px-5">
        <Search size={16} aria-hidden className="shrink-0 text-mute" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          placeholder="Jump to a section, project or profile…"
          aria-label="Search sections, projects and profiles"
          role="combobox"
          aria-expanded
          aria-controls={LIST_ID}
          aria-autocomplete="list"
          aria-activedescendant={results.length ? optionId(active) : undefined}
          autoComplete="off"
          spellCheck={false}
          className="h-14 w-full bg-transparent text-sm text-bright outline-none placeholder:text-mute"
        />
        <kbd className="shrink-0 rounded border border-line-bright px-1.5 py-0.5 font-mono text-[10px] text-mute">
          ESC
        </kbd>
      </div>

      <ul
        ref={listRef}
        id={LIST_ID}
        role="listbox"
        aria-label="Results"
        className="max-h-80 overflow-y-auto p-2"
      >
        {results.length === 0 && (
          <li role="presentation" className="px-4 py-8 text-center text-sm text-mute">
            Nothing matches &ldquo;{query}&rdquo;.
          </li>
        )}
        {results.map((item, i) => (
          <li
            key={`${item.label}-${i}`}
            id={optionId(i)}
            role="option"
            aria-selected={i === active}
            onMouseEnter={() => setActive(i)}
            onClick={() => go(item)}
            className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg px-4 py-3 transition-colors ${
              i === active ? "bg-raised text-bright" : "text-soft"
            }`}
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="truncate text-sm">{item.label}</span>
              <span className="truncate font-mono text-[10px] tracking-wide text-mute uppercase">
                {item.hint}
              </span>
            </span>
            {i === active ? (
              item.external ? (
                <ArrowUpRight size={14} aria-hidden className="shrink-0 text-gold" />
              ) : (
                <CornerDownLeft size={13} aria-hidden className="shrink-0 text-gold" />
              )
            ) : null}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  // Global ⌘K / Ctrl+K toggle.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 px-4 pt-[14vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <PaletteBody close={() => setOpen(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
