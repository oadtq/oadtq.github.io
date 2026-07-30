# AGENTS.md — oad.tq

This is a personal website built with Astro. Keep it minimal, fast, and readable.

## Project overview

- **Framework:** Astro 5, static output
- **Styling:** IBM Plex Mono everywhere; note prose uses Space Grotesk + JetBrains Mono
- **Design target:** minimal, flat, sharp, inspired by [ivan.codes](https://www.ivan.codes/)
- **Content:** Markdown notes in `src/content/notes/` loaded via Astro content collections

## How to run

```bash
npm run dev      # localhost:4321
npm run build    # build to dist/
npm run preview  # preview dist/
```

Always run `npm run build` before finishing work. It must produce 5 pages: the 4 core
pages (index, projects, writing, recommendations) + 1 note. The RSS feed is an endpoint
and isn't included in that count.

## Project structure

```
src/
  components/
    SideNav.astro       # page nav: About / Projects / Writing
  layouts/
    Base.astro          # HTML shell, fonts, no header
  pages/
    index.astro         # About (oad.tq) — the landing route
    projects.astro      # Projects
    writing.astro       # Writing — flat, date-sorted note list
    recommendations.astro  # Recommendations — links grouped by date
    notes/[slug].astro  # note route
    rss.xml.ts          # RSS feed
  styles/
    global.css          # site-wide styles
    prose.css           # note-body typography only
  content/notes/      # markdown notes
  consts.ts           # site metadata, NAV, PROJECTS, RECOMMENDATIONS
  content.config.ts   # content collection schema
```

## Pages

The site is exactly four core pages plus note detail routes:

| Page            | Route               | Content                                       |
| --------------- | ------------------- | --------------------------------------------- |
| About           | `/`                 | intro paragraph + social chips                |
| Projects        | `/projects/`        | `PROJECTS` from `consts.ts`, with blurbs      |
| Writing         | `/writing/`         | all notes, newest first, with month + year    |
| Recommendations | `/recommendations/` | `RECOMMENDATIONS`, grouped by date            |

`SideNav` renders these four from `NAV` in `consts.ts` and takes an `active`
prop (`about` \| `projects` \| `writing` \| `recommendations`). Note pages mark
`writing` active.
Add a page by extending `NAV` — don't hand-roll links.

## Design constraints

- No purple gradients, no rounded corners, no AI-slop indicators
- Keep borders and colors restrained: `#fafafa` bg, `#171717` text, `#e5e5e5` lines
- Sidebar is the only navigation, so it stays visible on mobile — below 1023px it
  flips to a horizontal row above the content instead of hiding
- Nav is text-only: the current page is marked with accent color and weight, never a
  button, box, or background fill
- Keep each core page to one concern; don't merge Projects, Writing, or Recommendations
  back into About
- No email address anywhere in the source; contact happens through the social links
- No heavy frameworks; no new dependencies unless truly necessary

## Adding a note

1. Create `src/content/notes/<slug>.md` (kebab-case, no number prefixes)
2. Add required frontmatter:
   ```yaml
   ---
   title: "Note title"
   description: "One or two sentences"
   date: 2026-07-19
   category: Blog      # one of: Blog, Dev, Product
   subcategory: Build in Public   # optional
   ---
   ```
3. Reuse existing categories/subcategories. They're metadata for the RSS feed only — no page renders them as navigation.
4. Body headings start at `##` (no H1; the title is frontmatter).
5. Collect source URLs under `### References` at the end, not as bare URLs at the top.
6. Verify `npm run build` passes and the note appears on `/writing/`.

## Adding a recommendation

Recommendations are data, not content files. Edit `RECOMMENDATIONS` in `consts.ts`:

1. If today's batch already exists, append to its `items` array. Otherwise prepend a new
   group with an ISO `date`.
2. Each entry needs `title`, `url`, `source` (publisher or author, shown on the right),
   and `comment` — a first-person sentence or two on why it's worth the time.
3. Groups render newest first; no other page or feed consumes `RECOMMENDATIONS`.

## Editing conventions

- Prefer editing shared functions over duplicating logic
- Keep diffs small; deletion over addition
- Don't change fonts or the core color palette without explicit approval
- Don't add a site header; navigation is the sidebar + the `oad.tq/writing` link on note pages
