import type { ReactNode } from "react";
import { ForestDecor } from "@/components/decorative/ForestDecor";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--nova-border)] bg-[var(--nova-bg)]">
      <ForestDecor density="hero" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 85% 50% at 50% -5%, rgb(255 226 176 / 0.12), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 20%, rgb(84 118 74 / 0.18), transparent 48%), radial-gradient(ellipse 60% 40% at 0% 30%, rgb(72 106 62 / 0.16), transparent 48%)",
        }}
      />
      <div className="relative z-[2] mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--nova-moss)]">
          {eyebrow}
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--nova-forest)] sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--nova-muted)] sm:text-lg">
          {subtitle}
        </p>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
