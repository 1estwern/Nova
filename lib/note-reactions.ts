export const NOTE_REACTIONS = [
  { icon: "❤️", label: "важно", hint: "сделать в приоритете — идеи будут опираться на это" },
  { icon: "🔥", label: "в работе", hint: "тема активна сейчас" },
  { icon: "🌱", label: "позже", hint: "не забыть, но не сегодня" },
  { icon: "🧭", label: "разобрать", hint: "нужен чат или уточнение" },
] as const;

export type ReactionIcon = (typeof NOTE_REACTIONS)[number]["icon"];

export const DEFAULT_REACTION: ReactionIcon = "❤️";
