# oad.tq

Personal website for blogging, built with [Astro](https://astro.build).

- **Home:** single-page landing with intro, products, and writing
- **Notes:** markdown-powered blog posts organized by categories

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

## Deployment

Hosted on [GitHub Pages](https://pages.github.com) at `oadtq.github.io`. Every push to
`main` triggers `.github/workflows/deploy.yml`, which builds the static site with the
official Astro action and publishes it to Pages. No manual steps required.

Requires the repo's **Settings → Pages → Source** to be set to **GitHub Actions**.

## License

Source code is licensed under the [MIT License](LICENSE). Written content
(the notes under `src/content/`) is personal and remains copyright of the author.
