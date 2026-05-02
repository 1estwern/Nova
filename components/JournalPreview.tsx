import Link from "next/link";
import { ForestDecor } from "@/components/decorative/ForestDecor";

/** Статичное превью ленты записей — как в мобильном макете Figma. */
const demoEntries = [
  {
    id: "1",
    text: "Сегодня я чувствовал спокойствие и думал о том, чтобы начать рисовать.",
    date: "31 марта",
    hasMedia: true,
  },
  {
    id: "2",
    text: "Хочу чаще останавливаться и записывать, что на самом деле важно — не список дел.",
    date: "28 марта",
    hasMedia: false,
  },
];

/** Только блок «телефон» без секции и декора — для встраивания в другие страницы. */
export function JournalPhoneMock({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-[min(100%,380px)] ${className}`}>
      <div className="overflow-hidden rounded-[2rem] border border-[var(--nova-border)] bg-[var(--nova-surface)] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="mb-3 flex justify-start">
          <span className="rounded-full bg-[var(--nova-card)] px-3 py-2 text-xs font-medium text-[var(--nova-text)] shadow-sm ring-1 ring-[var(--nova-border)]">
            + Новая запись
          </span>
        </div>
        <div className="space-y-3">
          {demoEntries.map((e) => (
            <article
              key={e.id}
              className="overflow-hidden rounded-3xl bg-[var(--nova-card)] shadow-sm ring-1 ring-white/[0.06]"
            >
              {e.hasMedia && (
                <div
                  className="h-36 w-full bg-[var(--nova-placeholder)]/35"
                  aria-hidden
                />
              )}
              <div className="p-4">
                <p className="text-sm leading-relaxed text-[var(--nova-text)]">
                  {e.text}
                </p>
                <p className="mt-3 text-right text-xs text-[var(--nova-muted)]">
                  {e.date}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-4 rounded-3xl bg-[var(--nova-card)] p-4 pt-10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] ring-1 ring-white/[0.07]">
          <p className="text-center text-xs font-medium uppercase tracking-wide text-[var(--nova-muted)]">
            от Nova
          </p>
          <p className="mt-2 text-center text-sm font-semibold text-[var(--nova-text)]">
            Пример карточки идеи по текущей теме
          </p>
          <p className="mx-auto mt-2 max-w-[260px] text-center text-xs leading-relaxed text-[var(--nova-muted)]">
            Карточка показывает краткую формулировку и действие, которое можно проверить.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              className="rounded-full bg-[var(--nova-accent)] px-4 py-2 text-xs font-medium text-white"
            >
              Мне нравится
            </button>
            <button
              type="button"
              className="rounded-full bg-[var(--nova-bg)] px-4 py-2 text-xs font-medium text-[var(--nova-text)] ring-1 ring-[var(--nova-border)]"
            >
              Я подумаю
            </button>
            <button
              type="button"
              className="rounded-full bg-[var(--nova-bg)] px-4 py-2 text-xs font-medium text-[var(--nova-muted)] ring-1 ring-[var(--nova-border)]"
            >
              Другая идея
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-[var(--nova-muted)]">
            Nova
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-[var(--nova-muted)]">
        Раздел показывает общий вид записей и карточек.{" "}
        <Link
          href="/ideas"
          className="font-medium text-[var(--nova-accent)] underline-offset-4 hover:underline"
        >
          открыть раздел идей
        </Link>
      </p>
    </div>
  );
}

export function JournalPreview() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--nova-border)] bg-[var(--nova-canvas)]">
      <ForestDecor density="subtle" />
      <div className="relative z-[1] mx-auto max-w-lg px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-[var(--nova-text)]">
            Как будут выглядеть записи
          </h2>
          <span className="rounded-full bg-[var(--nova-accent-soft)] px-3 py-1 text-xs font-medium text-[var(--nova-accent)]">
            превью
          </span>
        </div>
        <p className="mb-6 text-sm leading-relaxed text-[var(--nova-muted)]">
          В приложении — лента карточек с текстом, датой и местом под обложку
          или иллюстрацию. На сайте позже появится такой же раздел с твоими
          заметками.
        </p>

        <JournalPhoneMock />
      </div>
    </section>
  );
}
