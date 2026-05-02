import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Галерея",
  description:
    "Раздел с темами, сгруппированными по датам.",
};

const timeline = [
  {
    date: "2 мая",
    theme: "Запуск и продажи",
    cards: ["Оффер", "Лендинг", "CTA", "Первая воронка"],
  },
  {
    date: "1 мая",
    theme: "Контент и личный бренд",
    cards: ["Тон бренда", "Форматы постов", "Референсы", "Сторителлинг"],
  },
  {
    date: "28 апреля",
    theme: "Продукт и опыт",
    cards: ["Флоу записи", "Реакции", "Приоритеты", "Идея дня"],
  },
];

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Галерея"
        title="Галерея тем"
        subtitle="Элементы сгруппированы по датам и направлениям. Это помогает быстро
          просматривать историю заметок."
      >
        <Link
          href="/notes"
          className="rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)] px-7 py-2.5 text-sm font-medium text-[var(--nova-text)] transition hover:border-[var(--nova-accent)]/45"
        >
          Вернуться к постам
        </Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
        <div className="space-y-10">
          {timeline.map((block) => (
            <section key={block.date + block.theme}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-[var(--nova-text)]">{block.date}</h2>
                <span className="rounded-full bg-[var(--nova-accent-soft)] px-3 py-1 text-xs font-medium text-[var(--nova-accent-hover)]">
                  {block.theme}
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {block.cards.map((card) => (
                  <li key={card}>
                    <div className="group relative aspect-square overflow-hidden rounded-[1.4rem] border border-[var(--nova-border)] bg-gradient-to-br from-[#1f3d28] via-[#2d5a32] to-[#3d6e40] p-3 shadow-[0_12px_34px_rgba(0,0,0,0.28)]">
                      <div
                        className="pointer-events-none absolute inset-0 opacity-70"
                        style={{
                          background:
                            "radial-gradient(ellipse 80% 50% at 50% -20%, rgb(255 232 185 / 0.22), transparent 56%)",
                        }}
                      />
                      <p className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/30 px-2 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                        {card}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/ideas"
            className="rounded-full bg-[var(--nova-accent)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--nova-accent-hover)]"
          >
            Открыть идеи
          </Link>
          <Link
            href="/chat"
            className="rounded-full border border-[var(--nova-border)] px-6 py-2.5 text-sm font-semibold text-[var(--nova-text)]"
          >
            Обсудить в чате
          </Link>
        </div>
      </section>
    </div>
  );
}
