import Link from "next/link";
import { ForestDecor } from "@/components/decorative/ForestDecor";
import { chatAutostartFromNotesHref } from "@/lib/chat-routes";

const highlights = [
  {
    title: "Идея вместо перегруза",
    text: "Nova анализирует твои заметки и реакции и помогает выбрать один следующий шаг вместо десятков разрозненных задач.",
    href: chatAutostartFromNotesHref(),
    cta: "Получить идею",
  },
  {
    title: "Заметки без трения",
    text: "Записывай мысль сразу, отмечай реакцией и не теряй её среди бесконечных черновиков. Всё сохраняется в одном месте, без лишней подготовки.",
    href: "/notes",
    cta: "Записать мысль",
  },
  {
    title: "Видно, о чём ты на самом деле",
    text: "Галерея показывает повторяющиеся темы и паттерны, чтобы ты быстрее замечал, что действительно занимает твои мысли.",
    href: "/gallery",
    cta: "Открыть темы",
  },
];

const audience = [
  {
    title: "Прокрастинация",
    text: "Когда задач много, а начать сложно, Nova помогает убрать лишний шум и увидеть один реальный шаг на сегодня.",
  },
  {
    title: "СДВГ и расфокус",
    text: "Когда внимание скачет, короткие записи и мягкие подсказки помогают не терять нить и быстрее возвращаться к делу.",
  },
  {
    title: "Контент-креаторы",
    text: "Когда идей больше, чем готового контента, Nova помогает находить темы, углы и форматы прямо из твоих заметок.",
  },
];

const steps = [
  {
    n: "1",
    title: "Выгрузи мысль",
    text: "Просто запиши одну фразу — без структуры и без попытки сразу всё сформулировать идеально.",
  },
  {
    n: "2",
    title: "Отметь важное",
    text: "Реакция помогает понять, что сейчас действительно цепляет, а что можно отложить.",
  },
  {
    n: "3",
    title: "Увидь паттерн",
    text: "Лента и галерея показывают повторяющиеся темы и мысли, к которым ты возвращаешься.",
  },
  {
    n: "4",
    title: "Сделай шаг",
    text: "Получи идею или открой чат, чтобы выбрать следующее действие без перегруза.",
  },
];

const proof = [
  {
    quote:
      "Листала референсы вместо монтажа — Nova помогла выбрать одну тему на неделю, а не утонуть в новых идеях.",
  },
  {
    quote:
      "Поймала, что лучше думаю вечером — перенесла сценарии на это время и наконец села писать.",
  },
  {
    quote:
      "Идея из ✦ дала один маленький шаг, а не очередное обещание всё изменить с понедельника.",
  },
];

const faq = [
  {
    q: "Это ещё один таск-менеджер?",
    a: "Нет. Nova не заменяет проектные сервисы. Она помогает быстро разгрузить голову, увидеть главное и выбрать один следующий шаг.",
  },
  {
    q: "У меня нет дисциплины — смысл?",
    a: "Именно поэтому Nova сделана с минимальным трением: короткая запись, простая реакция, понятная подсказка. Не нужно «собираться» заранее.",
  },
  {
    q: "Идеи будут «из воздуха»?",
    a: "Нет. Подсказки опираются на твои записи, реакции и повторяющиеся темы, а не на случайные советы.",
  },
];

export default function HomePage() {
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
              "radial-gradient(ellipse 94% 52% at 50% -8%, rgb(255 226 176 / 0.16), transparent 52%), radial-gradient(ellipse 70% 42% at 100% 18%, rgb(84 118 74 / 0.2), transparent 46%), radial-gradient(ellipse 70% 42% at 0% 25%, rgb(72 106 62 / 0.2), transparent 46%)",
          }}
        />
        <div className="relative z-[2] mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--nova-moss)]">
            Для прокрастинации, СДВГ и креаторов
          </p>
          <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[var(--nova-forest)] sm:text-4xl md:text-5xl">
            Nova помогает превратить хаос мыслей в один понятный следующий шаг
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--nova-muted)] sm:text-lg">
            Записывай мысль за 10 секунд, отмечай важное и получай короткую подсказку — без
            перегруза, длинных списков и чувства вины.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={ideaHref}
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
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--nova-placeholder)]">
            Кнопка ✦ быстро превращает твои заметки в идею или следующий шаг. Чат помогает
            разобрать мысль, когда нужно проговорить всё вслух и спокойно собрать смысл.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--nova-border)] bg-[var(--nova-surface)] py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--nova-muted)] sm:text-base">
            <span className="font-semibold text-[var(--nova-forest)]">Знакомо?</span> Когда в
            голове слишком много идей, задач и «надо бы», трудно понять, с чего начать. Nova не
            давит мотивацией — она помогает увидеть, что важно именно сейчас.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <h2 className="text-2xl font-semibold text-[var(--nova-text)]">
          Что ты получаешь — не набор функций, а понятный результат
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--nova-muted)]">
          Меньше шума. Больше ясности. Один шаг, который можно сделать уже сегодня.
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
          <h2 className="text-2xl font-semibold text-[var(--nova-text)]">
            Для кого Nova особенно полезна
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--nova-muted)]">
            Если мысли мешают начать, Nova помогает разложить их без давления и лишней сложности.
          </p>
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
          Четыре простых шага, которые можно повторять каждый день.
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
            Как это выглядит в реальной жизни
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {proof.map((p) => (
              <li
                key={p.quote}
                className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-6"
              >
                <p className="text-sm leading-relaxed text-[var(--nova-text)]">
                  &ldquo;{p.quote}&rdquo;
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <h2 className="text-2xl font-semibold text-[var(--nova-text)]">
          Частые вопросы и сомнения
        </h2>
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
              Не жди идеального дня — начни с одной заметки
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--nova-muted)]">
              Отметь важное, увидь повторяющиеся темы и получи следующий шаг без лишнего шума.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={ideaHref}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
