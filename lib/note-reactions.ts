export const NOTE_REACTIONS = [
  { icon: "❤️", label: "важно", hint: "цепляет сейчас — подсказки опираются на это" },
  { icon: "🔥", label: "в работе", hint: "тема активна, можно сделать шаг сегодня" },
  { icon: "🌱", label: "позже", hint: "не забыть, но не сейчас" },
  { icon: "🧭", label: "разобрать", hint: "лучше проговорить в чате" },
] as const;

export type ReactionIcon = (typeof NOTE_REACTIONS)[number]["icon"];

export const DEFAULT_REACTION: ReactionIcon = "❤️";
