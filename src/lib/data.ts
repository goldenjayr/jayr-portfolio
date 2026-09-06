export const person = {
  name: "Jay-R Joseph Gabunada",
  short: "Jay-R",
  role: "Full-Stack & AI Product Engineer",
  location: "Cebu City, Philippines",
  timezone: "UTC+8",
  tagline: "I build production systems where AI, real-time, and 3D actually ship.",
  verse: "For by the grace of God, I am what I am.",
  verseRef: "1 Corinthians 15:10",
  avatar: "/jayr.jpg",
  email: "goldenjayr@gmail.com",
  workEmail: "jayr@thorneconsultingco.com",
  available: true,
};

export const links = {
  github: "https://github.com/goldenjayr",
  linkedin: "https://www.linkedin.com/in/jay-r-joseph-gabunada-797b14165",
  twitter: "https://twitter.com/dongje007",
  youtube: "https://www.youtube.com/@JayRGabz",
  facebook: "https://facebook.com/goldenjayr",
  email: "mailto:goldenjayr@gmail.com",
};

export const stats = [
  { value: "8+", label: "Years shipping", detail: "Building on GitHub since March 2018" },
  { value: "1,128", label: "Commits to ThorneAI", detail: "#2 contributor across a team of 8" },
  { value: "7", label: "Services in production", detail: "web · ai · auth · service · worker · ws · print" },
  { value: "66", label: "Public repositories", detail: "From WebGL to Python imaging pipelines" },
];

export const about = [
  "I'm a full-stack engineer from Cebu City who spends most of his time in the messy middle of hard products — the part where an AI demo has to become a system that eight people can work on and thousands of people can rely on.",
  "For the last few years that has meant two things. Real-time 3D: building the garment configurator and asset pipeline at 23point5, an on-demand apparel platform where a design has to render accurately in the browser and survive all the way to a factory. And AI infrastructure: ThorneAI, a career-coaching platform where I'm the second-largest contributor to a 6,799-commit monorepo — agents, RAG, speech, auth, queues, sockets and observability.",
  "I like the unglamorous parts. Migrations that don't lose data. Queues that drain. Traces that tell you the truth at 3am. The interface is the promise; the system is whether you keep it.",
  "Away from the editor I sing, read, and build things for my church — including the platform it now runs on.",
];

export type Project = {
  slug: string;
  name: string;
  kind: string;
  year: string;
  featured?: boolean;
  summary: string;
  problem: string;
  approach: string[];
  stack: string[];
  metrics: { value: string; label: string }[];
  href?: string;
  repo?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "thorneai",
    name: "ThorneAI",
    kind: "AI career-coaching platform",
    year: "2025 — Present",
    featured: true,
    accent: "#e0b44a",
    summary:
      "A production AI platform for CV analysis, interview preparation, speech coaching and work simulations — built as a seven-service monorepo with a team of eight.",
    problem:
      "Career coaching is expensive and doesn't scale. The product needed to feel like a human coach — reading your CV, listening to you speak, running you through realistic work simulations — while remaining cheap enough per session to give away at the entry tier.",
    approach: [
      "Architected a Turborepo monorepo: seven deployable apps (web, ai, auth, service, worker, ws, print) over fourteen shared packages, so domain logic like pricing, RBAC and cost accounting lives in exactly one place.",
      "Built the agent layer on Mastra with Pinecone-backed retrieval, running Anthropic and OpenAI behind a single AI SDK interface so a model can be swapped per-task without touching product code.",
      "Wired the speech loop end to end — Deepgram for transcription, ElevenLabs for synthesis — and pushed long-running work into BullMQ workers with Socket.io over a Redis adapter for live progress.",
      "Ran authentication as its own Fastify service on Better Auth with SSO and SCIM, because enterprise buyers ask for provisioning before they ask for features.",
      "Instrumented everything with OpenTelemetry and Sentry, and added a dedicated cost-sink package so token spend is attributable per user, per feature, per model.",
    ],
    stack: ["TypeScript", "Next.js", "Mastra", "Pinecone", "Anthropic", "OpenAI", "Deepgram", "ElevenLabs", "Better Auth", "Fastify", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Socket.io", "Python", "OpenTelemetry", "Playwright", "Turborepo"],
    metrics: [
      { value: "1,128", label: "commits authored" },
      { value: "6,799", label: "total repo commits" },
      { value: "7", label: "deployable services" },
      { value: "14", label: "shared packages" },
    ],
  },
  {
    slug: "23point5",
    name: "23point5 3D Studio",
    kind: "Real-time apparel configurator",
    year: "2022 — 2025",
    featured: true,
    accent: "#7dd3fc",
    summary:
      "Browser-based 3D garment design for an on-demand apparel platform — where what you see on screen has to be what the factory cuts and sews.",
    problem:
      "23point5 manufactures every order from scratch, with no blank garments. That makes the 3D preview load-bearing: if the render lies about placement, scale or colour, the mistake is physical, and it ships.",
    approach: [
      "Worked on the Three.js and react-three-fiber core that renders garments in real time, with a Konva-based 2D swatch editor layered over the model so designers edit flat and see the result draped instantly.",
      "Owned a large share of the Template Upload API — a Node service that ingests artwork and GLTF assets, normalises them through ImageMagick, and streams multipart uploads to S3 with resumable chunking for large files on unreliable connections.",
      "Built the Export Configurator, a React Flow driven interface for defining and versioning product export pipelines.",
    ],
    stack: ["Three.js", "react-three-fiber", "Konva", "React", "Node.js", "AWS S3", "GLTF", "ImageMagick", "RethinkDB", "React Flow", "Sentry"],
    metrics: [
      { value: "118", label: "commits to upload API" },
      { value: "488", label: "total API commits" },
      { value: "3+", label: "years on platform" },
      { value: "0", label: "blank garments used" },
    ],
  },
  {
    slug: "church-platform",
    name: "Church Platform",
    kind: "Full church-management SaaS",
    year: "2025 — 2026",
    featured: true,
    accent: "#c4b5fd",
    summary:
      "A complete operating system for a church — members, giving and finances, learning, community, and a live presenter mode for services. Built solo, in the evenings.",
    problem:
      "Churches run on a scattering of spreadsheets, group chats and slide decks. My own needed one system that a volunteer could operate on a Sunday morning without training.",
    approach: [
      "Shipped seven route groups behind a single Next.js app — admin, auth, community, learning, main, presenter and user — each with its own access model over a shared Prisma schema.",
      "Built a finance module with a mobile-first audit view, because the people who check the books do it on a phone, not a laptop.",
      "Added a presenter mode for live services, and used the Anthropic SDK for content assistance in the learning and community tooling.",
      "Kept the whole thing on Radix primitives with drag-and-drop ordering, so volunteers rearrange a service order the way they'd expect to.",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Anthropic SDK", "Radix UI", "dnd-kit", "Tailwind CSS"],
    metrics: [
      { value: "484", label: "commits authored" },
      { value: "7", label: "route groups" },
      { value: "1", label: "developer" },
      { value: "13", label: "months" },
    ],
  },
  {
    slug: "interview-platform",
    name: "Technical Interview Platform",
    kind: "In-browser assessment engine",
    year: "2026",
    accent: "#86efac",
    summary:
      "A coding-assessment tool that runs JavaScript, Python and real SQL entirely in the candidate's browser — no execution backend, no container costs, no sandbox escape surface.",
    problem:
      "Every interview platform pays for remote code execution and inherits its security problems. For a junior-level assessment, that entire tier is avoidable.",
    approach: [
      "Ran Python through Pyodide and JavaScript through Sucrase, both client-side, so candidate code never touches a server.",
      "Used PGlite to run an actual PostgreSQL instance in WebAssembly, which means SQL questions are graded against real query semantics rather than a parser approximation.",
      "Built the editor on CodeMirror 6 with per-language modes and theme switching, and used React Flow for the interviewer's question-graph view.",
    ],
    stack: ["Next.js", "TypeScript", "CodeMirror 6", "PGlite", "Pyodide", "Sucrase", "React Flow", "WebAssembly", "Motion"],
    metrics: [
      { value: "125", label: "commits" },
      { value: "3", label: "languages, in-browser" },
      { value: "0", label: "execution servers" },
    ],
    repo: "https://github.com/goldenjayr/junior-exam",
  },
  {
    slug: "poultry-farm",
    name: "Poultry Farm Operations",
    kind: "Voice-first farm management",
    year: "2026",
    accent: "#fca5a5",
    summary:
      "Flock, feed and mortality tracking for a working farm, driven by voice — because the person recording the data has both hands full and gloves on.",
    problem:
      "Farm software assumes a desk. Real data entry happens in a barn, mid-task, where typing on a phone isn't an option.",
    approach: [
      "Built a LiveKit realtime voice channel so an operator can log counts and events by speaking, hands-free.",
      "Backed it with Supabase for auth and Postgres, and surfaced trends through Recharts dashboards for feed conversion and mortality.",
    ],
    stack: ["Next.js", "LiveKit", "Supabase", "PostgreSQL", "Recharts", "Motion", "Tailwind CSS"],
    metrics: [
      { value: "51", label: "commits" },
      { value: "Hands-free", label: "primary input" },
    ],
    repo: "https://github.com/goldenjayr/poultry-farm",
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    kind: "Python imaging tool",
    year: "2026",
    accent: "#fdba74",
    summary:
      "Colour-key background removal that handles the case every naive implementation gets wrong: white buttons on a white shirt against a white background.",
    problem:
      "Threshold-based background removal deletes matching colours anywhere in the image, punching holes through the subject. That's a correctness bug, not a tuning problem.",
    approach: [
      "Removed only background regions connected to the image border via flood fill, so enclosed same-coloured areas inside the subject survive by construction.",
      "Auto-detected the key colour from image corners, and applied a soft alpha ramp at edges to avoid the jagged outline that hard thresholding produces.",
      "Shipped it as both a bulk CLI and a small web UI with ZIP download for batch work.",
    ],
    stack: ["Python", "Pillow", "NumPy", "Flask"],
    metrics: [
      { value: "Interior", label: "regions preserved" },
      { value: "Anti-aliased", label: "edge quality" },
    ],
    repo: "https://github.com/goldenjayr/background-remover",
  },
];

export const experience = [
  {
    company: "Thorne Consulting",
    product: "ThorneAI",
    role: "Senior Full-Stack Engineer",
    period: "2025 — Present",
    location: "Remote",
    body: "Second-largest contributor to a seven-service AI platform, across the agent layer, authentication service, background workers and realtime socket tier.",
    tags: ["TypeScript", "Mastra", "Prisma", "BullMQ", "Better Auth", "OpenTelemetry"],
  },
  {
    company: "23point5",
    product: "3D Design Studio",
    role: "Software Engineer — 3D & Platform",
    period: "2022 — 2025",
    location: "Irvine, CA · Remote",
    body: "Real-time WebGL garment configurator and the asset pipeline behind it, for an on-demand apparel platform manufacturing every order from scratch.",
    tags: ["Three.js", "react-three-fiber", "Konva", "Node.js", "AWS S3"],
  },
  {
    company: "Independent & agency work",
    product: "Cebu City",
    role: "Web Developer",
    period: "2018 — 2022",
    location: "Cebu City, PH",
    body: "React, Node and GraphQL product work, alongside a deep public catalogue of WebGL, state-machine and realtime experiments.",
    tags: ["React", "Node.js", "GraphQL", "Socket.IO", "Redux"],
  },
];

export const skills = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "GLSL"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Motion", "GSAP", "Radix UI", "CodeMirror"] },
  { group: "3D & Graphics", items: ["Three.js", "react-three-fiber", "Konva", "GLTF", "Canvas", "WebAssembly"] },
  { group: "Backend", items: ["Node.js", "Fastify", "Express", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Socket.io", "GraphQL"] },
  { group: "AI", items: ["Mastra", "Pinecone", "Anthropic", "OpenAI", "Deepgram", "ElevenLabs", "AI SDK", "RAG"] },
  { group: "Platform", items: ["AWS S3", "Docker", "Turborepo", "OpenTelemetry", "Sentry", "Playwright", "Supabase", "Vercel"] },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];
