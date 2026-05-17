"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { stashChatSeedPrompt } from "@/lib/chat-storage";
import { DEMO_IDEAS } from "@/lib/demo-ideas";

type Particle = {
  id: number;
  glyph: string;
  tx: number;
  ty: number;
  spin: number;
  spinEnd: number;
  durationMs: number;
  delayMs: number;
};

const GLYPHS = ["✿", "🌸", "🌿", "🍃", "♪", "♫", "‧"];
const SAVED_IDEAS_KEY = "nova-muse-saved-ideas-v1";
type SavedIdea = {
  headline: string;
  body: string;
  hint?: string;
  savedAt: string;
};

function pickIdeaIndex(prev: number): number {
  const n = DEMO_IDEAS.length;
  if (n <= 1) return 0;
  let next = prev;
  let guard = 0;
  while (next === prev && guard < 12) {
    next = Math.floor(Math.random() * n);
    guard++;
  }
  return next;
}

export function IdeaBloomFAB() {
  const router = useRouter();
  const dlgId = useId();
  const [open, setOpen] = useState(false);
  const [ideaIdx, setIdeaIdx] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isLoadingIdea, setIsLoadingIdea] = useState(false);
  const [saveNote, setSaveNote] = useState<string | null>(null);
  const burstId = useRef(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const spawnBurst = useCallback(() => {
    const idBase = burstId.current++;
    const pieces: Particle[] = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      const angleDeg = (360 / count) * i + (Math.random() * 36 - 18);
      const dist = 76 + Math.random() * 56;
      const rad = (angleDeg * Math.PI) / 180;
      pieces.push({
        id: idBase * 1000 + i,
        glyph: GLYPHS[i % GLYPHS.length],
        tx: Math.sin(rad) * dist,
        ty: -Math.cos(rad) * dist,
        spin: Math.random() * 40 - 20,
        spinEnd: Math.random() * 180 + 180,
        durationMs: 780 + Math.floor(Math.random() * 220),
        delayMs: Math.floor(Math.random() * 90),
      });
    }
    setParticles(pieces);
    window.setTimeout(() => setParticles([]), 1100);
  }, []);

  const openCard = useCallback(() => {
    setIdeaIdx((prev) => pickIdeaIndex(prev));
    spawnBurst();
    setOpen(true);
  }, [spawnBurst]);

  const closeCard = useCallback(() => setOpen(false), []);

  const anotherIdea = useCallback(() => {
    if (isLoadingIdea) return;
    setIsLoadingIdea(true);
    window.setTimeout(() => {
      setIdeaIdx((prev) => pickIdeaIndex(prev));
      spawnBurst();
      setIsLoadingIdea(false);
    }, 760);
  }, [isLoadingIdea, spawnBurst]);

  const saveIdea = useCallback((headline: string, body: string, hint?: string) => {
    try {
      const raw = localStorage.getItem(SAVED_IDEAS_KEY);
      const parsed = raw ? (JSON.parse(raw) as SavedIdea[]) : [];
      const next = Array.isArray(parsed) ? parsed : [];
      const exists = next.some((item) => item.headline === headline && item.body === body);
      if (!exists) {
        next.unshift({ headline, body, hint, savedAt: new Date().toISOString() });
      }
      localStorage.setItem(SAVED_IDEAS_KEY, JSON.stringify(next.slice(0, 25)));
      setSaveNote("Я запомнила эту идею");
      window.setTimeout(() => setSaveNote(null), 1700);
    } catch {
      setSaveNote("Идея сохранена локально");
      window.setTimeout(() => setSaveNote(null), 1700);
    }
  }, []);

  const acceptIdea = useCallback(
    (headline: string, body: string, hint?: string) => {
      let savedContext = "";
      try {
        const raw = localStorage.getItem(SAVED_IDEAS_KEY);
        const parsed = raw ? (JSON.parse(raw) as SavedIdea[]) : [];
        if (Array.isArray(parsed) && parsed.length > 0) {
          const savedTitles = parsed
            .slice(0, 5)
            .map((item) => `- ${item.headline}`)
            .join("\n");
          savedContext = `Ранее я сохранял(а) идеи:\n${savedTitles}`;
        }
      } catch {
        /* ignore */
      }
      const prompt = [
        `Я выбрал(а) идею: "${headline}".`,
        `Описание идеи: ${body}`,
        hint ? `Контекст: ${hint}` : null,
        savedContext || null,
        "Предложи 5 конкретных шагов реализации (по приоритету),",
        "какие ресурсы нужны для каждого шага, и с чего начать сегодня.",
      ]
        .filter(Boolean)
        .join("\n");
      stashChatSeedPrompt(prompt);
      closeCard();
      router.push("/chat?autostart=1");
    },
    [closeCard, router]
  );

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCard();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeCard]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const idea = DEMO_IDEAS[ideaIdx] ?? DEMO_IDEAS[0];

  return (
    <>
      <div
        className="pointer-events-none fixed bottom-20 right-4 z-[56] md:bottom-8 md:right-8"
        aria-hidden={open}
      >
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={dlgId}
          onClick={() => openCard()}
          className="pointer-events-auto nova-idea-fab-pulse relative flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full border border-[rgb(255_232_185/0.35)] bg-gradient-to-br from-[var(--nova-accent)] to-[#458238] text-lg text-white shadow-[0_14px_40px_rgba(0,0,0,0.45)] transition active:scale-95 md:h-16 md:w-16 md:text-xl"
          title="Идея или следующий шаг из заметок"
        >
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
            {particles.map((p) => (
              <span
                key={p.id}
                className="nova-idea-particle pointer-events-none absolute left-1/2 top-1/2 origin-center text-base leading-none text-[var(--nova-forest)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] md:text-[1.15rem]"
                style={{
                  ["--tx" as string]: `${p.tx}px`,
                  ["--ty" as string]: `${p.ty}px`,
                  ["--burst-spin" as string]: `${p.spin}deg`,
                  ["--burst-spin-end" as string]: `${p.spinEnd}deg`,
                  animationDuration: `${p.durationMs}ms`,
                  animationDelay: `${p.delayMs}ms`,
                }}
              >
                {p.glyph}
              </span>
            ))}
          </span>
          <span aria-hidden className="relative drop-shadow-md">
            ✦
          </span>
          <span className="sr-only">Получить идею из заметок</span>
        </button>
      </div>

      {open && (
        <>
          <div
            role="presentation"
            className="fixed inset-0 z-[61] animate-[fadeNova_160ms_ease-out] bg-black/65 backdrop-blur-[2px]"
            onClick={() => closeCard()}
            aria-hidden
          />
          <div
            id={dlgId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${dlgId}-title`}
            className="fixed left-4 right-4 top-[48%] z-[62] mx-auto max-w-[min(100%,380px)] -translate-y-1/2 rounded-[2rem] border border-[var(--nova-border)] bg-[var(--nova-card)] p-4 pt-9 shadow-[0_28px_64px_rgba(0,0,0,0.55)] ring-2 ring-[rgb(255_232_185/0.12)] animate-[fadeNova_160ms_ease-out]"
          >
            <p className="text-center text-[11px] font-medium uppercase tracking-wide text-[var(--nova-muted)]">
              Твой следующий шаг
            </p>
            <h2
              id={`${dlgId}-title`}
              className="mt-3 text-center text-sm font-semibold text-[var(--nova-text)]"
            >
              {idea.headline}
            </h2>
            <p className="mx-auto mt-2 max-w-[300px] text-center text-xs leading-relaxed text-[var(--nova-muted)]">
              {idea.body}
            </p>
            {idea.hint ? (
              <p className="mx-auto mt-3 max-w-[280px] text-center text-[11px] text-[var(--nova-placeholder)]">
                {idea.hint}
              </p>
            ) : null}
            {saveNote ? (
              <p
                className="mx-auto mt-2 max-w-[280px] text-center text-[11px] text-[var(--nova-accent-hover)]"
                aria-live="polite"
              >
                {saveNote}
              </p>
            ) : null}

            <div className="mt-5 flex flex-wrap justify-center gap-2 border-t border-[var(--nova-border)] pt-5">
              <button
                type="button"
                className="rounded-full bg-[var(--nova-accent)] px-4 py-2 text-xs font-medium text-white transition hover:bg-[var(--nova-accent-hover)]"
                onClick={() => acceptIdea(idea.headline, idea.body, idea.hint)}
              >
                Сделаю это
              </button>
              <button
                type="button"
                className="rounded-full bg-[var(--nova-bg)] px-4 py-2 text-xs font-medium text-[var(--nova-text)] ring-1 ring-[var(--nova-border)]"
                onClick={() => saveIdea(idea.headline, idea.body, idea.hint)}
              >
                Запомнить
              </button>
              <button
                type="button"
                className="rounded-full bg-[var(--nova-bg)] px-4 py-2 text-xs font-medium text-[var(--nova-muted)] ring-1 ring-[var(--nova-border)] disabled:opacity-60"
                onClick={() => anotherIdea()}
                disabled={isLoadingIdea}
              >
                {isLoadingIdea ? "Подбираю..." : "Другой шаг"}
              </button>
            </div>
            {isLoadingIdea ? (
              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[var(--nova-placeholder)]">
                <span className="inline-block h-3 w-3 animate-spin rounded-full border border-[var(--nova-border)] border-t-[var(--nova-accent)]" />
                Генерирую другую идею...
              </div>
            ) : null}
            <p className="mt-4 text-center text-[11px] text-[var(--nova-muted)]">Nova</p>

            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Закрыть"
              className="absolute right-4 top-3 rounded-full px-3 py-1 text-xs font-medium text-[var(--nova-placeholder)] hover:text-[var(--nova-text)]"
              onClick={() => closeCard()}
            >
              Закрыть
            </button>
          </div>
        </>
      )}
    </>
  );
}
