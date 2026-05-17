import { NOTE_REACTIONS } from "@/lib/note-reactions";
import type { NotePost } from "@/lib/notes-storage";

const REACTION_LABEL: Record<string, string> = Object.fromEntries(
  NOTE_REACTIONS.map((r) => [r.icon, r.label])
);

/** Невидимый промпт для чата: Nova генерирует идею из ленты заметок. */
export function buildNotesFeedSeedPrompt(posts: NotePost[]): string {
  if (posts.length === 0) {
    return [
      "Пользователь открыл «Получить идею из ленты», но заметок пока нет.",
      "Коротко предложи выгрузить одну мысль в ленту (10 секунд) и объясни, зачем реакция.",
      "Пиши как Nova — без клише.",
    ].join("\n");
  }

  const lines = posts.slice(0, 12).map((p, i) => {
    const reaction = REACTION_LABEL[p.top] ?? p.top;
    const tags = p.tags.length ? ` · ${p.tags.map((t) => `#${t}`).join(" ")}` : "";
    const photo = p.imageUrl ? " · фото" : "";
    const author = p.isUser ? "моя" : "пример";
    return `${i + 1}. [${author}, ${p.time}, ${reaction}] ${p.text}${tags}${photo}`;
  });

  return [
    "Пользователь нажал «Получить идею из ленты». Ниже — его лента заметок; реакции = приоритет (❤️ важно, 🔥 в работе, 🌱 позже, 🧭 разобрать).",
    "",
    lines.join("\n"),
    "",
    "Задача: по этим записям дай ОДИН следующий шаг — идею, привычку или действие на сегодня. Не список дел и не «мотивацию».",
    "Структура ответа: сначала чёткая идея (1–2 предложения), затем 2–3 конкретных микро-шага или один уточняющий вопрос, если без него рано.",
    "Опирайся на повторяющиеся темы и реакции; игнорируй шум.",
    "Пиши как Nova: коротко, по-человечески, на «ты».",
  ].join("\n");
}

export const CHAT_FROM_NOTES_PARAM = "notes";
