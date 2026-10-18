"use client";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import { useOptions } from "@/store";
import { getRightValue, isEmptyWantGroup } from "@/components/want-components/utils";
import {
  buildDeck,
  countYes,
  itemFace,
  orderedItems,
  orderedWants,
  wantFace,
  type DeckCard,
  type Direction,
  type Face,
} from "./model";

type HistoryEntry = { key: string; before: boolean };

type Session = {
  anchorId: number;
  direction: Direction;
  cards: DeckCard[];
  index: number;
  history: HistoryEntry[];
};

export type AnchorCard = {
  id: number;
  face: Face;
  disabled: boolean;
  yesCount: number;
};

const useSwipe = () => {
  const options = useOptions((state) => state.options);
  const updateOptions = useOptions((state) => state.updateOptions);
  const filters = useOptions((state) => state.filters_wants);

  const { setPageType, myWants, myItemsInMT_forWants, canI, changedWantIds } =
    useContext(PageContext);
  const { matchValues, changes, setChanges, isLoadedWants } =
    useContext(MyWantsContext);

  useEffect(() => {
    setPageType("wants-visual");
  }, [setPageType]);

  const [direction, setDirectionState] = useState<Direction>(
    options?.swipeDirection === "want" ? "want" : "item"
  );
  const [onlyMissing, setOnlyMissingState] = useState(
    Boolean(options?.swipeOnlyMissing)
  );
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    updateOptions({ swipeDirection: direction, swipeOnlyMissing: onlyMissing });
  }, [updateOptions, direction, onlyMissing]);

  const matchRef = useRef(matchValues);
  const changesRef = useRef(changes);
  const sessionRef = useRef<Session | null>(session);
  matchRef.current = matchValues;
  changesRef.current = changes;
  sessionRef.current = session;

  const orderRaw = filters?.order || "type";
  const wants = useMemo(
    () => orderedWants(myWants || [], orderRaw, changedWantIds),
    [myWants, orderRaw, changedWantIds]
  );
  const items = useMemo(
    () => orderedItems(myItemsInMT_forWants || [], myWants || [], orderRaw),
    [myItemsInMT_forWants, myWants, orderRaw]
  );

  const anchorRows = useMemo(() => {
    return direction === "item"
      ? items.map((item) => ({
          id: Number(item.id),
          face: itemFace(item),
          disabled: false,
        }))
      : wants.map((want) => ({
          id: Number(want.id),
          face: wantFace(want, changedWantIds.has(Number(want.id))),
          disabled: isEmptyWantGroup(want),
        }));
  }, [direction, items, wants, changedWantIds]);

  // Yes-counts walk every pair. Skip that while a deck is open: each swipe
  // would otherwise rebuild the whole grid just to redraw a hidden picker.
  const anchors: AnchorCard[] = useMemo(() => {
    if (session) return anchorRows.map((row) => ({ ...row, yesCount: 0 }));
    return anchorRows.map((row) => ({
      ...row,
      yesCount: countYes(
        buildDeck({
          direction,
          anchorId: row.id,
          wants,
          items,
          matchValues,
          changes,
          onlyMissing: false,
          changedIds: changedWantIds,
        }),
        matchValues,
        changes
      ),
    }));
  }, [
    session,
    anchorRows,
    direction,
    wants,
    items,
    matchValues,
    changes,
    changedWantIds,
  ]);

  const apply = useCallback(
    (key: string, next: boolean) => {
      const saved = Boolean(matchRef.current?.[key]);
      setChanges((old: Record<string, boolean>) => {
        const copy = { ...old };
        if (next === saved) delete copy[key];
        else copy[key] = next;
        return copy;
      });
    },
    [setChanges]
  );

  const openDeck = useCallback(
    (anchorId: number, missing: boolean) => {
      setSession({
        anchorId,
        direction,
        cards: buildDeck({
          direction,
          anchorId,
          wants,
          items,
          matchValues,
          changes,
          onlyMissing: missing,
          changedIds: changedWantIds,
        }),
        index: 0,
        history: [],
      });
    },
    [direction, wants, items, matchValues, changes, changedWantIds]
  );

  const setDirection = useCallback((next: Direction) => {
    if (next === direction) return;
    setDirectionState(next);
    setSession(null);
  }, [direction]);

  const setOnlyMissing = useCallback(
    (next: boolean) => {
      setOnlyMissingState(next);
      setSession((current) => {
        if (!current) return current;
        return {
          ...current,
          cards: buildDeck({
            direction: current.direction,
            anchorId: current.anchorId,
            wants,
            items,
            matchValues,
            changes,
            onlyMissing: next,
            changedIds: changedWantIds,
          }),
          index: 0,
          history: [],
        };
      });
    },
    [wants, items, matchValues, changes, changedWantIds]
  );

  const start = useCallback(
    (anchorId: number) => {
      openDeck(anchorId, onlyMissing);
    },
    [openDeck, onlyMissing]
  );

  const exit = useCallback(() => {
    setSession(null);
  }, []);

  const step = useCallback((delta: number) => {
    const current = sessionRef.current;
    if (!current) return;
    const index = Math.max(
      0,
      Math.min(current.cards.length, current.index + delta)
    );
    if (index === current.index) return;
    const next = { ...current, index };
    sessionRef.current = next;
    setSession(next);
  }, []);

  const swipe = useCallback(
    (yes: boolean) => {
      if (!canI?.want) return;
      const current = sessionRef.current;
      const card = current?.cards[current.index];
      if (!current || !card) return;
      const before = Boolean(
        getRightValue(matchRef.current, changesRef.current, card.pairKey)
      );
      apply(card.pairKey, yes);
      const next = {
        ...current,
        index: current.index + 1,
        history: [...current.history, { key: card.pairKey, before }],
      };
      sessionRef.current = next;
      setSession(next);
    },
    [apply, canI]
  );

  const undo = useCallback(() => {
    if (!canI?.want) return;
    const current = sessionRef.current;
    const last = current?.history[current.history.length - 1];
    if (!current || !last) return;
    apply(last.key, last.before);
    const next = {
      ...current,
      history: current.history.slice(0, -1),
      index: Math.max(0, current.index - 1),
    };
    sessionRef.current = next;
    setSession(next);
  }, [apply, canI]);

  const anchorStillThere = useMemo(() => {
    if (!session) return true;
    const list = session.direction === "item" ? items : wants;
    return list.some((row) => Number(row?.id) === session.anchorId);
  }, [session, items, wants]);

  useEffect(() => {
    if (session && !anchorStillThere) setSession(null);
  }, [session, anchorStillThere]);

  const anchorFace = useMemo(() => {
    if (!session) return null;
    if (session.direction === "item") {
      const item = items.find((row) => Number(row?.id) === session.anchorId);
      return item ? itemFace(item) : null;
    }
    const want = wants.find((row) => Number(row?.id) === session.anchorId);
    return want
      ? wantFace(want, changedWantIds.has(Number(want.id)))
      : null;
  }, [session, items, wants, changedWantIds]);

  const nextAnchorId = useMemo(() => {
    if (!session) return null;
    const at = anchors.findIndex((row) => row.id === session.anchorId);
    for (let i = at + 1; i < anchors.length; i += 1) {
      const row = anchors[i];
      if (row.disabled) continue;
      const size = buildDeck({
        direction: session.direction,
        anchorId: row.id,
        wants,
        items,
        matchValues,
        changes,
        onlyMissing,
        changedIds: changedWantIds,
      }).length;
      if (size > 0) return row.id;
    }
    return null;
  }, [session, anchors, wants, items, matchValues, changes, onlyMissing, changedWantIds]);

  const card = session ? session.cards[session.index] || null : null;
  const total = session?.cards.length || 0;
  const yesCount = session
    ? countYes(session.cards, matchValues, changes)
    : 0;

  const emptyReason = useMemo(() => {
    if (!session || total > 0) return null;
    if (session.direction === "want") {
      const want = wants.find((row) => Number(row?.id) === session.anchorId);
      if (want && isEmptyWantGroup(want)) return "tag" as const;
    }
    if (onlyMissing) {
      const full = buildDeck({
        direction: session.direction,
        anchorId: session.anchorId,
        wants,
        items,
        matchValues,
        changes,
        onlyMissing: false,
        changedIds: changedWantIds,
      });
      if (full.length > 0) return "missing" as const;
    }
    return "none" as const;
  }, [session, total, wants, items, onlyMissing, matchValues, changes, changedWantIds]);

  return {
    ready: isLoadedWants,
    canEdit: Boolean(canI?.want),
    hasWants: wants.length > 0,
    hasItems: items.length > 0,
    direction,
    setDirection,
    onlyMissing,
    setOnlyMissing,
    anchors,
    session: session && anchorFace
      ? {
          anchor: anchorFace,
          promptId:
            session.direction === "item"
              ? ("swipe.prompt.item" as const)
              : ("swipe.prompt.want" as const),
          card,
          index: session.index,
          total,
          yesCount,
          canUndo: session.history.length > 0,
          done: total > 0 && session.index >= total,
          nextId: nextAnchorId,
          emptyReason,
        }
      : null,
    start,
    exit,
    swipe,
    undo,
    step,
  };
};

export default useSwipe;
