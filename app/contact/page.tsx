import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
};

const channel =
  process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL ??
  "https://t.me/Nova_Muse_Official_Studio";

const bot =
  process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL ?? "https://t.me/your_nova_bot";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--nova-text)]">Контакты</h1>
      <p className="mt-4 text-sm leading-relaxed text-[var(--nova-muted)]">
        Раздел содержит ссылки на каналы продукта.
      </p>
      <ul className="mt-8 space-y-4">
        <li className="rounded-2xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-5 shadow-sm">
          <a
            href={channel}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--nova-accent)] hover:underline"
          >
            Telegram-канал
          </a>
          <p className="mt-1 text-xs text-[var(--nova-muted)]">Публикация новостей и обновлений.</p>
        </li>
        <li className="rounded-2xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-5 shadow-sm">
          <a
            href={bot}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--nova-accent)] hover:underline"
          >
            Telegram-бот
          </a>
          <p className="mt-1 text-xs text-[var(--nova-muted)]">Переход в чат и разделы заметок.</p>
        </li>
      </ul>
    </div>
  );
}
