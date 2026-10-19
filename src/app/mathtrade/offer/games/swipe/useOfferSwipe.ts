"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PageContext } from "@/context/page";
import { useOptions } from "@/store";
import { useStore } from "@/store";
import { callToAPI } from "@/hooks/useFetch/utils";
import { isWantedGame } from "@/components/ban/isWanted";

// One screen of the catalog. The next screen is fetched as the deck runs
// out, so the swipe covers every game in the current filter without
// downloading the whole list up front.
const SWIPE_PAGE = 50;
const PREFETCH_AT = 8;

type RawGame = {
  bgg_id?: number | null;
  name?: string;
  thumbnail?: string;
  game_thumbnail?: string;
  year?: number | string | null;
  year_published?: number | string | null;
  items?: { id?: number | string; user?: { id?: number | string } | null }[];
  ban_id?: number | null;
  favorite_id?: number | null;
  type?: number | null;
};

export type OfferCard = {
  bggId: number;
  title: string;
  titleLink: string | null;
  thumbnail: string;
  year: number | string | null;
  copies: number;
  favoriteId: number | null;
  banId: number | null;
  raw: RawGame;
};

type Step =
  | { kind: "ignore"; bggId: number; banId: number | null }
  | {
      kind: "favorite";
      bggId: number;
      favoriteId: number | null;
      created: boolean;
    }
  | {
      kind: "want";
      bggId: number;
      wantId: number | null;
      created: boolean;
    }
  | { kind: "skip" };

type Marks = Record<number, { favoriteId?: number | null; banId?: number | null }>;

const toCard = (raw: RawGame): OfferCard | null => {
  if (raw?.bgg_id == null) return null;
  // Same rule as the game card: extras and games without a BGG id have no page.
  const notGame = raw.type === 3 || raw.bgg_id === 23953 || raw.bgg_id < 0;
  return {
    bggId: raw.bgg_id,
    title: raw.name || "",
    titleLink: notGame
      ? null
      : `https://boardgamegeek.com/boardgame/${raw.bgg_id}/`,
    thumbnail: raw.game_thumbnail || raw.thumbnail || "",
    year: raw.year ?? raw.year_published ?? null,
    copies: raw.items?.length ?? 0,
    favoriteId: raw.favorite_id ?? null,
    banId: raw.ban_id ?? null,
    raw,
  };
};

const request = ({
  method,
  endpoint,
  params = null,
  urlParams = [],
  mathtradeId = 0,
}: {
  method: string;
  endpoint: string;
  params?: unknown;
  urlParams?: unknown[];
  mathtradeId?: number;
}) =>
  callToAPI({
    method,
    endpoint,
    path: null,
    urlParams,
    params,
    mathtradeId,
  });

const withMarks = (card: OfferCard, marks: Marks): OfferCard => {
  const mark = marks[card.bggId];
  if (!mark) return card;
  return {
    ...card,
    favoriteId:
      mark.favoriteId !== undefined ? mark.favoriteId : card.favoriteId,
    banId: mark.banId !== undefined ? mark.banId : card.banId,
  };
};

const wantableIds = (card: OfferCard, userId: string | number) =>
  (card.raw.items || [])
    .filter((item) => {
      const owner = item.user?.id;
      if (owner == null || `${owner}` === "") return true;
      return `${owner}` !== `${userId}`;
    })
    .map((item) => item.id)
    .filter((id): id is number | string => id != null);

const useOfferSwipe = (onClose: () => void) => {
  const {
    myWants,
    forceReloadPage,
    canI,
    setMyWants,
    setMustConfirm,
    userId,
  } = useContext(PageContext);
  const mathtradeId = useStore((state) => state.data?.mathtrade?.id);
  const filters = useOptions((state) => state.filters_game);
  const [deck, setDeck] = useState<OfferCard[]>([]);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<Step[]>([]);
  const [marks, setMarks] = useState<Marks>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [retry, setRetry] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [finished, setFinished] = useState(false);
  const wantsRef = useRef(myWants);
  wantsRef.current = myWants;
  const filtersRef = useRef(filters);
  filtersRef.current = filters;
  const flight = useRef(0);
  const nextPageRef = useRef(1);
  const snapshotRef = useRef<string | null>(null);
  const filterParams = useRef<Record<string, unknown> | null>(null);

  const fetchPage = useCallback(
    async (page: number, snapshot: string | null) => {
      if (!mathtradeId || flight.current) return;
      flight.current = page;
      setLoadingMore(true);
      if (!filterParams.current) {
        const { page: _page, ...rest } = (filtersRef.current || {}) as Record<
          string,
          unknown
        >;
        filterParams.current = rest;
      }
      const [errors, , data] = await request({
        method: "GET",
        endpoint: "GET_GAMES_LIST",
        mathtradeId,
        params: {
          ...filterParams.current,
          page,
          page_size: SWIPE_PAGE,
          ...(snapshot ? { snapshot } : {}),
        },
      });
      flight.current = 0;
      setLoadingMore(false);
      if (errors || !data?.results) {
        setError(true);
        return;
      }
      const cards = (data.results as RawGame[])
        .map(toCard)
        .filter((card): card is OfferCard => card !== null);
      if (data.snapshot) snapshotRef.current = data.snapshot;
      nextPageRef.current = page + 1;
      const count = data.count || 0;
      setTotal(count);
      let loaded = 0;
      setDeck((current) => {
        const seen = new Set(current.map((card) => card.bggId));
        const merged = current.concat(
          cards.filter((card) => !seen.has(card.bggId))
        );
        loaded = merged.length;
        return merged;
      });
      if (cards.length < SWIPE_PAGE || loaded >= count) setFinished(true);
    },
    [mathtradeId]
  );

  useEffect(() => {
    if (!mathtradeId) return;
    void fetchPage(1, null);
    // The filter is whatever was on screen when the deck opened.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mathtradeId]);

  useEffect(() => {
    if (finished || error || loadingMore || deck.length === 0) return;
    if (deck.length - index > PREFETCH_AT) return;
    void fetchPage(nextPageRef.current, snapshotRef.current);
  }, [deck.length, error, fetchPage, finished, index, loadingMore]);

  const shown = deck[index] ? withMarks(deck[index], marks) : null;

  const advance = useCallback((step: Step) => {
    setHistory((current) => [...current, step]);
    setIndex((current) => current + 1);
    setError(false);
  }, []);

  const fail = useCallback(() => {
    setBusy(false);
    setError(true);
    setRetry((current) => current + 1);
  }, []);

  // Bring the card back without an error. Used when a down-swipe was not a want.
  const bounce = useCallback(() => {
    setBusy(false);
    setRetry((current) => current + 1);
  }, []);

  const favorite = useCallback(
    async (card: OfferCard) => {
      if (card.favoriteId) {
        advance({
          kind: "favorite",
          bggId: card.bggId,
          favoriteId: card.favoriteId,
          created: false,
        });
        return;
      }
      setBusy(true);
      const [errors, , data] = await request({
        method: "POST",
        endpoint: "POST_FAVORITE",
        params: { bgg_id: card.bggId, name: card.title },
      });
      setBusy(false);
      if (errors || !data?.id) {
        fail();
        return;
      }
      setMarks((current) => ({
        ...current,
        [card.bggId]: { ...current[card.bggId], favoriteId: data.id },
      }));
      advance({
        kind: "favorite",
        bggId: card.bggId,
        favoriteId: data.id,
        created: true,
      });
    },
    [advance, fail]
  );

  const ignore = useCallback(
    async (card: OfferCard) => {
      if (card.banId) {
        advance({ kind: "ignore", bggId: card.bggId, banId: null });
        return;
      }
      setBusy(true);
      setConfirming(false);
      const [errors, , data] = await request({
        method: "POST",
        endpoint: "POST_BAN",
        params: { type: "G", identity: card.bggId },
      });
      setBusy(false);
      if (errors || !data?.id) {
        fail();
        return;
      }
      setMarks((current) => ({
        ...current,
        [card.bggId]: { ...current[card.bggId], banId: data.id },
      }));
      advance({ kind: "ignore", bggId: card.bggId, banId: data.id });
    },
    [advance, fail]
  );

  const prepare = useCallback(
    (yes: boolean) => {
      if (yes || !shown || shown.banId) return true;
      if (isWantedGame(shown.raw, wantsRef.current)) {
        setConfirming(true);
        return false;
      }
      return true;
    },
    [shown]
  );

  const onSwipe = useCallback(
    (yes: boolean) => {
      if (!shown || busy) return;
      if (yes) favorite(shown);
      else ignore(shown);
    },
    [busy, favorite, ignore, shown]
  );

  const onSkip = useCallback(() => {
    if (busy) return;
    advance({ kind: "skip" });
  }, [advance, busy]);

  // Down wants the game, the same quick add as "Lo quiero": every copy that
  // isn't the user's own. A closed want stage snaps the card back instead.
  const prepareWant = useCallback(() => {
    if (!canI?.want || !shown) return false;
    if (isWantedGame(shown.raw, wantsRef.current)) return true;
    return wantableIds(shown, userId).length > 0;
  }, [canI, shown, userId]);

  const want = useCallback(
    async (card: OfferCard) => {
      if (!canI?.want) {
        bounce();
        return;
      }
      if (isWantedGame(card.raw, wantsRef.current)) {
        advance({
          kind: "want",
          bggId: card.bggId,
          wantId: null,
          created: false,
        });
        return;
      }
      const ids = wantableIds(card, userId);
      if (!ids.length) {
        bounce();
        return;
      }
      const notGame =
        card.raw.type === 3 || card.bggId === 23953 || card.bggId < 0;
      setBusy(true);
      const [errors, , data] = await request({
        method: "POST",
        endpoint: "POST_MYWANTS",
        mathtradeId,
        params: {
          name: card.title,
          bgg_id: notGame ? null : card.bggId,
          want_ids: ids,
          item_ids: [],
          dup_protection: true,
        },
      });
      setBusy(false);
      if (errors || !data?.id) {
        fail();
        return;
      }
      setMyWants((current: { id?: number }[] = []) => [
        ...current,
        {
          ...data,
          type: data.type || "game",
          bgg_id: data.bgg_id ?? card.bggId,
          wants: data.wants || ids.map((id) => ({ id })),
          isNewHot: true,
        },
      ]);
      setMustConfirm(true);
      advance({
        kind: "want",
        bggId: card.bggId,
        wantId: data.id,
        created: true,
      });
    },
    [advance, bounce, canI, fail, mathtradeId, setMustConfirm, setMyWants, userId]
  );

  const onWant = useCallback(() => {
    if (!shown || busy) return;
    void want(shown);
  }, [busy, shown, want]);

  const onUndo = useCallback(async () => {
    const last = history[history.length - 1];
    if (!last || busy) return;
    setError(false);
    if (last.kind === "ignore" && last.banId) {
      setBusy(true);
      const [errors] = await request({
        method: "DELETE",
        endpoint: "DELETE_BAN_GAME",
        urlParams: [last.banId],
      });
      setBusy(false);
      if (errors) {
        setError(true);
        return;
      }
      setMarks((current) => ({
        ...current,
        [last.bggId]: { ...current[last.bggId], banId: null },
      }));
    }
    if (last.kind === "want" && last.created && last.wantId) {
      setBusy(true);
      const [errors] = await request({
        method: "DELETE",
        endpoint: "DELETE_MYWANTS",
        urlParams: [last.wantId],
        mathtradeId,
      });
      setBusy(false);
      if (errors) {
        setError(true);
        return;
      }
      const removed = last.wantId;
      setMyWants((current: { id?: number }[] = []) =>
        current.filter((group) => group.id !== removed)
      );
    }
    if (last.kind === "favorite" && last.created && last.favoriteId) {
      setBusy(true);
      const [errors] = await request({
        method: "DELETE",
        endpoint: "DELETE_FAVORITE",
        urlParams: [last.favoriteId],
      });
      setBusy(false);
      if (errors) {
        setError(true);
        return;
      }
      setMarks((current) => ({
        ...current,
        [last.bggId]: { ...current[last.bggId], favoriteId: null },
      }));
    }
    setHistory((current) => current.slice(0, -1));
    setIndex((current) => Math.max(0, current - 1));
  }, [busy, history, mathtradeId, setMyWants]);

  const confirm = useCallback(() => {
    if (shown) ignore(shown);
  }, [ignore, shown]);

  const cancelConfirm = useCallback(() => setConfirming(false), []);

  const close = useCallback(() => {
    const changed = history.some((step) => step.kind !== "skip");
    if (changed) forceReloadPage();
    onClose();
  }, [forceReloadPage, history, onClose]);

  const ignored = history.filter(
    (step) => step.kind === "ignore" && step.banId
  ).length;
  const favored = history.filter(
    (step) => step.kind === "favorite" && step.created
  ).length;
  const skipped = history.filter((step) => step.kind === "skip").length;
  const wantedCount = history.filter(
    (step) => step.kind === "want" && step.created
  ).length;

  return {
    card: shown,
    index,
    total: total || deck.length,
    busy,
    error,
    confirming,
    retry,
    canUndo: history.length > 0 && !busy,
    done: finished && deck.length > 0 && index >= deck.length,
    empty: finished && deck.length === 0,
    booting: !finished && deck.length === 0 && !error,
    waiting: deck.length > 0 && index >= deck.length && !finished,
    counts: { ignored, favored, skipped, wanted: wantedCount },
    canWant: Boolean(canI?.want),
    wanted: shown ? isWantedGame(shown.raw, myWants) : false,
    prepare,
    prepareWant,
    onSwipe,
    onSkip,
    onWant,
    onUndo,
    confirm,
    cancelConfirm,
    close,
  };
};

export default useOfferSwipe;
