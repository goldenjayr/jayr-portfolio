import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { person, links } from "@/lib/data";
import { SITE } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Jay-R Joseph Gabunada is a full-stack and AI product engineer in Cebu City, building production systems across AI agents, real-time infrastructure and browser 3D.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${person.name} — ${person.role}`,
    template: `%s — ${person.short}`,
  },
  description,
  keywords: [
    "Jay-R Joseph Gabunada", "goldenjayr", "full-stack engineer", "AI engineer",
    "Three.js", "Next.js", "TypeScript", "Cebu City", "software engineer Philippines",
  ],
  authors: [{ name: person.name, url: links.github }],
  creator: person.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE,
    siteName: `${person.name} — Portfolio`,
    title: `${person.name} — ${person.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — ${person.role}`,
    description,
    creator: "@dongje007",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#060608",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: "goldenjayr",
  jobTitle: person.role,
  description,
  image: `${SITE}${person.avatar}`,
  email: person.email,
  url: SITE,
  address: { "@type": "PostalAddress", addressLocality: "Cebu City", addressCountry: "PH" },
  worksFor: { "@type": "Organization", name: "Thorne Consulting" },
  sameAs: [links.github, links.linkedin, links.twitter, links.youtube],
  knowsAbout: [
    "TypeScript", "React", "Next.js", "Node.js", "Three.js", "WebGL",
    "Artificial Intelligence", "PostgreSQL", "Distributed Systems",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
      >
        <noscript>
          {/* Motion renders initial={{opacity:0}} into the SSR markup — without JS
              those elements would never animate in, so force them visible. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
