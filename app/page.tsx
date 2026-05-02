import Link from "next/link";
import { ForestDecor } from "@/components/decorative/ForestDecor";

const highlights = [
  {
    title: "Генерация идей",
    text: "Раздел показывает идеи, собранные из заметок и реакций.",
    href: "/ideas",
  },
  {
    title: "Лента заметок",
    text: "Здесь сохраняются записи, теги и реакции в хронологическом порядке.",
    href: "/notes",
  },
  {
    title: "Галерея тем",
    text: "Галерея группирует заметки по датам и темам для быстрого просмотра.",
    href: "/gallery",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--nova-border)] bg-[var(--nova-bg)]">
        <ForestDecor density="hero" />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 94% 52% at 50% -8%, rgb(255 226 176 / 0.16), transparent 52%), radial-gradient(ellipse 70% 42% at 100% 18%, rgb(84 118 74 / 0.2), transparent 46%), radial-gradient(ellipse 70% 42% at 0% 25%, rgb(72 106 62 / 0.2), transparent 46%)",
          }}
        />
        <div className="relative z-[2] mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--nova-moss)]">
            Nova
          </p>
          <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[var(--nova-forest)] sm:text-4xl md:text-5xl">
            Продукт для заметок, галереи и генерации идей.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--nova-muted)] sm:text-lg">
            Пользователь добавляет записи, отмечает реакции и получает предложения на основе
            сохраненного контекста.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/ideas"
              className="rounded-full bg-gradient-to-br from-[var(--nova-accent)] to-[#4e8f42] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 hover:to-[var(--nova-accent-hover)]"
            >
              Запустить генерацию идей
            </Link>
            <Link
              href="/notes"
              className="rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)] px-8 py-3 text-sm font-semibold text-[var(--nova-text)] hover:border-[var(--nova-accent)]/40"
            >
              Перейти в ленту заметок
            </Link>
          </div>
          <p className="mt-6 max-w-xl text-sm text-[var(--nova-placeholder)]">
            Кнопка «✦» открывает карточку идеи и показывает анимацию при нажатии.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <h2 className="text-2xl font-semibold text-[var(--nova-text)]">Что уже доступно</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <li
              key={item.title}
              className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-6 shadow-[0_14px_34px_rgba(0,0,0,0.22)]"
            >
              <h3 className="text-base font-semibold text-[var(--nova-forest)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--nova-muted)]">{item.text}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--nova-accent)] hover:text-[var(--nova-accent-hover)]"
              >
                Открыть
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--nova-border)] bg-[var(--nova-surface)] py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-8 shadow-[0_16px_42px_rgba(0,0,0,0.24)] md:p-10">
            <h2 className="text-xl font-semibold text-[var(--nova-forest)] md:text-2xl">
              Как формируется идея
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--nova-muted)]">
              Реакции и повторяющиеся темы в заметках участвуют в выборе следующей идеи.
              Пользователь может сменить вариант и перейти к исходным записям.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/notes" className="rounded-full bg-[var(--nova-accent-soft)] px-5 py-2.5 text-sm font-semibold text-[var(--nova-accent-hover)] ring-1 ring-[var(--nova-accent)]/30">
                Настроить реакции
              </Link>
              <Link href="/gallery" className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--nova-muted)] ring-1 ring-[var(--nova-border)] hover:text-[var(--nova-text)]">
                Смотреть галерею
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
