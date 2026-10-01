// Error monitoring (Sentry), shared by client, server and edge. Only in
// production builds (next build): `next dev` and tests send nothing. Errors
// only: no tracing or replay, and no IP or cookies (sendDefaultPii: false);
// the user is set by SentryUser (id + username, never the email).
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

export const sentryOptions = {
  dsn,
  enabled: Boolean(dsn) && process.env.NODE_ENV === "production",
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || "development",
  sendDefaultPii: false,
  tracesSampleRate: 0,
};
