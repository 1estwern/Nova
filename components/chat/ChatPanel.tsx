"use client";

import ReactMarkdown from "react-markdown";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type Msg = { role: "user" | "assistant"; content: string };
type SendOptions = { textOverride?: string; hiddenUserMessage?: boolean };

const STORAGE_KEY = "nova-muse-chat-v1";
const CHAT_DRAFT_PROMPT_KEY = "nova-muse-chat-draft-prompt-v1";

export function ChatPanel() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) setMessages(parsed as Msg[]);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback(async (options?: SendOptions) => {
    const text = (options?.textOverride ?? input).trim();
    if (!text || loading) return;

    setError(null);
    setInput("");
    const next: Msg[] = options?.hiddenUserMessage
      ? messages
      : [...messages, { role: "user", content: text }];
    if (!options?.hiddenUserMessage) {
      setMessages(next);
    }
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next,
          seedPrompt: options?.hiddenUserMessage ? text : undefined,
        }),
      });
      const data = (await res.json()) as { content?: string; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Ошибка запроса");
        return;
      }

      if (data.content) {
        setMessages([...next, { role: "assistant", content: data.content }]);
      } else {
        setError("Нет текста в ответе");
      }
    } catch {
      setError("Сеть недоступна. Проверь соединение.");
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  useEffect(() => {
    if (searchParams.get("autostart") !== "1") return;
    if (loading) return;
    try {
      const prompt = sessionStorage.getItem(CHAT_DRAFT_PROMPT_KEY)?.trim();
      if (!prompt) return;
      sessionStorage.removeItem(CHAT_DRAFT_PROMPT_KEY);
      void send({ textOverride: prompt, hiddenUserMessage: true });
    } catch {
      /* ignore */
    }
  }, [loading, searchParams, send]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="flex h-[min(70vh,640px)] flex-col overflow-hidden rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] shadow-[0_12px_48px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between border-b border-[var(--nova-border)] px-4 py-3">
        <p className="text-sm font-semibold text-[var(--nova-text)]">
          Диалог с Nova
        </p>
        <button
          type="button"
          onClick={clearChat}
          className="text-xs text-[var(--nova-muted)] underline-offset-2 hover:text-[var(--nova-accent)] hover:underline"
        >
          Очистить
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-[var(--nova-surface)]/50 px-4 py-4">
        {messages.length === 0 && !loading && (
          <p className="text-sm leading-relaxed text-[var(--nova-muted)]">
            Напиши, о чём думаешь — одной мыслью или вопросом. Nova ответит
            коротко и по сути.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={`${i}-${m.role}-${m.content.slice(0, 12)}`}
            className={
              m.role === "user"
                ? "ml-6 rounded-3xl rounded-br-lg bg-[var(--nova-accent-soft)] px-4 py-3 text-sm text-[var(--nova-text)]"
                : "mr-6 rounded-3xl rounded-bl-lg border border-[var(--nova-border)] bg-[var(--nova-card)] px-4 py-3 text-sm leading-relaxed text-[var(--nova-text)] shadow-sm"
            }
          >
            
                    <ReactMarkdown components={{p: ({children}) => <p className="mb-2">{children}</p>, strong: ({children}) => <strong className="font-semibold text-[var(--nova-text)]">{children}</strong>, h3: ({children}) => <h3 className="font-bold mt-3 mb-1">{children}</h3>, li: ({children}) => <li className="ml-4 list-disc">{children}</li>}}>{m.content}</ReactMarkdown>
          </div>
        ))}
        {loading && (
          <p className="text-sm text-[var(--nova-muted)]" aria-live="polite">
            Nova печатает…
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {error && (
        <div className="border-t border-red-900/45 bg-red-950/55 px-4 py-2 text-xs leading-relaxed text-red-100/92">
          {error}
        </div>
      )}

      <div className="border-t border-[var(--nova-border)] bg-[var(--nova-card)] p-3">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            placeholder="Что застряло в голове? (Enter — отправить)"
            rows={2}
            className="min-h-[44px] flex-1 resize-y rounded-2xl border border-[var(--nova-border)] bg-[var(--nova-surface)] px-3 py-2 text-sm text-[var(--nova-text)] placeholder:text-[var(--nova-placeholder)] focus:border-[var(--nova-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--nova-accent)]/20"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => void send()}
            disabled={loading || !input.trim()}
            className="shrink-0 self-end rounded-2xl bg-[var(--nova-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--nova-accent-hover)] disabled:opacity-40"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
