import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  title,
  lead,
}: {
  index: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-gold uppercase">
        <span>{index}</span>
        <span className="h-px w-10 bg-gold/40" />
      </div>
      <h2 className="mt-5 max-w-3xl text-balance text-4xl leading-[1.05] font-medium tracking-tight text-bright sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-mute md:text-lg">
          {lead}
        </p>
      )}
    </Reveal>
  );
}
