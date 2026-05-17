import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Telegram Nova: бот для заметок и идей, канал с обновлениями. Быстрый вход без лишних форм.",
};

const channel =
  process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL ??
  "https://t.me/Nova_Muse_Official_Studio";

const bot =
  process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL ?? "https://t.me/your_nova_bot";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nova-moss)]">
        Связь
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--nova-text)]">
        Nova рядом — в Telegram и на сайте
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[var(--nova-muted)]">
        Не нужно ждать письма с поддержки. Заходи в бот, когда мысль горит, или в канал — чтобы
        не пропустить обновления и сценарии для креаторов.
      </p>
      <ul className="mt-8 space-y-4">
        <li className="rounded-2xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-5 shadow-sm">
          <a
            href={channel}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--nova-accent)] hover:underline"
          >
            Telegram-канал Nova
          </a>
          <p className="mt-1 text-xs text-[var(--nova-muted)]">
            Обновления, идеи для привычек и разборы — без спама.
          </p>
        </li>
        <li className="rounded-2xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-5 shadow-sm">
          <a
            href={bot}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--nova-accent)] hover:underline"
          >
            Бот Nova
          </a>
          <p className="mt-1 text-xs text-[var(--nova-muted)]">
            Заметки и идеи в привычном мессенджере — когда открывать сайт лень.
          </p>
        </li>
      </ul>
    </div>
  );
}
