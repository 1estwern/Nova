import {
  categoryLabel,
  type NotePost,
  UNCATEGORIZED_KEY,
} from "@/lib/notes-storage";

export type GalleryCategory = {
  key: string;
  label: string;
  notes: NotePost[];
};

export function buildGalleryCategories(
  notes: NotePost[],
  labelOverrides: Record<string, string>
): GalleryCategory[] {
  const map = new Map<string, NotePost[]>();

  for (const note of notes) {
    const key = note.categoryKey ?? UNCATEGORIZED_KEY;
    const list = map.get(key) ?? [];
    list.push(note);
    map.set(key, list);
  }

  const categories: GalleryCategory[] = [...map.entries()].map(([key, list]) => ({
    key,
    label: categoryLabel(key, labelOverrides),
    notes: list.sort((a, b) => {
      const ta = a.createdAt ?? "";
      const tb = b.createdAt ?? "";
      return tb.localeCompare(ta);
    }),
  }));

  categories.sort((a, b) => {
    if (a.key === UNCATEGORIZED_KEY) return 1;
    if (b.key === UNCATEGORIZED_KEY) return -1;
    return a.label.localeCompare(b.label, "ru");
  });

  return categories;
}

export function excerpt(text: string, max = 72): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}
