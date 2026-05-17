"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  DEFAULT_REACTION,
  NOTE_REACTIONS,
  type ReactionIcon,
} from "@/lib/note-reactions";
import {
  SEED_POSTS,
  extractTags,
  formatNoteTime,
  loadUserNotes,
  saveUserNotes,
  type NotePost,
} from "@/lib/notes-storage";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

function readImageFile(file: File): Promise<string> {
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

export function NotesPageContent() {
  const fileInputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [userPosts, setUserPosts] = useState<NotePost[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [text, setText] = useState("");
  const [reaction, setReaction] = useState<ReactionIcon>(DEFAULT_REACTION);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setUserPosts(loadUserNotes());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveUserNotes(userPosts);
  }, [userPosts, hydrated]);

  useEffect(() => {
    if (composeOpen) textareaRef.current?.focus();
  }, [composeOpen]);

  const posts = [...userPosts, ...SEED_POSTS];

  const resetCompose = useCallback(() => {
    setText("");
    setReaction(DEFAULT_REACTION);
    setImageUrl(null);
    setImageError(null);
    setSubmitError(null);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const closeCompose = useCallback(() => {
    setComposeOpen(false);
    resetCompose();
  }, [resetCompose]);

  const onPickImage = async (file: File | undefined) => {
    setImageError(null);
    if (!file) return;
    try {
      const dataUrl = await readImageFile(file);
      setImageUrl(dataUrl);
    } catch (e) {
      const err = e instanceof Error ? e.message : "";
      if (err === "too-large") {
        setImageError("Фото до 2 МБ — выбери файл поменьше.");
      } else {
        setImageError("Не удалось загрузить фото. Попробуй JPG или PNG.");
      }
      setImageUrl(null);
    }
  };

  const submitNote = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setSubmitError("Напиши хотя бы одну мысль — можно коротко.");
      return;
    }
    const post: NotePost = {
      id: `user-${Date.now()}`,
      time: formatNoteTime(),
      text: trimmed,
      tags: extractTags(trimmed),
      top: reaction,
      imageUrl: imageUrl ?? undefined,
      isUser: true,
    };
    setUserPosts((prev) => [post, ...prev]);
    closeCompose();
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--nova-muted)]">
          {hydrated ? (
            <>
              В ленте <span className="font-semibold text-[var(--nova-text)]">{posts.length}</span>{" "}
              {posts.length === 1 ? "запись" : posts.length < 5 ? "записи" : "записей"}
              {userPosts.length > 0 ? ` · твоих: ${userPosts.length}` : ""}
            </>
          ) : (
            "Загрузка ленты…"
          )}
        </p>
        <button
          type="button"
          onClick={() => (composeOpen ? closeCompose() : setComposeOpen(true))}
          className="rounded-full bg-gradient-to-br from-[var(--nova-accent)] to-[#4e8f42] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:to-[var(--nova-accent-hover)]"
          aria-expanded={composeOpen}
          aria-controls="nova-add-note-panel"
        >
          {composeOpen ? "Скрыть форму" : "Добавить запись"}
        </button>
      </div>

      {composeOpen ? (
        <div
          id="nova-add-note-panel"
          className="mb-8 rounded-3xl border border-[var(--nova-accent)]/35 bg-[var(--nova-card)] p-5 shadow-[0_16px_42px_rgba(0,0,0,0.28)] ring-1 ring-[var(--nova-accent)]/20 sm:p-6"
        >
          <h2 className="text-sm font-semibold text-[var(--nova-forest)]">Новая запись</h2>
          <p className="mt-1 text-xs text-[var(--nova-placeholder)]">
            Текст, фото по желанию и реакция — что для тебя важно сейчас.
          </p>

          <label className="mt-4 block">
            <span className="sr-only">Текст записи</span>
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setSubmitError(null);
              }}
              rows={4}
              placeholder="О чём думаешь? Можно с #тегами…"
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
                  setImageUrl(null);
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
              <img
                src={imageUrl}
                alt="Превью к записи"
                className="max-h-48 w-full object-cover"
              />
            </div>
          ) : null}

          <div className="mt-4">
            <p className="text-xs font-medium text-[var(--nova-muted)]">Реакция на запись</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {NOTE_REACTIONS.map((r) => (
                <button
                  key={r.label}
                  type="button"
                  title={r.label}
                  onClick={() => setReaction(r.icon)}
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
              onClick={submitNote}
              className="rounded-full bg-[var(--nova-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--nova-accent-hover)]"
            >
              Сохранить в ленту
            </button>
            <button
              type="button"
              onClick={closeCompose}
              className="rounded-full px-5 py-2.5 text-sm font-medium text-[var(--nova-muted)] ring-1 ring-[var(--nova-border)] hover:text-[var(--nova-text)]"
            >
              Отмена
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-5 shadow-[0_16px_42px_rgba(0,0,0,0.24)]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--nova-text)]">
                  {post.isUser ? "Твоя запись" : "Личный пост"}
                </p>
                <p className="text-xs text-[var(--nova-placeholder)]">{post.time}</p>
              </div>
              {post.imageUrl ? (
                <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--nova-border)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="max-h-64 w-full object-cover"
                  />
                </div>
              ) : null}
              <p className="mt-4 text-sm leading-relaxed text-[var(--nova-muted)]">{post.text}</p>
              {post.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--nova-accent-soft)] px-3 py-1 text-xs text-[var(--nova-muted)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[var(--nova-border)] pt-4 text-xs">
                {NOTE_REACTIONS.map((r) => (
                  <span
                    key={r.label}
                    className={`rounded-full px-3 py-1.5 ${
                      r.icon === post.top
                        ? "bg-[var(--nova-accent)] text-white"
                        : "bg-[var(--nova-accent-soft)] text-[var(--nova-muted)]"
                    }`}
                    aria-hidden={r.icon !== post.top}
                  >
                    {r.icon}
                  </span>
                ))}
                <span className="ml-auto text-[var(--nova-placeholder)]">
                  Приоритет: {post.top}
                </span>
              </div>
            </article>
          ))}
        </div>

        <aside className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-surface)] p-6 shadow-[0_14px_36px_rgba(0,0,0,0.24)] lg:sticky lg:top-24">
          <h2 className="text-base font-semibold text-[var(--nova-forest)]">
            Реакции = приоритет без списков
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--nova-muted)]">
            Не нужно сортировать папки. Одним тапом показываешь, что важно — Nova подстроит идеи
            под это.
          </p>
          <ul className="mt-6 space-y-4">
            {NOTE_REACTIONS.map((r) => (
              <li key={r.label} className="flex items-start gap-3">
                <span className="mt-0.5 text-lg" aria-hidden>
                  {r.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--nova-text)]">{r.label}</p>
                  <p className="text-xs text-[var(--nova-placeholder)]">{r.hint}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/ideas"
            className="mt-7 inline-flex rounded-full bg-[var(--nova-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--nova-accent-hover)]"
          >
            Идея по моим реакциям
          </Link>
        </aside>
      </div>
    </section>
  );
}

