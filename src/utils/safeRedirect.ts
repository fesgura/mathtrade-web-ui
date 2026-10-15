// Sign-in `?redirect=` target. Only same-origin paths are allowed, so a crafted
// link (`?redirect=https://evil.example` or `//evil.example`) can't send a
// fresh login off-site. Older links carry an absolute URL of this same origin
// (the middleware used to pass `request.url`); those are reduced to their path.
export const safeRedirectPath = (
  raw: string | null | undefined,
  origin: string
): string | null => {
  if (!raw) return null;
  try {
    const url = new URL(raw, origin);
    if (url.origin !== origin) return null;
    const path = `${url.pathname}${url.search}${url.hash}`;
    // new URL already normalizes "\" to "/"; a path that still starts with
    // "//" would be protocol-relative.
    if (!path.startsWith("/") || path.startsWith("//")) return null;
    return path;
  } catch {
    return null;
  }
};
