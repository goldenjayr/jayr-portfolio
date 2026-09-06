"use client";

import { useEffect, useRef } from "react";

/**
 * A grid of short strokes that orient toward the pointer, like iron filings in a
 * magnetic field. With no pointer (or on touch), it falls back to a slow
 * travelling wave so the hero is never dead.
 *
 * The loop only runs while the canvas is on screen and the tab is visible, and
 * it degrades to a single static frame under prefers-reduced-motion.
 */
export default function FieldCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Keep the grid roughly constant in count rather than in density, so a 4K
    // display doesn't pay for ~3x the trigonometry every frame.
    const TARGET_DOTS = 1400;
    const MIN_SPACING = 34;
    const LEN = 9;

    type Dot = { x: number; y: number; a: number };
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let spacing = MIN_SPACING;

    // Pointer starts off-canvas so the idle wave runs until the user arrives.
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let running = false;
    let onScreen = true;
    let t = 0;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      spacing = Math.max(MIN_SPACING, Math.sqrt((w * h) / TARGET_DOTS));

      dots = [];
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({ x: i * spacing, y: j * spacing, a: 0 });
        }
      }
    };

    const render = (animate: boolean) => {
      if (animate) t += 0.006;
      ctx.clearRect(0, 0, w, h);

      // Influence radius scales with viewport so it feels the same on any screen.
      const reach = Math.min(Math.max(w, h) * 0.42, 520);

      for (const d of dots) {
        let target: number;
        let energy: number;

        if (pointer.active) {
          const dx = pointer.x - d.x;
          const dy = pointer.y - d.y;
          const dist = Math.hypot(dx, dy);
          target = Math.atan2(dy, dx);
          energy = Math.max(0, 1 - dist / reach);
        } else {
          // Idle: a diagonal wave rolling across the field.
          target = Math.sin((d.x + d.y) * 0.004 + t) * Math.PI;
          energy = 0.5;
        }

        // Shortest-path angular easing, so strokes never spin the long way round.
        let delta = target - d.a;
        while (delta > Math.PI) delta -= Math.PI * 2;
        while (delta < -Math.PI) delta += Math.PI * 2;
        d.a += delta * (animate ? 0.14 : 1);

        const eased = energy * energy;
        const alpha = 0.13 + eased * 0.72;
        const len = LEN + eased * 9;

        const cos = Math.cos(d.a) * len * 0.5;
        const sin = Math.sin(d.a) * len * 0.5;

        // Gold only where the field is strong; everything else stays neutral.
        ctx.strokeStyle =
          eased > 0.06
            ? `rgba(224,180,74,${alpha})`
            : `rgba(185,185,205,${alpha * 0.85})`;
        ctx.lineWidth = 1 + eased * 0.7;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(d.x - cos, d.y - sin);
        ctx.lineTo(d.x + cos, d.y + sin);
        ctx.stroke();
      }
    };

    const frame = () => {
      render(true);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || motionQuery.matches) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only animate when the hero is actually on screen and the tab is focused.
    const sync = () => {
      if (motionQuery.matches) {
        stop();
        render(false);
        return;
      }
      if (onScreen && !document.hidden) start();
      else stop();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || motionQuery.matches) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onResize = () => {
      build();
      if (!running) render(false);
    };

    build();
    render(false);
    sync();

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
