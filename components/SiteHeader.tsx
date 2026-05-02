import Link from "next/link";

const telegramBot =
  process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL ?? "https://t.me/your_nova_bot";

type NavItem = {
  href: string;
  label: string;
};

const menu: NavItem[] = [
  { href: "/", label: "Главная" },
  { href: "/ideas", label: "Идеи" },
  { href: "/notes", label: "Заметки" },
  { href: "/gallery", label: "Галерея" },
  { href: "/chat", label: "Чат" },
  { href: "/about", label: "О проекте" },
  { href: "/contact", label: "Контакты" },
];

function mobileChipClass(item: NavItem): string {
  const base =
    "whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-colors";
  return `${base} bg-[var(--nova-accent-soft)] text-[var(--nova-muted)]`;
}

function sidebarLinkClass(item: NavItem): string {
  const base =
    "group/item flex items-center justify-center gap-0 rounded-2xl px-2.5 py-2.5 transition-all duration-200 hover:bg-[rgb(124_188_106/0.14)] group-hover/rail:justify-start group-hover/rail:gap-3";
  return `${base} text-[var(--nova-muted)] hover:text-[var(--nova-forest)]`;
}

export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--nova-border)] bg-[var(--nova-surface)]/95 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-[var(--nova-forest)]">
            Nova Muse
          </Link>
          <Link
            href="/ideas"
            className="rounded-full bg-[var(--nova-accent)] px-3 py-1.5 text-xs font-semibold text-white"
          >
            Разделы
          </Link>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 text-xs">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={mobileChipClass(item)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div
        aria-hidden
        className="peer/edge fixed left-0 top-0 z-30 hidden h-screen w-2 md:w-10 md:block"
      />
      <aside className="group/rail fixed left-0 top-0 z-40 hidden h-screen w-16 overflow-hidden border-r border-[rgb(255_255_255/0.06)] bg-gradient-to-b from-[rgb(26_35_26/0.82)] to-[rgb(18_25_19/0.8)] p-2.5 shadow-[0_12px_42px_rgba(0,0,0,0.22)] backdrop-blur-md transition-[width,background-color,box-shadow] duration-300 hover:w-56 hover:bg-[var(--nova-surface)]/95 hover:shadow-[0_16px_52px_rgba(0,0,0,0.3)] focus-within:w-56 peer-hover/edge:w-56 peer-hover/edge:bg-[var(--nova-surface)]/95 md:flex md:flex-col">
        <Link
          href="/"
          className="mb-5 flex h-11 w-full items-center justify-center rounded-xl px-2 group-hover/rail:justify-start"
          aria-label="Nova Muse"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[rgb(124_188_106/0.18)] text-xs font-semibold text-[var(--nova-forest)]">
            N
          </span>
          <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold tracking-tight text-[var(--nova-forest)] opacity-0 transition-all duration-200 group-hover/rail:ml-3 group-hover/rail:max-w-[160px] group-hover/rail:opacity-100 group-focus-within/rail:ml-3 group-focus-within/rail:max-w-[160px] group-focus-within/rail:opacity-100">
            Nova Muse
          </span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1.5 text-sm">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={sidebarLinkClass(item)}
            >
              <span
                aria-hidden
                className="inline-flex h-14 w-14 shrink-0 items-center justify-center text-3xl leading-none text-[var(--nova-muted)]/85 transition-colors group-hover/item:text-[var(--nova-accent)]"
              >
                ✦
              </span>
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover/rail:max-w-[140px] group-hover/rail:opacity-100 group-focus-within/rail:max-w-[140px] group-focus-within/rail:opacity-100">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <a
          href={telegramBot}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex h-9 items-center justify-center rounded-lg border border-[var(--nova-border)] text-xs text-[var(--nova-placeholder)] opacity-0 transition duration-200 hover:border-[var(--nova-accent)]/35 hover:text-[var(--nova-text)] group-hover/rail:opacity-100 group-focus-within/rail:opacity-100"
        >
          Telegram-канал
        </a>
      </aside>
    </>
  );
}
