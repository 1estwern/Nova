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

/** Примеры в ленте — только пока у пользователя нет своих записей. */
export const SEED_POSTS: NotePost[] = [
  {
    id: "seed-1",
    time: "сегодня, 11:24",
    text: "Сижу, знаю что надо смонтировать ролик — уже час листаю референсы вместо монтажа. Может на этой неделе один формат: talking head, без адского монтажа?",
    tags: ["Прокрастинация", "Контент", "Фокус"],
    top: "🧭",
  },
  {
    id: "seed-2",
    time: "вчера, 22:03",
    text: "В 22:30 наконец перестаю спорить с собой. Завтра попробую писать сценарий не с утра, а вечером — вдруг так честнее.",
    tags: ["Ритм", "СДВГ", "Привычка"],
    top: "❤️",
  },
  {
    id: "seed-3",
    time: "28 апр, 08:48",
    text: "В заметках куча идей для постов, выложила одну за две недели. Боюсь не «мало контента», а что снова брошу на середине.",
    tags: ["Креатор", "Страх", "Энергия"],
    top: "🔥",
  },
];

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
