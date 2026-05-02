/** Безопасный origin для metadata и абсолютных URL (никогда не бросает). */
const DEFAULT_ORIGIN = "http://localhost:3000";

/**
 * Нормализует `NEXT_PUBLIC_SITE_URL`: добавляет `https://`, если нет схемы,
 * возвращает только origin. Невалидное значение → localhost (чтобы не ронять `metadataBase`).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_ORIGIN;

  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw)
    ? raw
    : `https://${raw}`;

  try {
    return new URL(withScheme.replace(/\/$/, "")).origin;
  } catch {
    return DEFAULT_ORIGIN;
  }
}

/** Готовый `URL` для `metadata.metadataBase`. */
export function getMetadataBase(): URL {
  try {
    return new URL(getSiteUrl());
  } catch {
    return new URL(DEFAULT_ORIGIN);
  }
}
