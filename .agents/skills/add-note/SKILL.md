---
name: add-note
description: Add a new note to the oad.tq personal site. Use when the user wants to publish a new blog post/note, or import a note from their Obsidian vault into the site.
---

# Add a note

Notes are markdown files in `src/content/notes/`. There is no database — the file is the content. The sidebar, home list, RSS, and sitemap all update automatically from the files in that folder.

## Steps

1. Create `src/content/notes/<slug>.md`. The filename (kebab-case, no number prefixes) becomes the URL: `/notes/<slug>/`.
2. Add frontmatter (all fields except `subcategory`, `tags`, `draft` are required):

```yaml
---
title: "Note title"
description: "One or two sentences — shown under the title in list rows; also the meta description."
date: YYYY-MM-DD
category: Blog
subcategory: Build in Public
tags: [agents, infra]
draft: false
---
```

3. **Reuse existing categories/subcategories** before inventing new ones. Current set: `Blog` (sub: `Build in Public`), `Dev` (subs: `AI`, `Ops`), `Product` (no sub). If you genuinely need a new top-level category, also add it to `CATEGORY_ORDER` in `src/lib/notes.ts`, otherwise it sorts to the end.
4. `draft: true` hides the note from the site entirely.
5. Verify: `npm run dev` and open http://localhost:4321 — the note must appear in the home list and the left sidebar. `npm run build` must pass before deploy.

## Markdown conventions (required)

- **No `#` H1 in the body.** The title renders from frontmatter. Section headings start at `##`; sub-sections use `###`.
- **No Obsidian syntax.** `![[image.png]]` embeds and `[[wikilinks]]` do not render — convert to standard markdown or remove. When importing a vault note, clean these up.
- **No bare source URLs at the top of the note.** Inline-link them where relevant, or collect them under `### References` at the end (bulleted `- [Title](url)` list).
- **Source notes open with an epigraph.** If the note distills external material, start with one blockquote: `> Working notes from [Title](url) and [Title](url).`
- **Hard line breaks inside a paragraph need two trailing spaces**, otherwise consecutive lines collapse into one.
- **ASCII diagrams and terminal sessions**: fenced code blocks with language `text`. Commands use `bash`; configs use their real language (`dockerfile`, `yaml`). Code blocks render as navy panels — keep lines under ~90 chars so they don't scroll.
- **Tables** use standard markdown pipes.

## Examples in repo

- Original essay: `src/content/notes/open-agent-workspaces.md`
- Distilled source note: `src/content/notes/harness-engineering.md`
- Reference cheatsheet with tables: `src/content/notes/pmf.md`
