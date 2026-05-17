import type { Metadata } from "next";
import Link from "next/link";
import { NotesPageContent } from "@/components/notes/NotesPageContent";
import { PageHero } from "@/components/marketing/PageHero";
import { chatAutostartFromNotesHref } from "@/lib/chat-routes";

export const metadata: Metadata = {
  title: "Заметки",
  description:
    "Записывай мысль за 10 секунд, отмечай важное — Nova поможет выбрать один следующий шаг без перегруза.",
};

export default function NotesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Заметки"
        title="Записывай мысль сразу — без подготовки"
        subtitle="Одна фраза в ленту, реакция на важное. Всё сохраняется в одном месте — Nova соберёт из этого подсказку, а не очередной список задач."
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={chatAutostartFromNotesHref()}
            className="rounded-full bg-gradient-to-br from-[var(--nova-accent)] to-[#4e8f42] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:to-[var(--nova-accent-hover)]"
          >
            Получить идею сейчас
          </Link>
          <Link
            href="/gallery"
            className="rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)] px-6 py-2.5 text-sm font-medium text-[var(--nova-text)] transition hover:border-[var(--nova-accent)]/40"
          >
            Открыть темы
          </Link>
        </div>
      </PageHero>

      <NotesPageContent />
    </div>
  );
}
