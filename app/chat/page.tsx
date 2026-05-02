import type { Metadata } from "next";
import { Suspense } from "react";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { ForestDecor } from "@/components/decorative/ForestDecor";

export const metadata: Metadata = {
  title: "Чат",
  description:
    "Раздел чата для текстового диалога и уточнения заметок.",
};

export default function ChatPage() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <ForestDecor density="subtle" />
      <div className="relative z-[1] mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--nova-text)] sm:text-3xl">
          Чат
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--nova-muted)]">
          В этом разделе можно вести диалог и переходить к заметкам или идеям.
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
