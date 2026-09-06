"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * Counts up the numeric part of a label ("1,128", "8+", "7") on first view and
 * leaves any prefix/suffix untouched. Non-numeric values render as-is.
 */
export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // Memoised: a fresh match array on every render would retrigger the effect
  // below in a loop, pinning the counter at ~0.
  const match = useMemo(() => value.match(/^(\D*)([\d,]+)(.*)$/), [value]);
  const target = match ? Number(match[2].replace(/,/g, "")) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    // Reduced motion runs the same loop with zero duration, so the value still
    // lands on target without a synchronous setState in the effect body.
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 1300;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, match]);

  if (!match) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {match[1]}
      {n.toLocaleString()}
      {match[3]}
    </span>
  );
}
