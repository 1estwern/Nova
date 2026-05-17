"use client";

import { useId, useRef } from "react";
import { NOTE_REACTIONS, type ReactionIcon } from "@/lib/note-reactions";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export async function readNoteImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("not-image"));
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      reject(new Error("too-large"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

type NoteFormPanelProps = {
  mode: "create" | "edit";
  title: string;
  hint: string;
  text: string;
  onTextChange: (v: string) => void;
  reaction: ReactionIcon;
  onReactionChange: (r: ReactionIcon) => void;
  imageUrl: string | null;
  onImageUrlChange: (url: string | null) => void;
  imageError: string | null;
  onImageError: (msg: string | null) => void;
  submitError: string | null;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel: string;
};

export function NoteFormPanel({
  mode,
  title,
  hint,
  text,
  onTextChange,
  reaction,
  onReactionChange,
  imageUrl,
  onImageUrlChange,
  imageError,
  onImageError,
  submitError,
  onSubmit,
  onCancel,
  submitLabel,
}: NoteFormPanelProps) {
  const fileInputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);

  const onPickImage = async (file: File | undefined) => {
    onImageError(null);
    if (!file) return;
    try {
      onImageUrlChange(await readNoteImageFile(file));
    } catch (e) {
      const err = e instanceof Error ? e.message : "";
      onImageError(
        err === "too-large"
          ? "Фото до 2 МБ — выбери файл поменьше."
          : "Не удалось загрузить фото. Попробуй JPG или PNG."
      );
      onImageUrlChange(null);
    }
  };

  return (
    <div
      className={
        mode === "create"
          ? "mb-8 rounded-3xl border border-[var(--nova-accent)]/35 bg-[var(--nova-card)] p-5 shadow-[0_16px_42px_rgba(0,0,0,0.28)] ring-1 ring-[var(--nova-accent)]/20 sm:p-6"
          : "mt-4 rounded-2xl border border-[var(--nova-accent)]/30 bg-[var(--nova-surface)] p-4 ring-1 ring-[var(--nova-accent)]/15"
      }
    >
      <h2 className="text-sm font-semibold text-[var(--nova-forest)]">{title}</h2>
      <p className="mt-1 text-xs text-[var(--nova-placeholder)]">{hint}</p>

      <label className="mt-4 block">
        <span className="sr-only">Текст записи</span>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          rows={4}
          placeholder="Одна фраза — без структуры. Первый #тег — категория в галерее…"
          className="w-full resize-y rounded-2xl border border-[var(--nova-border)] bg-[var(--nova-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--nova-text)] placeholder:text-[var(--nova-placeholder)] focus:border-[var(--nova-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--nova-accent)]/25"
        />
      </label>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          ref={fileRef}
          id={fileInputId}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => onPickImage(e.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)] px-4 py-2 text-xs font-semibold text-[var(--nova-text)] transition hover:border-[var(--nova-accent)]/45"
        >
          <span aria-hidden>📷</span>
          {imageUrl ? "Сменить фото" : "Добавить фото"}
        </button>
        {imageUrl ? (
          <button
            type="button"
            onClick={() => {
              onImageUrlChange(null);
              if (fileRef.current) fileRef.current.value = "";
            }}
            className="text-xs font-medium text-[var(--nova-muted)] underline-offset-2 hover:text-[var(--nova-text)] hover:underline"
          >
            Убрать фото
          </button>
        ) : null}
      </div>

      {imageError ? (
        <p className="mt-2 text-xs text-red-300/90" role="alert">
          {imageError}
        </p>
      ) : null}

      {imageUrl ? (
        <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--nova-border)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="" className="max-h-48 w-full object-cover" />
        </div>
      ) : null}

      <div className="mt-4">
        <p className="text-xs font-medium text-[var(--nova-muted)]">Реакция</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {NOTE_REACTIONS.map((r) => (
            <button
              key={r.label}
              type="button"
              title={r.label}
              onClick={() => onReactionChange(r.icon)}
              className={`rounded-full px-3 py-1.5 text-base transition ${
                reaction === r.icon
                  ? "bg-[var(--nova-accent)] text-white ring-2 ring-[rgb(255_232_185/0.35)]"
                  : "bg-[var(--nova-accent-soft)] text-[var(--nova-muted)] hover:text-[var(--nova-text)]"
              }`}
            >
              {r.icon}
            </button>
          ))}
        </div>
      </div>

      {submitError ? (
        <p className="mt-3 text-xs text-red-300/90" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--nova-border)] pt-4">
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-full bg-[var(--nova-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--nova-accent-hover)]"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-5 py-2.5 text-sm font-medium text-[var(--nova-muted)] ring-1 ring-[var(--nova-border)] hover:text-[var(--nova-text)]"
        >
          Отмена
        </button>
      </div>
    </div>
  );
}
