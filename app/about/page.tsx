import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О проекте",
  description:
    "Nova помогает превратить заметки в ясность, привычки и следующий шаг — для тех, кто откладывает, теряет фокус или завален идеями.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nova-moss)]">
        О Nova
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--nova-text)]">
        Не ещё один планировщик. Партнёр для головы, которая перегружена.
      </h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-[var(--nova-muted)]">
        <p>
          Nova создана для людей с прокрастинацией, СДВГ и для креаторов, у которых в голове больше
          идей, чем опубликованных постов. Ты выгружаешь мысли в заметки — мы помогаем увидеть,
          что важно, и предложить один следующий шаг: идею, привычку или действие.
        </p>
        <p>
          Мы не продаём «мотивацию». Мы снимаем трение: короткая запись, реакция, галерея тем,
          карточка идеи ✦ и чат, когда нужно разобрать мысль без осуждения.
        </p>
        <p>
          <span className="font-semibold text-[var(--nova-forest)]">Цикл:</span> заметка → реакция
          → паттерн в галерее → идея или разговор в чате → возврат к записям. Без бесконечных
          списков и чувства вины.
        </p>
      </div>
      <Link
        href="/ideas"
        className="mt-10 inline-flex rounded-full bg-[var(--nova-accent)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--nova-accent-hover)]"
      >
        Попробовать идею сейчас
      </Link>
    </div>
  );
}
