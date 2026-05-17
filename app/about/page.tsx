import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О проекте",
  description:
    "Nova — спокойное пространство для мыслей: из хаоса в голове к понятным следующим шагам.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nova-moss)]">
        О Nova
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--nova-text)] sm:text-4xl">
        Nova — не ещё один планировщик, а спокойное пространство для мыслей.
      </h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-[var(--nova-muted)] sm:text-base">
        <p>
          Nova — это не просто сервис для заметок и идей, а спокойное пространство, которое
          помогает превращать хаос в голове в понятные следующие шаги.
        </p>
        <p>
          Он создан для тех, у кого слишком много мыслей, задач и идей, чтобы держать всё в голове
          или тонуть в бесконечных списках. Nova помогает быстро зафиксировать мысль, увидеть
          закономерности и мягко вернуться к тому, что действительно важно.
        </p>
      </div>
      <Link
        href="/ideas"
        className="mt-10 inline-flex rounded-full bg-[var(--nova-accent)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--nova-accent-hover)]"
      >
        Попробовать идею сейчас
      </Link>
    </div>
  );
}
