import type { Metadata } from "next";
import Link from "next/link";
import { ForestDecor } from "@/components/decorative/ForestDecor";
import { chatAutostartFromNotesHref } from "@/lib/chat-routes";

export const metadata: Metadata = {
  title: "Идеи",
  description:
    "Nova анализирует заметки и реакции и помогает выбрать один следующий шаг — не десятки разрозненных задач.",
};

const steps = [
  {
    n: "01",
    t: "Смотрим твои записи",
    d: "Текст, теги и повторяющиеся темы — не случайные советы из интернета.",
  },
  {
    n: "02",
    t: "Учитываем реакции",
    d: "❤️ 🔥 🌱 🧭 показывают, что важно сейчас, что отложить, что разобрать в чате.",
  },
  {
    n: "03",
    t: "Даём один шаг",
    d: "Карточка из ✦ или разговор в чате — не список на неделю, а действие, которое можно сделать сегодня.",
  },
];

export default function IdeasPage() {
  const ideaHref = chatAutostartFromNotesHref();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--nova-border)] bg-[var(--nova-bg)]">
        <ForestDecor density="hero" />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 95% 60% at 50% -10%, rgb(255 226 176 / 0.2), transparent 50%), radial-gradient(ellipse 50% 50% at 100% 30%, rgb(124 188 106 / 0.12), transparent 45%), radial-gradient(ellipse 55% 50% at 0% 40%, rgb(72 106 62 / 0.2), transparent 45%)",
          }}
        />
        <div className="relative z-[2] mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--nova-moss)]">
            Идеи
          </p>
          <h1 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-[var(--nova-forest)] sm:text-4xl md:text-5xl">
            Один следующий шаг вместо перегруза
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--nova-muted)] sm:text-lg">
            Nova анализирует твои заметки и реакции и помогает выбрать один шаг вместо десятков
            разрозненных задач.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={ideaHref}
              className="rounded-full bg-gradient-to-br from-[var(--nova-accent)] to-[#4e8f42] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-black/25"
            >
              Получить идею сейчас
            </Link>
            <Link
              href="/chat"
              className="rounded-full border border-[var(--nova-border)] px-8 py-3 text-sm font-semibold text-[var(--nova-text)] hover:border-[var(--nova-accent)]/40"
            >
              Разобрать мысль в чате
            </Link>
          </div>
          <p className="mt-6 text-sm text-[var(--nova-placeholder)]">
            Или нажми ✦ в углу — кнопка быстро превратит заметки в идею или следующий шаг.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-6">
              <p className="text-2xl font-bold text-[var(--nova-accent)]">{s.n}</p>
              <h2 className="mt-3 text-base font-semibold text-[var(--nova-forest)]">{s.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--nova-muted)]">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
