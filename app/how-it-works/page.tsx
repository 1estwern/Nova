import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Как это работает",
};

const steps = [
  {
    step: "1",
    title: "Создание заметки",
    text: "Пользователь добавляет текст, дату и при необходимости теги.",
  },
  {
    step: "2",
    title: "Выбор реакции",
    text: "Реакция фиксирует важность записи для последующей обработки.",
  },
  {
    step: "3",
    title: "Просмотр галереи",
    text: "Галерея показывает темы и периодичность заметок по датам.",
  },
  {
    step: "4",
    title: "Генерация идеи",
    text: "Система формирует карточку идеи на основе накопленных записей и реакций.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--nova-text)]">Общий процесс работы</h1>
      <ol className="mt-10 grid gap-5 md:grid-cols-2">
        {steps.map((s) => (
          <li key={s.step} className="rounded-2xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-5">
            <p className="text-xs font-semibold text-[var(--nova-accent)]">Шаг {s.step}</p>
            <h2 className="mt-2 text-base font-semibold text-[var(--nova-text)]">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--nova-muted)]">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
