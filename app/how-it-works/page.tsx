import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Как это работает",
  description:
    "Четыре шага: выгрузить мысль, отметить важное, увидеть паттерн, сделать один шаг — каждый день.",
};

const steps = [
  {
    step: "1",
    title: "Выгрузи мысль",
    text: "Просто запиши одну фразу — без структуры и без попытки сразу всё сформулировать идеально.",
  },
  {
    step: "2",
    title: "Отметь важное",
    text: "Реакция помогает понять, что сейчас действительно цепляет, а что можно отложить.",
  },
  {
    step: "3",
    title: "Увидь паттерн",
    text: "Лента и галерея показывают повторяющиеся темы и мысли, к которым ты возвращаешься.",
  },
  {
    step: "4",
    title: "Сделай шаг",
    text: "Получи идею или открой чат, чтобы выбрать следующее действие без перегруза.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nova-moss)]">
        Процесс
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--nova-text)]">
        Как это работает
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--nova-muted)]">
        Четыре простых шага, которые можно повторять каждый день. Не нужна идеальная дисциплина —
        достаточно коротких записей и честных реакций.
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
        Выгрузить мысль в заметку
      </Link>
    </div>
  );
}
