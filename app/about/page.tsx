import type { Metadata } from "next";
import Link from "next/link";
import { chatAutostartFromNotesHref } from "@/lib/chat-routes";

export const metadata: Metadata = {
  title: "О проекте",
  description:
    "Nova — не таск-менеджер, а способ разгрузить голову и увидеть один понятный следующий шаг.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nova-moss)]">
        О Nova
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--nova-text)] sm:text-4xl">
        Nova — не ещё один планировщик, а спокойное пространство для мыслей
      </h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-[var(--nova-muted)] sm:text-base">
        <p>
          Когда в голове слишком много идей, задач и «надо бы», трудно понять, с чего начать. Nova
          не давит мотивацией — она помогает быстро зафиксировать мысль, увидеть повторяющиеся темы
          и выбрать один шаг, который можно сделать уже сегодня.
        </p>
        <p>
          Записывай мысль за 10 секунд, отмечай важное реакцией, смотри паттерны в галерее. Кнопка
          ✦ и чат помогают превратить заметки в идею или следующий шаг — без длинных списков и
          чувства вины.
        </p>
      </div>
      <Link
        href={chatAutostartFromNotesHref()}
        className="mt-10 inline-flex rounded-full bg-[var(--nova-accent)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--nova-accent-hover)]"
      >
        Получить идею сейчас
      </Link>
    </div>
  );
}
