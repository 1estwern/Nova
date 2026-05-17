"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function TabLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const active = path === href || (href !== "/" && path.startsWith(href));

  return (
    <Link
      href={href}
      className={[
        "shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition sm:px-4",
        active
          ? "bg-[var(--nova-accent-soft)] text-[var(--nova-forest)] ring-1 ring-[var(--nova-accent)]/50"
          : "text-[var(--nova-muted)] hover:bg-[var(--nova-accent-soft)]/50 hover:text-[var(--nova-text)]",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export function SellingTabNav() {
  const path = usePathname();
  const ideasActive = path === "/ideas" || path.startsWith("/ideas/");

  return (
    <div className="border-t border-[var(--nova-border)]/80 bg-[var(--nova-surface)]/70 backdrop-blur-md">
      <nav
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-3 px-3 py-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-4 sm:px-6"
        aria-label="Разделы продукта"
      >
        <div className="flex justify-center gap-1 sm:justify-start sm:gap-2">
          <TabLink href="/notes">Заметки</TabLink>
          <TabLink href="/gallery">Галерея</TabLink>
        </div>

        <Link
          href="/ideas"
          className={[
            "flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold shadow-lg transition sm:mx-auto sm:w-auto sm:px-8 sm:py-2.5 sm:text-[0.9375rem]",
            ideasActive
              ? "bg-[var(--nova-accent)] text-white shadow-[var(--nova-accent)]/35 ring-2 ring-[rgb(255_232_185/0.35)]"
              : "bg-gradient-to-br from-[var(--nova-accent)] to-[#4e8f42] text-white shadow-black/30 hover:to-[var(--nova-accent-hover)]",
          ].join(" ")}
        >
          <span aria-hidden className="opacity-90">
            ✦
          </span>
          Идея дня
          <span aria-hidden className="opacity-90">
            ✦
          </span>
        </Link>

        <div className="flex justify-center sm:justify-end">
          <TabLink href="/chat">Чат</TabLink>
        </div>
      </nav>
    </div>
  );
}
