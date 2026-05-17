"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { chatAutostartFromNotesHref } from "@/lib/chat-routes";
import { DEFAULT_REACTION, NOTE_REACTIONS, type ReactionIcon } from "@/lib/note-reactions";
import {
  createUserNote,
  loadUserNotes,
  normalizeNote,
  postsForFeed,
  saveUserNotes,
  type NotePost,
} from "@/lib/notes-storage";
import { NoteFormPanel } from "@/components/notes/NoteFormPanel";

export function NotesPageContent() {
  const [userPosts, setUserPosts] = useState<NotePost[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
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

  const posts = postsForFeed(userPosts);
  const showingExamples = userPosts.length === 0;

  const resetForm = useCallback(() => {
    setText("");
    setReaction(DEFAULT_REACTION);
    setImageUrl(null);
    setImageError(null);
    setSubmitError(null);
  }, []);

  const closeCompose = useCallback(() => {
    setComposeOpen(false);
    resetForm();
  }, [resetForm]);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    resetForm();
  }, [resetForm]);

  const startEdit = (post: NotePost) => {
    if (!post.isUser) return;
    setComposeOpen(false);
    setEditingId(post.id);
    setText(post.text);
    setReaction(post.top);
    setImageUrl(post.imageUrl ?? null);
    setImageError(null);
    setSubmitError(null);
  };

  const submitCreate = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setSubmitError("Напиши хотя бы одну мысль — можно коротко.");
      return;
    }
    setUserPosts((prev) => [
      createUserNote({ text: trimmed, top: reaction, imageUrl: imageUrl ?? undefined }),
      ...prev,
    ]);
    closeCompose();
  };

  const submitEdit = () => {
    const trimmed = text.trim();
    if (!trimmed || !editingId) {
      setSubmitError("Текст не может быть пустым.");
      return;
    }
    setUserPosts((prev) =>
      prev.map((p) => {
        if (p.id !== editingId) return p;
        const next: NotePost = { ...p, text: trimmed, top: reaction };
        if (imageUrl) next.imageUrl = imageUrl;
        else delete next.imageUrl;
        return normalizeNote(next);
      })
    );
    cancelEdit();
  };

  const deleteNote = (id: string) => {
    if (!confirm("Удалить эту запись?")) return;
    setUserPosts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) cancelEdit();
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--nova-muted)]">
          {hydrated ? (
            showingExamples ? (
              <>
                Примеры записей —{" "}
                <span className="text-[var(--nova-placeholder)]">
                  исчезнут, как только добавишь свою
                </span>
              </>
            ) : (
              <>
                Твоя лента ·{" "}
                <span className="font-semibold text-[var(--nova-text)]">{userPosts.length}</span>{" "}
                {userPosts.length === 1 ? "запись" : userPosts.length < 5 ? "записи" : "записей"}
              </>
            )
          ) : (
            "Загрузка ленты…"
          )}
        </p>
        <button
          type="button"
          onClick={() => {
            if (composeOpen) closeCompose();
            else {
              cancelEdit();
              setComposeOpen(true);
            }
          }}
          className="rounded-full bg-gradient-to-br from-[var(--nova-accent)] to-[#4e8f42] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:to-[var(--nova-accent-hover)]"
          aria-expanded={composeOpen}
          aria-controls="nova-add-note-panel"
        >
          {composeOpen ? "Скрыть форму" : "Добавить запись"}
        </button>
      </div>

      {composeOpen ? (
        <div id="nova-add-note-panel">
          <NoteFormPanel
            mode="create"
            title="Новая запись"
            hint="Текст, фото по желанию и реакция. Первый #тег — категория в галерее."
            text={text}
            onTextChange={(v) => {
              setText(v);
              setSubmitError(null);
            }}
            reaction={reaction}
            onReactionChange={setReaction}
            imageUrl={imageUrl}
            onImageUrlChange={setImageUrl}
            imageError={imageError}
            onImageError={setImageError}
            submitError={submitError}
            onSubmit={submitCreate}
            onCancel={closeCompose}
            submitLabel="Сохранить в ленту"
          />
        </div>
      ) : null}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl border border-[var(--nova-border)] bg-[var(--nova-card)] p-5 shadow-[0_16px_42px_rgba(0,0,0,0.24)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--nova-text)]">
                  {post.isUser ? "Твоя запись" : showingExamples ? "Пример" : "Запись"}
                </p>
                <div className="flex items-center gap-2">
                  {post.isUser ? (
                    <>
                      <button
                        type="button"
                        onClick={() => startEdit(post)}
                        className="text-xs font-semibold text-[var(--nova-accent)] hover:text-[var(--nova-accent-hover)]"
                      >
                        Редактировать
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteNote(post.id)}
                        className="text-xs text-[var(--nova-placeholder)] hover:text-red-300"
                      >
                        Удалить
                      </button>
                    </>
                  ) : null}
                  <p className="text-xs text-[var(--nova-placeholder)]">{post.time}</p>
                </div>
              </div>

              {editingId === post.id ? (
                <NoteFormPanel
                  mode="edit"
                  title="Редактирование"
                  hint="Изменения сохранятся в ленте и в галерее."
                  text={text}
                  onTextChange={(v) => {
                    setText(v);
                    setSubmitError(null);
                  }}
                  reaction={reaction}
                  onReactionChange={setReaction}
                  imageUrl={imageUrl}
                  onImageUrlChange={setImageUrl}
                  imageError={imageError}
                  onImageError={setImageError}
                  submitError={submitError}
                  onSubmit={submitEdit}
                  onCancel={cancelEdit}
                  submitLabel="Сохранить изменения"
                />
              ) : (
                <>
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
                  <p className="mt-4 text-sm leading-relaxed text-[var(--nova-muted)]">
                    {post.text}
                  </p>
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
                      >
                        {r.icon}
                      </span>
                    ))}
                    <span className="ml-auto text-[var(--nova-placeholder)]">
                      Приоритет: {post.top}
                    </span>
                  </div>
                </>
              )}
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
            href={chatAutostartFromNotesHref()}
            className="mt-7 inline-flex rounded-full bg-[var(--nova-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--nova-accent-hover)]"
          >
            Идея по моим реакциям
          </Link>
        </aside>
      </div>
    </section>
  );
}
