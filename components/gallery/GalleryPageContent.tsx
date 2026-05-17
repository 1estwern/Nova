"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { chatAutostartFromNotesHref } from "@/lib/chat-routes";
import { buildGalleryCategories, excerpt } from "@/lib/gallery-grouping";
import {
  categoryLabel,
  loadCategoryLabels,
  loadUserNotes,
  NOTES_UPDATED_EVENT,
  saveCategoryLabels,
  type NotePost,
} from "@/lib/notes-storage";

export function GalleryPageContent() {
  const [notes, setNotes] = useState<NotePost[]>([]);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");

  const refresh = useCallback(() => {
    setNotes(loadUserNotes());
    setLabels(loadCategoryLabels());
  }, []);

  useEffect(() => {
    refresh();
    setHydrated(true);
    const onUpdate = () => refresh();
    window.addEventListener(NOTES_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(NOTES_UPDATED_EVENT, onUpdate);
  }, [refresh]);

  const categories = buildGalleryCategories(notes, labels);
  const hasNotes = notes.length > 0;

  const startEditCategory = (key: string) => {
    setEditingKey(key);
    setEditLabel(categoryLabel(key, labels));
  };

  const saveCategory = () => {
    if (!editingKey) return;
    const trimmed = editLabel.trim();
    if (!trimmed) {
      setEditingKey(null);
      return;
    }
    const next = { ...labels, [editingKey]: trimmed };
    setLabels(next);
    saveCategoryLabels(next);
    setEditingKey(null);
  };

  if (!hydrated) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
        <p className="text-sm text-[var(--nova-muted)]">Загрузка галереи…</p>
      </section>
    );
  }

  if (!hasNotes) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
        <div className="rounded-3xl border border-dashed border-[var(--nova-border)] bg-[var(--nova-card)]/60 px-8 py-16 text-center">
          <p className="text-lg font-semibold text-[var(--nova-forest)]">
            Пока что ты не делал заметки
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--nova-muted)]">
            Когда появятся записи в ленте, они автоматически разложатся по категориям — по
            первому #тегу в тексте.
          </p>
          <Link
            href="/notes"
            className="mt-8 inline-flex rounded-full bg-[var(--nova-accent)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--nova-accent-hover)]"
          >
            Написать первую заметку
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
      <p className="mb-8 text-sm text-[var(--nova-muted)]">
        {notes.length}{" "}
        {notes.length === 1 ? "заметка" : notes.length < 5 ? "заметки" : "заметок"} в{" "}
        {categories.length}{" "}
        {categories.length === 1 ? "категории" : categories.length < 5 ? "категориях" : "категориях"}
        . Нажми на название категории, чтобы переименовать.
      </p>

      <div className="space-y-12">
        {categories.map((cat) => (
          <section key={cat.key}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {editingKey === cat.key ? (
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveCategory();
                      if (e.key === "Escape") setEditingKey(null);
                    }}
                    className="rounded-full border border-[var(--nova-accent)] bg-[var(--nova-surface)] px-4 py-1.5 text-sm font-semibold text-[var(--nova-text)] focus:outline-none focus:ring-2 focus:ring-[var(--nova-accent)]/30"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={saveCategory}
                    className="rounded-full bg-[var(--nova-accent)] px-3 py-1 text-xs font-semibold text-white"
                  >
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingKey(null)}
                    className="text-xs text-[var(--nova-muted)] hover:text-[var(--nova-text)]"
                  >
                    Отмена
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => startEditCategory(cat.key)}
                    className="rounded-full bg-[var(--nova-accent-soft)] px-3 py-1 text-xs font-medium text-[var(--nova-accent-hover)] transition hover:ring-1 hover:ring-[var(--nova-accent)]/40"
                    title="Переименовать категорию"
                  >
                    {cat.label}
                    <span className="ml-1.5 opacity-60" aria-hidden>
                      ✎
                    </span>
                  </button>
                  <span className="text-xs text-[var(--nova-placeholder)]">
                    {cat.notes.length}{" "}
                    {cat.notes.length === 1 ? "запись" : cat.notes.length < 5 ? "записи" : "записей"}
                  </span>
                </>
              )}
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.notes.map((note) => (
                <li key={note.id}>
                  <Link
                    href="/notes"
                    className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[var(--nova-border)] bg-gradient-to-br from-[#1f3d28] via-[#2d5a32] to-[#3d6e40] shadow-[0_12px_34px_rgba(0,0,0,0.28)] transition hover:border-[var(--nova-accent)]/45"
                  >
                    {note.imageUrl ? (
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={note.imageUrl}
                          alt=""
                          className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-center justify-between gap-2 text-[11px] text-white/70">
                        <span>{note.time}</span>
                        <span aria-hidden>{note.top}</span>
                      </div>
                      <p className="mt-2 flex-1 text-sm font-medium leading-snug text-white">
                        {excerpt(note.text, 100)}
                      </p>
                      {note.tags.length > 0 ? (
                        <p className="mt-3 text-[10px] text-white/55">
                          {note.tags.slice(0, 3).map((t) => `#${t}`).join(" ")}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href={chatAutostartFromNotesHref()}
          className="rounded-full bg-[var(--nova-accent)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--nova-accent-hover)]"
        >
          Следующий шаг из тем
        </Link>
        <Link
          href="/notes"
          className="rounded-full border border-[var(--nova-border)] px-6 py-2.5 text-sm font-semibold text-[var(--nova-text)]"
        >
          Редактировать заметки
        </Link>
      </div>
    </section>
  );
}
