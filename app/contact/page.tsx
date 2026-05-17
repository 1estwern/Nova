import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Telegram Nova: бот для заметок и канал с обновлениями — когда удобнее писать в мессенджере.",
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
        Nova в Telegram и на сайте
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[var(--nova-muted)]">
        Когда мысль горит — можно выгрузить её в боте. В канале — обновления и сценарии для
        креаторов, без лишнего шума.
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
            Обновления и разборы — без спама.
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
            Заметки и идеи в мессенджере — когда открывать сайт лень.
          </p>
        </li>
      </ul>
    </div>
  );
}
