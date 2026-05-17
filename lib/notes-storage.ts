import type { ReactionIcon } from "@/lib/note-reactions";

export type NotePost = {
  id: string;
  time: string;
  text: string;
  tags: string[];
  top: ReactionIcon;
  imageUrl?: string;
  isUser?: boolean;
};

export const NOTES_STORAGE_KEY = "nova-notes-user-v1";

export const SEED_POSTS: NotePost[] = [
  {
    id: "seed-1",
    time: "сегодня, 11:24",
    text: "Опять откладываю запуск контента — тону в мелочах. Хочу одну тему на эту неделю, не десять.",
    tags: ["Фокус", "Прокрастинация", "Неделя"],
    top: "🧭",
  },
  {
    id: "seed-2",
    time: "вчера, 22:03",
    text: "После 21:00 мысли честнее — похоже, это мой слот для стратегии и сценариев Reels.",
    tags: ["Ритм", "Контент", "Привычка"],
    top: "❤️",
  },
  {
    id: "seed-3",
    time: "29 апр, 08:48",
    text: "Идей для постов много, а публикую раз в неделю. Нужен один формат, который потяну без выгорания.",
    tags: ["Креатор", "Контент", "Энергия"],
    top: "🔥",
  },
];

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
    return parsed.filter(
      (p): p is NotePost =>
        !!p &&
        typeof p === "object" &&
        typeof (p as NotePost).id === "string" &&
        typeof (p as NotePost).text === "string"
    );
  } catch {
    return [];
  }
}

export function saveUserNotes(posts: NotePost[]) {
  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(posts));
  } catch {
    /* quota or private mode */
  }
}
