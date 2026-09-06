const items = [
  "TypeScript", "Next.js", "React", "Node.js", "Three.js", "react-three-fiber",
  "Python", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Socket.io", "Mastra",
  "Pinecone", "Anthropic", "OpenAI", "Deepgram", "ElevenLabs", "AWS S3",
  "Docker", "Turborepo", "OpenTelemetry", "WebAssembly", "Tailwind CSS",
];

export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="marquee-host relative flex overflow-hidden border-b border-line py-5 select-none [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 font-mono text-xs tracking-[0.16em] whitespace-nowrap text-mute uppercase"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-gold/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
