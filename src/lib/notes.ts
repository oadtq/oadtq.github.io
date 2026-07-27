import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

export async function getNotes(): Promise<Note[]> {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function noteIndex(notes: Note[], id: string): string {
  const i = notes.findIndex((n) => n.id === id);
  return String(notes.length - i).padStart(3, '0');
}

export function formatDate(d: Date): string {
  return d
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase();
}
