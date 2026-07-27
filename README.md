# oad.tq

Personal website for blogging, built with [Astro](https://astro.build).

Three core pages, navigated from a text sidebar:

- **oad.tq** (`/`) — about, with links out to GitHub, X, LinkedIn, and Scholar
- **Projects** (`/projects/`) — what I'm building
- **Writing** (`/writing/`) — markdown-powered notes, newest first

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
  components/    # SideNav
  content/       # markdown notes
  layouts/       # Base layout
  lib/           # notes helpers
  pages/         # routes
  styles/        # global.css, prose.css
  consts.ts      # site metadata, nav, projects
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
---
```

The Writing page, RSS feed, and sitemap update automatically.

## Deployment

Hosted on [GitHub Pages](https://pages.github.com) at `oadtq.github.io`. Every push to
`main` triggers `.github/workflows/deploy.yml`, which builds the static site with the
official Astro action and publishes it to Pages. No manual steps required.

Requires the repo's **Settings → Pages → Source** to be set to **GitHub Actions**.

## License

Source code is licensed under the [MIT License](LICENSE). Written content
(the notes under `src/content/`) is personal and remains copyright of the author.
