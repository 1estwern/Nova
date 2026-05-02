import { NextResponse } from "next/server";
import { NOVA_SYSTEM_PROMPT } from "@/lib/nova-system-prompt";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

type ChatMessage = { role: "user" | "assistant"; content: string };

function isChatMessage(v: unknown): v is ChatMessage {
  if (!v || typeof v !== "object") return false;
  const m = v as ChatMessage;
  return (
    (m.role === "user" || m.role === "assistant") &&
    typeof m.content === "string"
  );
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey?.trim()) {
    return NextResponse.json(
      {
        error:
          "На сервере не задан OPENROUTER_API_KEY. Добавь ключ в .env и перезапусти dev-сервер.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const messagesRaw =
    body && typeof body === "object" && "messages" in body
      ? (body as { messages: unknown }).messages
      : null;
  const seedPromptRaw =
    body && typeof body === "object" && "seedPrompt" in body
      ? (body as { seedPrompt: unknown }).seedPrompt
      : null;

  if (!Array.isArray(messagesRaw) || !messagesRaw.every(isChatMessage)) {
    return NextResponse.json(
      {
        error:
          "Ожидается массив messages с объектами { role: 'user' | 'assistant', content: string }",
      },
      { status: 400 }
    );
  }

  const messages: ChatMessage[] = messagesRaw;
  const seedPrompt =
    typeof seedPromptRaw === "string" && seedPromptRaw.trim().length > 0
      ? seedPromptRaw.trim()
      : null;
  const totalLen = messages.reduce((n, m) => n + m.content.length, 0);
  if (totalLen + (seedPrompt?.length ?? 0) > 24_000) {
    return NextResponse.json(
      { error: "Слишком длинная история. Начни новый диалог или сократи текст." },
      { status: 400 }
    );
  }

  const model =
    process.env.OPENROUTER_MODEL?.trim() || "openai/gpt-4o-mini";

  const payload = {
    model,
    messages: [
      { role: "system" as const, content: NOVA_SYSTEM_PROMPT },
      ...messages,
      ...(seedPrompt ? [{ role: "user" as const, content: seedPrompt }] : []),
    ],
  };

  let res: Response;
  try {
    res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : "Неизвестная ошибка сети при подключении к OpenRouter.";
    return NextResponse.json(
      {
        error:
          "Не удалось подключиться к OpenRouter. Проверь интернет/DNS/VPN и доступ к openrouter.ai. " +
          `Техническая деталь: ${msg}`,
      },
      { status: 502 }
    );
  }

  if (!res.ok) {
    const text = await res.text();
    console.error("OpenRouter error:", res.status, text);
    return NextResponse.json(
      {
        error:
          "Провайдер AI недоступен или отклонил запрос. Проверь ключ и баланс OpenRouter.",
      },
      { status: 502 }
    );
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    return NextResponse.json(
      { error: "Пустой ответ от модели" },
      { status: 502 }
    );
  }

  return NextResponse.json({ content });
}
