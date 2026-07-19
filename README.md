# oad.tq

Personal website and notes of [Bao Tran Quoc](https://oadtq.dev), built with [Astro](https://astro.build).

- **Home:** single-page landing with intro, products, and writing
- **Notes:** markdown-powered blog posts organized by categories
- **Style:** minimal, IBM Plex Mono, inspired by [ivan.codes](https://www.ivan.codes/)
- **Deployment:** static build, configured for Cloudflare Pages via `wrangler.jsonc`

## Tech stack

- Astro 5
- TypeScript
- Markdown content collections
- IBM Plex Mono (site-wide)
- Space Grotesk + JetBrains Mono (note prose only)

## Scripts

```bash
npm run dev      # start dev server
npm run build    # static build to dist/
npm run preview  # preview the built site
```

## Project structure

```
src/
  components/    # HomePreview, SideNav
  content/       # markdown notes
  layouts/       # Base layout
  lib/           # notes helpers
  pages/         # routes
  styles/        # global.css, prose.css
  consts.ts      # site metadata + products
  content.config.ts
```

## Adding a note

Create a new markdown file in `src/content/notes/` with frontmatter:

```yaml
---
title: "Note title"
description: "One or two sentences"
date: 2026-07-19
category: Blog
subcategory: Build in Public
tags: [agents, infra]
---
```

The home list, sidebar, RSS feed, and sitemap update automatically.

## License

Content is personal. Code is provided as-is for reference.
