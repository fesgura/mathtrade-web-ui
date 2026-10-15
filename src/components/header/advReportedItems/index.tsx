"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import I18N from "@/i18n";
import { PRIVATE_ROUTES } from "@/config/routes";
import Icon from "@/components/icon";
import Wrapper from "@/components/wrapper";

const MIN_REFRESH_INTERVAL_MS = 60 * 1000;
const DISMISS_KEY = "mt_adv_reported_items_dismissed";

const readDismissed = (): number => {
  try {
    return Number(window.sessionStorage.getItem(DISMISS_KEY)) || 0;
  } catch {
    return 0;
  }
};

const writeDismissed = (count: number) => {
  try {
    window.sessionStorage.setItem(DISMISS_KEY, String(count));
  } catch {
    // Private mode / blocked storage: the dismiss lasts until reload.
  }
};

/* Site-wide reminder for owners with copies that have an open report they
 * can see (the amber box in Yo ofrezco: staff, participant or shared
 * logistics reports). Count from `user-items/reported-count/` (one query,
 * own items only, so admins see just theirs). Refreshed on mount, on tab
 * focus (throttled) and when leaving Yo ofrezco / Mi ludoteca, where
 * withdrawing a copy resolves its reports. Shown on every page, Yo ofrezco
 * included (reported copies are listed first there, with their amber box).
 * Dismissing lasts for the browser session, unless the count goes up. */
const AdvReportedItems = () => {
  const { membership } = useContext(PageContext);
  const pathname = usePathname();
  const myOfferPath = PRIVATE_ROUTES.MY_OFFER.path;
  const myCollectionPath = PRIVATE_ROUTES.MY_COLLECTION.path;
  const isMember = !!membership;

  const [dismissedCount, setDismissedCount] = useState(0);
  const [loadCount, data] = useFetch({ endpoint: "GET_MY_REPORTED_COUNT" });
  const lastRefreshRef = useRef(0);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    setDismissedCount(readDismissed());
  }, []);

  useEffect(() => {
    if (!isMember) return;
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      if (now - lastRefreshRef.current < MIN_REFRESH_INTERVAL_MS) return;
      lastRefreshRef.current = now;
      loadCount();
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

  useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;
    if (isMember && prev !== pathname && (prev === myOfferPath || prev === myCollectionPath)) {
      lastRefreshRef.current = Date.now();
      loadCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const count: number = Number(data?.count) || 0;
  if (!isMember || count <= 0 || count <= dismissedCount) {
    return null;
  }

  const plural = count !== 1;

  return (
    <Wrapper className="mt-main">
      <div
        className="relative w-full max-w-full min-w-0 text-center text-sm sm:text-base leading-snug break-words p-2 pr-8 shadow-main rounded-main border border-amber-300 bg-amber-100 text-amber-950"
        role="status"
      >
        <I18N id={plural ? "advReportedItems.many" : "advReportedItems.one"} values={[count]} />{" "}
        <Link href={myOfferPath} className="underline font-bold hover:opacity-75">
          <I18N id={plural ? "advReportedItems.link.many" : "advReportedItems.link.one"} />
        </Link>
        .
        <button
          type="button"
          className="absolute top-1 right-1 w-6 h-6"
          onClick={() => {
            writeDismissed(count);
            setDismissedCount(count);
          }}
          aria-label="Cerrar"
        >
          <Icon />
        </button>
      </div>
    </Wrapper>
  );
};

export default AdvReportedItems;
