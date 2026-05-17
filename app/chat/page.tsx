import type { Metadata } from "next";
import { Suspense } from "react";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { ForestDecor } from "@/components/decorative/ForestDecor";

export const metadata: Metadata = {
  title: "Чат",
  description:
    "Разбери мысль вслух: Nova помогает собрать смысл и выбрать следующий шаг — без мотивационных простыней.",
};

export default function ChatPage() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <ForestDecor density="subtle" />
      <div className="relative z-[1] mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nova-moss)]">
          Чат
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--nova-text)] sm:text-3xl">
          Разобрать мысль, когда нужно проговорить всё вслух
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--nova-muted)]">
          Коротко опиши, что застряло. Nova поможет собрать смысл и выбрать один шаг — без давления
          и длинных списков. Идеи из разговора можно сохранить через ✦.
        </p>
      </div>
      <div className="relative z-[1]">
        <Suspense fallback={null}>
          <ChatPanel />
        </Suspense>
      </div>
    </div>
  );
}
