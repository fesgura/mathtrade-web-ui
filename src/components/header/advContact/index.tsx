"use client";
import { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import I18N from "@/i18n";
import { PRIVATE_ROUTES } from "@/config/routes";
import Icon from "@/components/icon";
import Wrapper from "@/components/wrapper";

const MIN_REFRESH_INTERVAL_MS = 60 * 1000;

/* Site-wide reminder for members of the active edition without a way to be
 * reached: red with neither WhatsApp nor Telegram (the admin users list's
 * "Sin contacto" filter is exactly who sees it), soft with only one, naming
 * the missing one. WhatsApp = the phone (Mi cuenta has no WhatsApp field;
 * the legacy `whatsapp` value is a fallback). Reads
 * the member's own profile (GET_USER) rather than the login payload, which is
 * persisted and would go stale right after they edit their contact. Hidden on
 * "Mi cuenta", where they fix it. */
const AdvContact = () => {
  const [showAdvice, setShowAdvice] = useState(true);
  const { membership } = useContext(PageContext);
  const pathname = usePathname();
  const myAccountPath = PRIVATE_ROUTES.MY_ACCOUNT.path;
  const isMember = !!membership;

  const [loadUser, user] = useFetch({ endpoint: "GET_USER" });
  const lastRefreshRef = useRef(0);
  const prevPathRef = useRef(pathname);

  // On mount and on tab focus, throttled like AdvContribution.
  useEffect(() => {
    if (!isMember) return;
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      if (now - lastRefreshRef.current < MIN_REFRESH_INTERVAL_MS) return;
      lastRefreshRef.current = now;
      loadUser();
    };
    refresh();
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMember]);

  // Leaving "Mi cuenta" (client-side navigation, no focus event): they may
  // have just saved their contact, so reload past the throttle.
  useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;
    if (isMember && prev === myAccountPath && pathname !== myAccountPath) {
      lastRefreshRef.current = Date.now();
      loadUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!showAdvice || !isMember || !user || pathname === myAccountPath) return null;

  const hasWhatsapp = !!user.phone?.trim?.() || !!user.whatsapp?.trim?.();
  const hasTelegram = !!user.telegram?.trim?.();
  if (hasWhatsapp && hasTelegram) return null;
  const state = !hasWhatsapp && !hasTelegram ? "missing" : "partial";
  const textId =
    state === "missing" ? "advContact.missing" : `advContact.partial.${hasWhatsapp ? "telegram" : "whatsapp"}`;

  return (
    <Wrapper className="mt-main">
      <div
        className={clsx(
          "relative w-full max-w-full min-w-0 text-center text-sm sm:text-base leading-snug break-words p-2 pr-8 shadow-main rounded-main",
          state === "missing" ? "bg-red-600 text-white" : "bg-amber-100 text-amber-900"
        )}
      >
        <I18N id={textId} />{" "}
        <Link href={myAccountPath} className="underline font-bold hover:opacity-75">
          <I18N id="advContact.link" />
        </Link>
        <button
          type="button"
          className="absolute top-1 right-1 w-6 h-6"
          onClick={() => setShowAdvice(false)}
        >
          <Icon />
        </button>
      </div>
    </Wrapper>
  );
};

export default AdvContact;
