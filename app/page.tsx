import type { ReactNode } from "react";
import Link from "next/link";
import { ForestDecor } from "@/components/decorative/ForestDecor";
import { chatAutostartFromNotesHref } from "@/lib/chat-routes";

const highlights = [
  {
    icon: "✦",
    title: "Идея вместо перегруза",
    text: "Nova анализирует твои заметки и реакции и помогает выбрать один следующий шаг вместо десятков разрозненных задач.",
    href: chatAutostartFromNotesHref(),
    cta: "Получить идею",
    featured: true,
  },
  {
    icon: "📝",
    title: "Заметки без трения",
    text: "Записывай мысль сразу, отмечай реакцией и не теряй её среди бесконечных черновиков.",
    href: "/notes",
    cta: "Записать мысль",
    featured: false,
  },
  {
    icon: "◈",
    title: "Видно, о чём ты на самом деле",
    text: "Галерея показывает повторяющиеся темы и паттерны — быстрее замечаешь, что занимает мысли.",
    href: "/gallery",
    cta: "Открыть темы",
    featured: false,
  },
];

const audience = [
  {
    tag: "Старт",
    title: "Прокрастинация",
    text: "Когда задач много, а начать сложно — один реальный шаг на сегодня вместо шума.",
  },
  {
    tag: "Фокус",
    title: "СДВГ и расфокус",
    text: "Короткие записи и мягкие подсказки — не терять нить и быстрее возвращаться к делу.",
  },
  {
    tag: "Контент",
    title: "Контент-креаторы",
    text: "Темы, углы и форматы прямо из заметок, когда идей больше, чем готовых постов.",
  },
];

const steps = [
  {
    n: "1",
    title: "Выгрузи мысль",
    text: "Одна фраза — без структуры и без идеального текста.",
  },
  {
    n: "2",
    title: "Отметь важное",
    text: "Реакция показывает, что цепляет сейчас, а что отложить.",
  },
  {
    n: "3",
    title: "Увидь паттерн",
    text: "Лента и галерея — повторяющиеся темы и мысли.",
  },
  {
    n: "4",
    title: "Сделай шаг",
    text: "Идея из ✦ или чат — следующее действие без перегруза.",
  },
];

const proof = [
  "Листала референсы вместо монтажа — Nova помогла выбрать одну тему на неделю, а не утонуть в новых идеях.",
  "Поймала, что лучше думаю вечером — перенесла сценарии на это время и наконец села писать.",
  "Идея из ✦ дала один маленький шаг, а не очередное обещание всё изменить с понедельника.",
];

const faq = [
  {
    q: "Это ещё один таск-менеджер?",
    a: "Нет. Nova не заменяет проектные сервисы. Она помогает разгрузить голову и выбрать один следующий шаг.",
  },
  {
    q: "У меня нет дисциплины — смысл?",
    a: "Именно поэтому минимальное трение: короткая запись, простая реакция, понятная подсказка.",
  },
  {
    q: "Идеи будут «из воздуха»?",
    a: "Нет. Подсказки опираются на записи, реакции и темы — не на случайные советы.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--nova-moss)]">
      {children}
    </p>
  );
}

function HighlightIcon({ icon, large }: { icon: string; large?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-[rgb(124_188_106/0.14)] ring-1 ring-[rgb(124_188_106/0.28)] ${
        large ? "h-14 w-14 text-2xl" : "h-11 w-11 text-lg"
      }`}
      aria-hidden
    >
      {icon}
    </span>
  );
}

export default function HomePage() {
  const ideaHref = chatAutostartFromNotesHref();

  return (
    <div>
      {/* —— Hero: фокус на заголовке и CTA —— */}
      <section className="relative overflow-hidden border-b border-[var(--nova-border)] bg-[var(--nova-bg)]">
        <ForestDecor density="hero" />
        <div className="pointer-events-none absolute inset-0 z-[1] nova-hero-spotlight" aria-hidden />
        <div className="relative z-[2] mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 md:pb-28 md:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(124_188_106/0.35)] bg-[rgb(124_188_106/0.1)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--nova-moss)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--nova-accent)]" aria-hidden />
            Прокрастинация · СДВГ · креаторы
          </span>

          <h1 className="mt-8 max-w-3xl text-[2rem] font-semibold leading-[1.08] tracking-tight text-[var(--nova-forest)] sm:max-w-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl lg:leading-[1.06]">
            Nova помогает превратить хаос мыслей в{" "}
            <span className="bg-gradient-to-r from-[#ffe8b8] via-[var(--nova-accent)] to-[#91cc80] bg-clip-text text-transparent">
              один понятный следующий шаг
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--nova-muted)] sm:text-lg">
            Записывай мысль за 10 секунд, отмечай важное и получай короткую подсказку — без
            перегруза, длинных списков и чувства вины.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={ideaHref}
              className="nova-cta-primary inline-flex items-center justify-center rounded-full px-9 py-4 text-base font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Получить идею сейчас
            </Link>
            <Link
              href="/notes"
              className="inline-flex items-center justify-center rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)]/80 px-7 py-3.5 text-sm font-semibold text-[var(--nova-text)] backdrop-blur-sm transition hover:border-[var(--nova-accent)]/50 hover:bg-[var(--nova-card)]"
            >
              Выгрузить мысль в заметку
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2 text-xs text-[var(--nova-placeholder)]">
            {["10 сек на запись", "❤️ 🔥 🌱 🧭", "один шаг из ✦"].map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-[var(--nova-border)]/80 bg-[var(--nova-surface)]/60 px-3 py-1.5"
              >
                {chip}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-2xl border-t border-[var(--nova-border)]/60 pt-6 text-sm leading-relaxed text-[var(--nova-placeholder)]">
            <span className="font-medium text-[var(--nova-muted)]">✦</span> — идея из заметок.{" "}
            <span className="font-medium text-[var(--nova-muted)]">Чат</span> — когда нужно
            проговорить мысль и спокойно собрать смысл.
          </p>
        </div>
      </section>

      {/* —— Компактный эмпатичный блок —— */}
      <section className="border-b border-[var(--nova-border)] bg-[var(--nova-surface)] py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--nova-muted)] md:text-[0.95rem]">
            <span className="mr-1.5 inline-block rounded-md bg-[rgb(255_232_185/0.12)] px-2 py-0.5 text-xs font-semibold text-[#e8d4a8]">
              Знакомо?
            </span>
            Когда в голове слишком много идей, задач и «надо бы», трудно понять, с чего начать.
            Nova не давит мотивацией — помогает увидеть, что важно именно сейчас.
          </p>
        </div>
      </section>

      {/* —— Преимущества: плотный блок, сильная иерархия —— */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <SectionLabel>Результат</SectionLabel>
        <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-[var(--nova-text)] md:text-3xl">
          Не набор функций —{" "}
          <span className="text-[var(--nova-accent)]">понятный результат</span>
        </h2>
        <p className="mt-3 max-w-lg text-sm text-[var(--nova-muted)]">
          Меньше шума. Больше ясности. Один шаг, который можно сделать уже сегодня.
        </p>

        <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {highlights.map((item) => (
            <li
              key={item.title}
              className={`group relative flex flex-col overflow-hidden rounded-[1.35rem] border transition duration-300 hover:border-[var(--nova-accent)]/40 ${
                item.featured
                  ? "border-[rgb(124_188_106/0.45)] bg-gradient-to-b from-[rgb(124_188_106/0.12)] to-[var(--nova-card)] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.32)] md:-mt-2 md:pb-8 md:pt-8"
                  : "border-[var(--nova-border)] bg-[var(--nova-card)] p-6 shadow-[0_10px_28px_rgba(0,0,0,0.2)]"
              }`}
            >
              {item.featured ? (
                <span className="absolute right-4 top-4 rounded-full bg-[var(--nova-accent)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1a2618]">
                  Главное
                </span>
              ) : null}
              <HighlightIcon icon={item.icon} large={item.featured} />
              <h3
                className={`mt-5 font-semibold text-[var(--nova-forest)] ${
                  item.featured ? "text-lg" : "text-base"
                }`}
              >
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--nova-muted)]">
                {item.text}
              </p>
              <Link
                href={item.href}
                className={`mt-6 inline-flex items-center gap-1.5 border-t border-[var(--nova-border)]/70 pt-5 font-semibold transition group-hover:gap-2.5 ${
                  item.featured
                    ? "text-base text-[var(--nova-accent)]"
                    : "text-sm text-[var(--nova-accent)]"
                }`}
              >
                {item.cta}
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* —— Аудитория: воздушнее, без тяжёлых карточек —— */}
      <section className="border-y border-[var(--nova-border)] bg-[var(--nova-surface)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>Для кого</SectionLabel>
          <h2 className="mt-3 text-xl font-semibold text-[var(--nova-text)] md:text-2xl">
            Nova особенно полезна, если мысли мешают начать
          </h2>
          <ul className="mt-10 divide-y divide-[var(--nova-border)] md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
            {audience.map((a) => (
              <li key={a.title} className="py-6 md:px-6 md:py-0 md:first:pl-0 md:last:pr-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--nova-accent)]">
                  {a.tag}
                </span>
                <h3 className="mt-2 text-base font-semibold text-[var(--nova-forest)]">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--nova-muted)]">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* —— Как работает: компактная сетка —— */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Процесс</SectionLabel>
            <h2 className="mt-2 text-xl font-semibold text-[var(--nova-text)]">Как это работает</h2>
          </div>
          <Link
            href="/how-it-works"
            className="text-sm font-semibold text-[var(--nova-accent)] hover:text-[var(--nova-accent-hover)]"
          >
            Подробнее →
          </Link>
        </div>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex gap-4 rounded-2xl border border-[var(--nova-border)]/80 bg-[var(--nova-card)]/50 px-4 py-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--nova-accent-soft)] text-sm font-bold text-[var(--nova-accent)] ring-1 ring-[var(--nova-accent)]/25">
                {s.n}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-[var(--nova-forest)]">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--nova-muted)]">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* —— Социальное доказательство: лёгкие цитаты —— */}
      <section className="border-t border-[var(--nova-border)] bg-[var(--nova-surface)] py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>Из жизни</SectionLabel>
          <h2 className="mt-2 text-xl font-semibold text-[var(--nova-text)]">
            Как это выглядит в реальной жизни
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {proof.map((quote) => (
              <li key={quote} className="relative pl-5">
                <span
                  className="absolute left-0 top-0 text-3xl leading-none text-[var(--nova-accent)]/50"
                  aria-hidden
                >
                  “
                </span>
                <p className="text-sm leading-relaxed text-[var(--nova-text)]">{quote}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* —— FAQ: без повторяющихся «коробок» —— */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <SectionLabel>Вопросы</SectionLabel>
        <h2 className="mt-2 text-xl font-semibold text-[var(--nova-text)]">
          Частые вопросы и сомнения
        </h2>
        <ul className="mt-8 divide-y divide-[var(--nova-border)]">
          {faq.map((item) => (
            <li key={item.q} className="py-5 first:pt-0">
              <h3 className="text-sm font-semibold text-[var(--nova-forest)]">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--nova-muted)]">{item.a}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* —— Финальный CTA —— */}
      <section className="nova-final-cta-band border-t border-[var(--nova-border)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[rgb(124_188_106/0.35)] bg-[var(--nova-card)] px-6 py-10 text-center shadow-[0_24px_64px_rgba(0,0,0,0.38)] md:px-14 md:py-14">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[rgb(124_188_106/0.15)] blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[rgb(255_232_185/0.08)] blur-3xl"
              aria-hidden
            />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--nova-moss)]">
              Начни сейчас
            </p>
            <h2 className="relative mx-auto mt-4 max-w-xl text-2xl font-semibold leading-snug text-[var(--nova-forest)] md:text-3xl">
              Не жди идеального дня —{" "}
              <span className="text-[var(--nova-accent)]">начни с одной заметки</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--nova-muted)]">
              Отметь важное, увидь повторяющиеся темы и получи следующий шаг без лишнего шума.
            </p>
            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={ideaHref}
                className="nova-cta-primary inline-flex w-full items-center justify-center rounded-full px-10 py-4 text-base font-semibold text-white sm:w-auto"
              >
                Получить идею сейчас
              </Link>
              <Link
                href="/chat"
                className="inline-flex w-full items-center justify-center rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)] px-8 py-3.5 text-sm font-semibold text-[var(--nova-text)] transition hover:border-[var(--nova-accent)]/45 sm:w-auto"
              >
                Разобрать мысль в чате
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
