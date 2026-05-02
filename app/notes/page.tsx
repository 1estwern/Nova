import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Заметки",
  description:
    "Раздел заметок с реакциями и тегами.",
};

const reactions = [
  { icon: "❤️", label: "важно", hint: "высокий приоритет" },
  { icon: "🔥", label: "в работе", hint: "текущая тема" },
  { icon: "🌱", label: "позже", hint: "отложенная тема" },
  { icon: "🧭", label: "уточнить", hint: "требуется разбор" },
];

const posts = [
  {
    id: 1,
    time: "сегодня, 11:24",
    text: "Хочу запустить студию, но снова тону в мелких задачах. Надо вернуть главный фокус недели.",
    tags: ["Фокус", "Работа", "Неделя"],
    top: "🧭",
  },
  {
    id: 2,
    time: "вчера, 22:03",
    text: "Вечером тексты получаются честнее. Похоже, мой лучший слот для стратегических заметок — после 21:00.",
    tags: ["Ритм", "Тексты", "Привычка"],
    top: "❤️",
  },
  {
    id: 3,
    time: "29 апр, 08:48",
    text: "Визуал уже сильный, а оффер на главной пока не такой точный. Нужно усилить продающую формулировку.",
    tags: ["Сайт", "Маркетинг", "Оффер"],
    top: "🔥",
  },
];

export default function NotesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Заметки"
        title="Лента заметок"
        subtitle="Записи сохраняются в хронологическом порядке. Реакции и теги используются
          для анализа тем и генерации идей."
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/ideas"
            className="rounded-full bg-gradient-to-br from-[var(--nova-accent)] to-[#4e8f42] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:to-[var(--nova-accent-hover)]"
          >
            Сгенерировать идеи из ленты
          </Link>
          <Link
            href="/gallery"
            className="rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)] px-6 py-2.5 text-sm font-medium text-[var(--nova-text)] transition hover:border-[var(--nova-accent)]/40"
          >
            Открыть галерею тем
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-5 shadow-[0_16px_42px_rgba(0,0,0,0.24)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--nova-text)]">Личный пост</p>
                  <p className="text-xs text-[var(--nova-placeholder)]">{post.time}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--nova-muted)]">
                  {post.text}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--nova-accent-soft)] px-3 py-1 text-xs text-[var(--nova-muted)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[var(--nova-border)] pt-4 text-xs">
                  {reactions.map((r) => (
                    <button
                      key={r.label}
                      type="button"
                      className={`rounded-full px-3 py-1.5 transition ${
                        r.icon === post.top
                          ? "bg-[var(--nova-accent)] text-white"
                          : "bg-[var(--nova-accent-soft)] text-[var(--nova-muted)] hover:text-[var(--nova-text)]"
                      }`}
                    >
                      {r.icon}
                    </button>
                  ))}
                  <span className="ml-auto text-[var(--nova-placeholder)]">Приоритет: {post.top}</span>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-surface)] p-6 shadow-[0_14px_36px_rgba(0,0,0,0.24)]">
            <h2 className="text-base font-semibold text-[var(--nova-forest)]">Как читать реакции</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--nova-muted)]">
              Реакции задают приоритет заметок. Эти значения учитываются в разделе идей.
            </p>
            <ul className="mt-6 space-y-4">
              {reactions.map((r) => (
                <li key={r.label} className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg" aria-hidden>
                    {r.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--nova-text)]">{r.label}</p>
                    <p className="text-xs text-[var(--nova-placeholder)]">{r.hint}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/ideas"
              className="mt-7 inline-flex rounded-full bg-[var(--nova-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--nova-accent-hover)]"
            >
              Запустить генерацию по реакциям
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
