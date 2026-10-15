"use client";
import { useEffect, useRef } from "react";
import { PRIVATE_ROUTES } from "@/config/routes";
import { useOptions } from "@/store";

// Game links (admin "Copiar link" on the Juegos cards):
// `/mathtrade/offer?game=<bgg_id>` opens the Ejemplares tab listing every
// copy of that game. A numeric item keyword is an exact game filter in the
// backend (MathItem list `keyword` → `elements__game_id`, combos included).
// User-made games have negative ids, which that filter can't express, so
// they get no link.
export const GAME_PARAM = "game";

export const canLinkGame = (bggId?: number | null) =>
  typeof bggId === "number" && Number.isInteger(bggId) && bggId > 0;

export const gamePermalink = (bggId: number) =>
  `${window.location.origin}${PRIVATE_ROUTES.OFFER.path}?${GAME_PARAM}=${bggId}`;

const clearGameParam = () => {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(GAME_PARAM)) return;
  url.searchParams.delete(GAME_PARAM);
  window.history.replaceState(
    window.history.state,
    "",
    `${url.pathname}${url.search}${url.hash}`
  );
};

// Offer page: reads `?game=` once after mount. The Ejemplares filters are
// replaced (not merged), so a filter left from before can't hide the copies;
// "ignored: false" = show ignored copies too. Then the URL is cleaned.
const useGameFromUrl = (showItemsTab: () => void) => {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const raw = new URLSearchParams(window.location.search).get(GAME_PARAM);
    if (raw === null) return;
    const bggId = /^\d+$/.test(raw.trim()) ? Number(raw.trim()) : 0;
    if (bggId > 0) {
      useOptions.setState({
        filters_item: { keyword: String(bggId), page: 1, ignored: false },
      });
      showItemsTab();
    }
    clearGameParam();
  }, [showItemsTab]);
};

export default useGameFromUrl;
