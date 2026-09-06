import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase">404</p>
        <h1 className="font-display mt-5 text-5xl text-bright italic md:text-6xl">
          Nothing here.
        </h1>
        <p className="mt-5 text-mute">That page doesn&rsquo;t exist — or it moved.</p>
        <Link
          href="/"
          className="mt-9 inline-block rounded-xl bg-bright px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
