import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--nova-border)] bg-[var(--nova-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-12">
          <div className="max-w-sm">
            <p className="text-sm font-semibold text-[var(--nova-text)]">Nova Muse</p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--nova-muted)]">
              Сервис для заметок, просмотра тем и генерации идей.
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--nova-muted)]"
            aria-label="Нижнее меню"
          >
            <Link href="/notes" className="hover:text-[var(--nova-accent)]">
              Заметки
            </Link>
            <Link href="/gallery" className="hover:text-[var(--nova-accent)]">
              Галерея
            </Link>
            <Link href="/ideas" className="hover:text-[var(--nova-accent-hover)]">
              Идеи
            </Link>
            <Link href="/chat" className="hover:text-[var(--nova-accent)]">
              Чат
            </Link>
            <Link href="/about" className="hover:text-[var(--nova-accent)]">
              О проекте
            </Link>
            <Link href="/how-it-works" className="hover:text-[var(--nova-accent)]">
              Как это работает
            </Link>
            <Link href="/contact" className="hover:text-[var(--nova-accent)]">
              Контакты
            </Link>
          </nav>
        </div>
        <p className="mt-10 text-[11px] text-[var(--nova-placeholder)]">
          © {new Date().getFullYear()} Nova Muse
        </p>
      </div>
    </footer>
  );
}
