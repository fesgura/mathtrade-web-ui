"use client";
import { useContext, useEffect, useRef } from "react";
import { PageContext } from "@/context/page";
import { PRIVATE_ROUTES } from "@/config/routes";

// Item permalinks: any page under /mathtrade accepts `?item=<id>` and opens the
// item preview modal on load. Admins share them with "Copiar link".
export const ITEM_PARAM = "item";

// The home page is enabled for every logged-in user and loads no lists.
export const itemPermalink = (id: number | string) =>
  `${window.location.origin}${PRIVATE_ROUTES.HOME.path}?${ITEM_PARAM}=${encodeURIComponent(
    String(id)
  )}`;

// Drops `?item=` from the address bar (no navigation), so a reload doesn't
// reopen the modal. Keeps history.state: the Next router stores its own there.
export const clearItemParam = () => {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(ITEM_PARAM)) return;
  url.searchParams.delete(ITEM_PARAM);
  window.history.replaceState(
    window.history.state,
    "",
    `${url.pathname}${url.search}${url.hash}`
  );
};

// Reads the param once after mount: useSearchParams would force a client-side
// rendering bailout (Suspense boundary) on every /mathtrade page.
const useItemFromUrl = () => {
  const { setItemPreviewId, setCustomMathtradeId, setShowModalPreview } =
    useContext(PageContext);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const raw = new URLSearchParams(window.location.search).get(ITEM_PARAM);
    if (raw === null) return;
    const id = /^\d+$/.test(raw.trim()) ? Number(raw.trim()) : 0;
    if (!id) {
      // Not an id at all: nothing to preview, just clean the URL.
      clearItemParam();
      return;
    }
    // An unknown or forbidden id still opens: the modal shows its error.
    setCustomMathtradeId(null);
    setItemPreviewId(id);
    setShowModalPreview(true);
  }, [setItemPreviewId, setCustomMathtradeId, setShowModalPreview]);
};

export default useItemFromUrl;
