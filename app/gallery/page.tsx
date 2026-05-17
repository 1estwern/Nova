import type { Metadata } from "next";
import Link from "next/link";
import { GalleryPageContent } from "@/components/gallery/GalleryPageContent";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Галерея",
  description:
    "Повторяющиеся темы и паттерны в заметках — быстрее замечай, что действительно занимает твои мысли.",
};

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Галерея"
        title="Видно, о чём ты на самом деле"
        subtitle="Галерея показывает повторяющиеся темы и паттерны. Заметки складываются по первому #тегу — категорию можно переименовать."
      >
        <Link
          href="/notes"
          className="rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)] px-7 py-2.5 text-sm font-medium text-[var(--nova-text)] transition hover:border-[var(--nova-accent)]/45"
        >
          Записать мысль
        </Link>
      </PageHero>

      <GalleryPageContent />
    </div>
  );
}
