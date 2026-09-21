type ImageRights = {
  alt?: unknown;
  source?: unknown;
  permission?: unknown;
  rightsConfirmed?: unknown;
};

export function hasImageRights(value: unknown): value is ImageRights {
  if (!value || typeof value !== 'object') return false;
  const image = value as ImageRights;
  return (
    image.rightsConfirmed === true &&
    [image.alt, image.source, image.permission].every(
      (field) => typeof field === 'string' && field.trim().length >= 2,
    )
  );
}

export function isSafeHref(href: string) {
  if (!href || /[\s\\\u0000-\u001f]/.test(href)) return false;
  if (href.startsWith('/') && !href.startsWith('//')) return true;
  if (/^#[\w-]+$/.test(href)) return true;
  try {
    const url = new URL(href);
    return (
      ['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}
