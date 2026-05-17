import type { Metadata } from "next";
import Link from "next/link";
import { GalleryPageContent } from "@/components/gallery/GalleryPageContent";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Галерея",
  description:
    "Повторяющиеся темы по дням — увидь, о чём ты думаешь на самом деле, и не теряй идеи в шуме.",
};

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Галерея"
        title="Твои темы — не хаос в голове"
        subtitle="Заметки складываются по категориям — по первому #тегу. Переименуй категорию,
          если хочешь по-своему."
      >
        <Link
          href="/notes"
          className="rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)] px-7 py-2.5 text-sm font-medium text-[var(--nova-text)] transition hover:border-[var(--nova-accent)]/45"
        >
          Добавить заметку в ленту
        </Link>
      </PageHero>

      <GalleryPageContent />
    </div>
  );
}
