import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

const CATEGORY_ORDER = ['Blog', 'Dev', 'Product'];

export async function getNotes(): Promise<Note[]> {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export interface NoteGroup {
  category: string;
  count: number;
  subs: { subcategory: string | null; notes: Note[] }[];
}

export function groupNotes(notes: Note[]): NoteGroup[] {
  const map = new Map<string, Map<string, Note[]>>();
  for (const note of notes) {
    const cat = note.data.category;
    const sub = note.data.subcategory ?? '';
    if (!map.has(cat)) map.set(cat, new Map());
    const subs = map.get(cat)!;
    if (!subs.has(sub)) subs.set(sub, []);
    subs.get(sub)!.push(note);
  }
  return [...map.entries()]
    .sort(([a], [b]) => {
      const ia = CATEGORY_ORDER.indexOf(a);
      const ib = CATEGORY_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    })
    .map(([category, subs]) => ({
      category,
      count: [...subs.values()].flat().length,
      subs: [...subs.entries()].map(([subcategory, subNotes]) => ({
        subcategory: subcategory || null,
        notes: subNotes,
      })),
    }));
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
