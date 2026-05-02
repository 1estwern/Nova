import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О проекте",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--nova-text)]">О проекте Nova</h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-[var(--nova-muted)]">
        <p>
          Nova — веб-приложение для работы с текстовыми заметками и идеями.
        </p>
        <p>
          Пользователь пишет заметки, отмечает реакции и просматривает темы в галерее.
          Эти данные используются для формирования карточек идей.
        </p>
        <p>
          Основной цикл: запись - реакция - идея - возврат к заметкам.
        </p>
      </div>
    </div>
  );
}
