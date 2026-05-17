import type { ReactionIcon } from "@/lib/note-reactions";

export type NotePost = {
  id: string;
  time: string;
  text: string;
  tags: string[];
  top: ReactionIcon;
  imageUrl?: string;
  isUser?: boolean;
  /** Ключ категории в галерее (обычно первый #тег) */
  categoryKey?: string;
  createdAt?: string;
};

export const NOTES_STORAGE_KEY = "nova-notes-user-v1";
export const CATEGORY_LABELS_KEY = "nova-category-labels-v1";
export const NOTES_UPDATED_EVENT = "nova-notes-updated";

export const UNCATEGORIZED_KEY = "__other__";
export const UNCATEGORIZED_LABEL = "Разное";

/** Примеры в ленте — только пока у пользователя нет своих записей. */
export const SEED_POSTS: NotePost[] = [
  {
    id: "seed-1",
    time: "сегодня, 11:24",
    text: "Сижу, знаю что надо смонтировать ролик — уже час листаю референсы вместо монтажа. Может на этой неделе один формат: talking head, без адского монтажа?",
    tags: ["Прокрастинация", "Контент", "Фокус"],
    top: "🧭",
    categoryKey: "Прокрастинация",
  },
  {
    id: "seed-2",
    time: "вчера, 22:03",
    text: "В 22:30 наконец перестаю спорить с собой. Завтра попробую писать сценарий не с утра, а вечером — вдруг так честнее.",
    tags: ["Ритм", "СДВГ", "Привычка"],
    top: "❤️",
    categoryKey: "Ритм",
  },
  {
    id: "seed-3",
    time: "28 апр, 08:48",
    text: "В заметках куча идей для постов, выложила одну за две недели. Боюсь не «мало контента», а что снова брошу на середине.",
    tags: ["Креатор", "Страх", "Энергия"],
    top: "🔥",
    categoryKey: "Креатор",
  },
];

export function resolveCategoryKey(tags: string[]): string {
  const first = tags[0]?.trim();
  return first || UNCATEGORIZED_KEY;
}

export function categoryLabel(
  key: string,
  overrides: Record<string, string>
): string {
  if (overrides[key]?.trim()) return overrides[key].trim();
  if (key === UNCATEGORIZED_KEY) return UNCATEGORIZED_LABEL;
  return key;
}

export function normalizeNote(raw: NotePost): NotePost {
  const tags = raw.tags?.length ? raw.tags : extractTags(raw.text);
  const categoryKey = raw.categoryKey ?? resolveCategoryKey(tags);
  return {
    ...raw,
    tags,
    categoryKey,
    createdAt:
      raw.createdAt ??
      (raw.id.startsWith("user-")
        ? new Date(Number(raw.id.slice(5)) || Date.now()).toISOString()
        : new Date().toISOString()),
  };
}

/** Свои записи есть — примеры из шаблона не показываем. */
export function postsForFeed(userPosts: NotePost[]): NotePost[] {
  return userPosts.length > 0 ? userPosts : SEED_POSTS;
}

export function formatNoteTime(date = new Date()): string {
  return `сегодня, ${date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export function extractTags(text: string): string[] {
  const matches = text.match(/#([\p{L}\p{N}_-]+)/gu);
  if (!matches) return [];
  return [...new Set(matches.map((m) => m.slice(1)))];
}

export function loadUserNotes(): NotePost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (p): p is NotePost =>
          !!p &&
          typeof p === "object" &&
          typeof (p as NotePost).id === "string" &&
          typeof (p as NotePost).text === "string"
      )
      .map((p) => normalizeNote({ ...p, isUser: true }));
  } catch {
    return [];
  }
}

export function saveUserNotes(posts: NotePost[]) {
  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new Event(NOTES_UPDATED_EVENT));
  } catch {
    /* quota or private mode */
  }
}

export function loadCategoryLabels(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CATEGORY_LABELS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, string>)
      : {};
  } catch {
    return {};
  }
}

export function saveCategoryLabels(labels: Record<string, string>) {
  try {
    localStorage.setItem(CATEGORY_LABELS_KEY, JSON.stringify(labels));
    window.dispatchEvent(new Event(NOTES_UPDATED_EVENT));
  } catch {
    /* ignore */
  }
}

export function createUserNote(input: {
  text: string;
  top: ReactionIcon;
  imageUrl?: string;
}): NotePost {
  const tags = extractTags(input.text);
  const now = new Date();
  return normalizeNote({
    id: `user-${now.getTime()}`,
    time: formatNoteTime(now),
    text: input.text.trim(),
    tags,
    top: input.top,
    imageUrl: input.imageUrl,
    isUser: true,
    createdAt: now.toISOString(),
  });
}

/** Добавить запись в ленту (localStorage + событие обновления). */
export function appendUserNote(input: {
  text: string;
  top: ReactionIcon;
  imageUrl?: string;
}): NotePost {
  const note = createUserNote(input);
  saveUserNotes([note, ...loadUserNotes()]);
  return note;
}
