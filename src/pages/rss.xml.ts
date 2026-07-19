import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { getNotes } from '../lib/notes';

export async function GET(context: APIContext) {
  const notes = await getNotes();
  return rss({
    title: `${SITE.name} — Notes`,
    description: SITE.tagline,
    site: context.site ?? SITE.url,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.date,
      link: `/notes/${note.id}/`,
      categories: [note.data.category, ...(note.data.subcategory ? [note.data.subcategory] : [])],
    })),
  });
}
