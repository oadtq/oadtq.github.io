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

Always run `npm run build` before finishing work. It must produce 5 pages (index + 4 notes + RSS).

## Project structure

```
src/
  components/       Astro components
    HomePreview.astro   # home page content
    SideNav.astro       # categories sidebar (desktop only)
  layouts/
    Base.astro          # HTML shell, fonts, no header
  pages/
    index.astro         # home route
    notes/[slug].astro  # note route
    rss.xml.ts          # RSS feed
  styles/
    global.css          # site-wide styles
    prose.css           # note-body typography only
  content/notes/      # markdown notes
  consts.ts           # site metadata + products
  content.config.ts   # content collection schema
```

## Design constraints

- No purple gradients, no rounded corners, no AI-slop indicators
- Keep borders and colors restrained: `#fafafa` bg, `#171717` text, `#e5e5e5` lines
- Sidebar is hidden on mobile (max-width 1023px)
- Home page is a single page: intro, products, writing
- No separate About page; about content lives on the home page
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
   tags: [agents, infra]            # optional
   ---
   ```
3. Reuse existing categories/subcategories. If adding a new top-level category, also update `CATEGORY_ORDER` in `src/lib/notes.ts`.
4. Body headings start at `##` (no H1; the title is frontmatter).
5. Collect source URLs under `### References` at the end, not as bare URLs at the top.
6. Verify `npm run build` passes and the note appears on the home list and in the sidebar.

## Editing conventions

- Prefer editing shared functions over duplicating logic
- Keep diffs small; deletion over addition
- Don't change fonts or the core color palette without explicit approval
- Don't add a site header; navigation is the sidebar + the `oad.tq/` link on note pages
