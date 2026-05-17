export const CHAT_STORAGE_KEY = "nova-muse-chat-v1";
export const CHAT_DRAFT_PROMPT_KEY = "nova-muse-chat-draft-prompt-v1";

export function stashChatSeedPrompt(prompt: string) {
  try {
    sessionStorage.setItem(CHAT_DRAFT_PROMPT_KEY, prompt);
  } catch {
    /* ignore */
  }
}

export function takeChatSeedPrompt(): string | null {
  try {
    const prompt = sessionStorage.getItem(CHAT_DRAFT_PROMPT_KEY)?.trim();
    if (prompt) sessionStorage.removeItem(CHAT_DRAFT_PROMPT_KEY);
    return prompt || null;
  } catch {
    return null;
  }
}
