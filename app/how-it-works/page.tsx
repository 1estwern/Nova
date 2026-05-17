import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Как это работает",
  description:
    "Заметка → реакция → паттерн → один шаг. Цикл Nova для прокрастинации, СДВГ и креаторов.",
};

const steps = [
  {
    step: "1",
    title: "Выгрузи мысль в заметку",
    text: "Без структуры и без «идеального» текста — одна фраза, пока не забылась.",
  },
  {
    step: "2",
    title: "Отметь реакцией",
    text: "❤️ важно · 🔥 в работе · 🌱 позже · 🧭 разобрать — так Nova понимает приоритет.",
  },
  {
    step: "3",
    title: "Посмотри галерею",
    text: "Повторяющиеся темы по дням — видно, куда реально уходит внимание.",
  },
  {
    step: "4",
    title: "Сделай один шаг",
    text: "Идея из ✦ или разговор в чате — не список на неделю, а действие на сегодня.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nova-moss)]">
        Процесс
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--nova-text)]">
        Четыре шага — и ты снова в движении
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--nova-muted)]">
        Nova не требует идеальной дисциплины. Достаточно коротких записей и честных реакций —
        остальное система соберёт в подсказку.
      </p>
      <ol className="mt-10 grid gap-5 md:grid-cols-2">
        {steps.map((s) => (
          <li key={s.step} className="rounded-2xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-5">
            <p className="text-xs font-semibold text-[var(--nova-accent)]">Шаг {s.step}</p>
            <h2 className="mt-2 text-base font-semibold text-[var(--nova-text)]">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--nova-muted)]">{s.text}</p>
          </li>
        ))}
      </ol>
      <Link
        href="/notes"
        className="mt-10 inline-flex rounded-full bg-[var(--nova-accent)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--nova-accent-hover)]"
      >
        Начать с одной заметки
      </Link>
    </div>
  );
}
