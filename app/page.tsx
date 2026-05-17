import Link from "next/link";
import { ForestDecor } from "@/components/decorative/ForestDecor";

const highlights = [
  {
    title: "Идея вместо перегруза",
    text: "Nova смотрит на твои заметки и реакции и предлагает один следующий шаг — не ещё один список на 40 пунктов.",
    href: "/ideas",
    cta: "Получить идею",
  },
  {
    title: "Заметки без трения",
    text: "Сбросил мысль в ленту, отметил ❤️ или 🔥 — и не потерял её в голове. Всё в одном месте, без «надо бы оформить».",
    href: "/notes",
    cta: "Записать мысль",
  },
  {
    title: "Видно, о чём ты на самом деле",
    text: "Галерея собирает повторяющиеся темы по дням — удобно, когда в потоке идей сложно увидеть главное.",
    href: "/gallery",
    cta: "Открыть темы",
  },
];

const audience = [
  {
    title: "Прокрастинация",
    text: "Когда задачи копятся, а начать страшно. Nova режет шум до одного шага, который реально сделать сегодня.",
  },
  {
    title: "СДВГ и расфокус",
    text: "Когда мыслей много, а удержать фокус тяжело. Короткие записи, реакции и подсказки без длинных инструкций.",
  },
  {
    title: "Контент-креаторы",
    text: "Когда идей больше, чем опубликованного. Из заметок — темы, форматы и углы, которые уже звучат в твоих словах.",
  },
];

const steps = [
  {
    n: "1",
    title: "Выгрузи мысль",
    text: "Одна фраза в заметку — без структуры и без «идеального» текста.",
  },
  {
    n: "2",
    title: "Отметь важное",
    text: "Реакция показывает, что горит сейчас, а что можно отложить.",
  },
  {
    n: "3",
    title: "Увидь паттерн",
    text: "Галерея и лента показывают, к чему ты возвращаешься снова и снова.",
  },
  {
    n: "4",
    title: "Сделай шаг",
    text: "Идея или чат помогают выбрать действие — и вернуться к записям, если нужно.",
  },
];

const proof = [
  {
    quote:
      "Снова тону в мелочах — Nova подсветила одну тему недели вместо ещё одного списка.",
    who: "из заметки про фокус",
  },
  {
    quote:
      "Понял, что лучшие стратегические мысли приходят после 21:00 — теперь планирую слот под контент.",
    who: "из заметки про ритм",
  },
  {
    quote: "Идея дня из ✦ — короткий шаг, а не «надо перестроить всю жизнь».",
    who: "типичный сценарий в Nova",
  },
];

const faq = [
  {
    q: "Это ещё один таск-менеджер?",
    a: "Нет. Nova не заставляет вести проекты. Она помогает услышать себя в заметках и выбрать один следующий шаг.",
  },
  {
    q: "У меня нет дисциплины — смысл?",
    a: "Именно для этого короткие записи и реакции: меньше трения, больше опоры на то, что ты уже написал.",
  },
  {
    q: "Идеи будут «из воздуха»?",
    a: "Подсказки строятся на твоих текстах, тегах и реакциях — не на абстрактных советах из интернета.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--nova-border)] bg-[var(--nova-bg)]">
        <ForestDecor density="hero" />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 94% 52% at 50% -8%, rgb(255 226 176 / 0.16), transparent 52%), radial-gradient(ellipse 70% 42% at 100% 18%, rgb(84 118 74 / 0.2), transparent 46%), radial-gradient(ellipse 70% 42% at 0% 25%, rgb(72 106 62 / 0.2), transparent 46%)",
          }}
        />
        <div className="relative z-[2] mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--nova-moss)]">
            Для прокрастинации, СДВГ и креаторов
          </p>
          <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[var(--nova-forest)] sm:text-4xl md:text-5xl">
            Из хаоса мыслей — один понятный следующий шаг
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--nova-muted)] sm:text-lg">
            Записываешь мысль за 10 секунд. Nova видит, что для тебя важно, и подсказывает идею,
            привычку или действие — без бесконечных списков и чувства, что ты снова «ничего не
            сделал».
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/ideas"
              className="rounded-full bg-gradient-to-br from-[var(--nova-accent)] to-[#4e8f42] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 hover:to-[var(--nova-accent-hover)]"
            >
              Получить идею сейчас
            </Link>
            <Link
              href="/notes"
              className="rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)] px-8 py-3 text-sm font-semibold text-[var(--nova-text)] hover:border-[var(--nova-accent)]/40"
            >
              Выгрузить мысль в заметку
            </Link>
          </div>
          <p className="mt-6 max-w-xl text-sm text-[var(--nova-placeholder)]">
            Кнопка ✦ в углу — идея из твоих записей за пару секунд. Чат — когда нужно разобрать
            мысль вслух.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--nova-border)] bg-[var(--nova-surface)] py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--nova-muted)] sm:text-base">
            <span className="font-semibold text-[var(--nova-forest)]">Знакомо?</span> В голове 20
            идей, 3 «надо бы», и ноль энергии выбрать, с чего начать. Nova не мотивирует
            плакатами — она превращает твои же заметки в опору: что важно, что повторяется, что
            сделать первым.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <h2 className="text-2xl font-semibold text-[var(--nova-text)]">
          Что ты получаешь — не «функции», а результат
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--nova-muted)]">
          Меньше шума. Больше ясности. Один шаг, который можно сделать сегодня.
        </p>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <li
              key={item.title}
              className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-6 shadow-[0_14px_34px_rgba(0,0,0,0.22)]"
            >
              <h3 className="text-base font-semibold text-[var(--nova-forest)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--nova-muted)]">{item.text}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--nova-accent)] hover:text-[var(--nova-accent-hover)]"
              >
                {item.cta}
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--nova-border)] bg-[var(--nova-surface)] py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold text-[var(--nova-text)]">Кому Nova реально помогает</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {audience.map((a) => (
              <li
                key={a.title}
                className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-6"
              >
                <h3 className="text-base font-semibold text-[var(--nova-forest)]">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--nova-muted)]">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <h2 className="text-2xl font-semibold text-[var(--nova-text)]">Как это работает</h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--nova-muted)]">
          Четыре шага без сложной настройки — цикл, который можно повторять каждый день.
        </p>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-5"
            >
              <p className="text-lg font-bold text-[var(--nova-accent)]">{s.n}</p>
              <h3 className="mt-2 text-sm font-semibold text-[var(--nova-forest)]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--nova-muted)]">{s.text}</p>
            </li>
          ))}
        </ol>
        <Link
          href="/how-it-works"
          className="mt-8 inline-flex text-sm font-semibold text-[var(--nova-accent)] hover:text-[var(--nova-accent-hover)]"
        >
          Подробнее о процессе →
        </Link>
      </section>

      <section className="border-t border-[var(--nova-border)] bg-[var(--nova-surface)] py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold text-[var(--nova-text)]">
            Как это ощущается на практике
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {proof.map((p) => (
              <li
                key={p.who}
                className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-6"
              >
                <p className="text-sm leading-relaxed text-[var(--nova-text)]">&ldquo;{p.quote}&rdquo;</p>
                <p className="mt-4 text-xs font-medium text-[var(--nova-placeholder)]">{p.who}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <h2 className="text-2xl font-semibold text-[var(--nova-text)]">Частые сомнения</h2>
        <ul className="mt-8 space-y-4">
          {faq.map((item) => (
            <li
              key={item.q}
              className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-6"
            >
              <h3 className="text-sm font-semibold text-[var(--nova-forest)]">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--nova-muted)]">{item.a}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--nova-border)] bg-[var(--nova-surface)] py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-8 shadow-[0_16px_42px_rgba(0,0,0,0.24)] md:p-10">
            <h2 className="text-xl font-semibold text-[var(--nova-forest)] md:text-2xl">
              Не жди «идеального дня» — начни с одной заметки
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--nova-muted)]">
              Реакции и повторяющиеся темы подсказывают, куда уходит внимание. Нажми ✦ — получи
              идею. Если застрял — открой чат и разбери мысль без осуждения.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/ideas"
                className="rounded-full bg-gradient-to-br from-[var(--nova-accent)] to-[#4e8f42] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/25 hover:to-[var(--nova-accent-hover)]"
              >
                Получить идею сейчас
              </Link>
              <Link
                href="/chat"
                className="rounded-full bg-[var(--nova-accent-soft)] px-5 py-2.5 text-sm font-semibold text-[var(--nova-accent-hover)] ring-1 ring-[var(--nova-accent)]/30"
              >
                Разобрать мысль в чате
              </Link>
              <Link
                href="/contact"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--nova-muted)] ring-1 ring-[var(--nova-border)] hover:text-[var(--nova-text)]"
              >
                Telegram Nova
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
