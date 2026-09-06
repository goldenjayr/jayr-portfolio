"use client";

import { useState } from "react";
import { MotionConfig } from "motion/react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    // CSS alone can't stop Motion's JS-driven animations; this makes them
    // respect prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      <main id="main">
        <Hero />
        <Marquee />
        <Stats />
        <Work />
        <About />
        <Experience />
        <Stack />
        <Contact />
      </main>
    </MotionConfig>
  );
}
