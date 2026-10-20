"use client";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import I18N from "@/i18n";
import { PRIVATE_ROUTES } from "@/config/routes";
import Icon from "@/components/icon";
import Wrapper from "@/components/wrapper";

const MIN_REFRESH_INTERVAL_MS = 60 * 1000;
const DISMISS_KEY = "mt_adv_unready_items_dismissed";

const readDismissed = (): string => {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) || "";
  } catch {
    return "";
  }
};

const writeDismissed = (signature: string) => {
  try {
    window.sessionStorage.setItem(DISMISS_KEY, signature);
  } catch {
    // Private mode / blocked storage
  }
};

/* Site-wide warning for members who have offered items with ready === false
 * (e.g. cloned from a previous Math Trade with box_status='CP' or
 * component_status='CP'). Explicitly lists the exact item titles so the user
 * knows which copies need completion during the offer stage or which copies
 * were left out once the offer stage closed. */
const AdvUnreadyItems = () => {
  const { membership, canI, reloadValue } = useContext(PageContext);
  const pathname = usePathname();
  const myOfferPath = PRIVATE_ROUTES.MY_OFFER.path;
  const myCollectionPath = PRIVATE_ROUTES.MY_COLLECTION.path;
  const isMember = !!membership;

  const [dismissedSig, setDismissedSig] = useState("");
  const [loadItems, items] = useFetch({
    endpoint: "GET_MYITEMS",
    initialState: [],
  });
  const lastRefreshRef = useRef(0);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    setDismissedSig(readDismissed());
  }, []);

  useEffect(() => {
    if (!isMember) return;
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      if (now - lastRefreshRef.current < MIN_REFRESH_INTERVAL_MS) return;
      lastRefreshRef.current = now;
      loadItems();
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
    if (
      isMember &&
      prev !== pathname &&
      (prev === myOfferPath || prev === myCollectionPath)
    ) {
      lastRefreshRef.current = Date.now();
      loadItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!isMember || !reloadValue) return;
    lastRefreshRef.current = Date.now();
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadValue, isMember]);

  const unreadyItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.filter((item: any) => item && item.ready === false);
  }, [items]);

  const titles = useMemo(
    () => unreadyItems.map((item: any) => item.title).filter(Boolean),
    [unreadyItems]
  );

  const signature = `${canI?.offer ? "offer" : "closed"}:${unreadyItems
    .map((item: any) => item.id)
    .sort((a: number, b: number) => a - b)
    .join(",")}`;

  if (!isMember || titles.length === 0 || signature === dismissedSig) {
    return null;
  }

  const plural = titles.length !== 1;
  const titlesText = titles.join(", ");

  return (
    <Wrapper className="mt-main">
      <div
        className="relative w-full max-w-full min-w-0 text-center text-sm sm:text-base leading-snug break-words p-2 pr-8 shadow-main rounded-main border border-amber-300 bg-amber-100 text-amber-950"
        role="status"
      >
        {canI?.offer ? (
          <>
            <I18N
              id={plural ? "advUnreadyItems.offer.many" : "advUnreadyItems.offer.one"}
              values={[titlesText]}
            />{" "}
            <Link href={myOfferPath} className="underline font-bold hover:opacity-75">
              <I18N id="advUnreadyItems.offer.link" />
            </Link>
            .
          </>
        ) : (
          <I18N
            id={plural ? "advUnreadyItems.closed.many" : "advUnreadyItems.closed.one"}
            values={[titlesText]}
          />
        )}
        <button
          type="button"
          className="absolute top-1 right-1 w-6 h-6"
          onClick={() => {
            writeDismissed(signature);
            setDismissedSig(signature);
          }}
          aria-label="Cerrar"
        >
          <Icon />
        </button>
      </div>
    </Wrapper>
  );
};

export default AdvUnreadyItems;
