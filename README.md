# Jay-R Joseph Gabunada — Portfolio

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Motion.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
```

## Where the content lives

Everything is in **`src/lib/data.ts`** — one file, no CMS. Edit that and the whole
site updates: bio, stats, projects, case studies, experience, skills, links.

## ⚠️ Verify before you publish

The numbers came from your actual repos (`git shortlog`, GitHub API), so they're
real. Two things are **inferred** and you should correct them:

1. **Job titles** in `experience` — I guessed "Senior Full-Stack Engineer" and
   "Software Engineer — 3D & Platform". Use your real titles.
2. **Date ranges** — derived from first/last commit dates, not your actual
   start/end dates. The 2018–2022 "Independent & agency work" entry is the
   roughest; if you were at a named company (DNA Micro?), name it.

The site origin resolves itself: on Vercel it uses `VERCEL_PROJECT_PRODUCTION_URL`,
locally it uses `localhost:3000`. When you point a custom domain at this project,
set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in the Vercel project's
environment variables so canonical URLs, Open Graph and the sitemap follow it.

## Stats provenance

| Number | Source |
|---|---|
| 1,128 commits to ThorneAI | `git shortlog -sn --all` in `MyThorneAI` |
| 6,799 total repo commits | `git rev-list --count --all` |
| 484 commits, church platform | `git log --author=Gabunada` |
| 118 / 488 commits, 23point5 upload API | same |
| 125 commits, interview platform | same |
| 66 public repos | GitHub API |

## Deploy

```bash
npx vercel --prod
```
