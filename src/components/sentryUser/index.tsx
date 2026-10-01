"use client";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { useStore } from "@/store";

// Tags Sentry errors with who hit them (id + username, never the email).
// Follows the store, so sign-out and expired sessions clear it too.
const SentryUser = () => {
  const user = useStore((state) => state.data?.user);
  const id = user?.id;
  const username = user?.username;

  useEffect(() => {
    Sentry.setUser(id ? { id: String(id), username } : null);
  }, [id, username]);

  return null;
};

export default SentryUser;
