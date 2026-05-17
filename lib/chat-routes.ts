import { CHAT_FROM_NOTES_PARAM } from "@/lib/notes-feed-prompt";

export function chatAutostartFromNotesHref() {
  return `/chat?autostart=1&from=${CHAT_FROM_NOTES_PARAM}`;
}
