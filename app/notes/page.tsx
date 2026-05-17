import type { Metadata } from "next";
import Link from "next/link";
import { NotesPageContent } from "@/components/notes/NotesPageContent";
import { PageHero } from "@/components/marketing/PageHero";
import { chatAutostartFromNotesHref } from "@/lib/chat-routes";

export const metadata: Metadata = {
  title: "Заметки",
  description:
    "Выгрузи мысль за 10 секунд. Реакции покажут приоритет — Nova превратит ленту в идеи и шаги.",
};

export default function NotesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Заметки"
        title="Сбрось мысль — не держи в голове"
        subtitle="Одна фраза в ленту. Реакция покажет, что горит. Nova соберёт из этого идею
          или следующий шаг — без бесконечного планирования."
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={chatAutostartFromNotesHref()}
            className="rounded-full bg-gradient-to-br from-[var(--nova-accent)] to-[#4e8f42] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:to-[var(--nova-accent-hover)]"
          >
            Получить идею из ленты
          </Link>
          <Link
            href="/gallery"
            className="rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)] px-6 py-2.5 text-sm font-medium text-[var(--nova-text)] transition hover:border-[var(--nova-accent)]/40"
          >
            Увидеть повторяющиеся темы
          </Link>
        </div>
      </PageHero>

      <NotesPageContent />
    </div>
  );
}
