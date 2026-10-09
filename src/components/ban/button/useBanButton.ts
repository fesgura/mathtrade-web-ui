import { useCallback, useContext, useMemo, useState } from "react";
import { ItemContext } from "@/context/item";
import { GameContext } from "@/context/game";
import { PageContext } from "@/context/page";
import { useOptions } from "@/store";
import useFetch from "@/hooks/useFetch";
import { isWantedGame } from "../isWanted";

const useBanButton = (type = "item") => {
  const { forceReloadPage, myWants } = useContext(PageContext);
  const updateFilters = useOptions((state) => state.updateFilters);

  const {
    item,
    showAsIgnored: showAsIgnoredItem,
    setShowAsIgnored: setShowAsIgnoredItem,
    setBanId: setBanIdItem,
    wantGroup,
    otherWantGroups,
    wantedViaTag,
  } = useContext(ItemContext);
  const {
    game,
    showAsIgnored: showAsIgnoredGame,
    setShowAsIgnored: setShowAsIgnoredGame,
    setBanId: setBanIdGame,
  } = useContext(GameContext);

  const ban_id = useMemo(() => {
    if (type === "item") return item?.ban_id || null;
    return game?.ban_id || null;
  }, [item, game, type]);

  const afterLoadBan = useCallback(
    (res) => {
      if (type === "item") {
        if (res?.id) setBanIdItem(res.id);
        setShowAsIgnoredItem(true);
      }
      if (type === "game") {
        if (res?.id) setBanIdGame(res.id);
        setShowAsIgnoredGame(true);
      }
      // Forces the list to refetch, the same way switching a filter chip
      // does (updateFilters always returns a new object reference) —
      // otherwise the ignored-filter views only reflect this ban after an
      // unrelated filter change.
      updateFilters({}, type);
      forceReloadPage();
    },
    [
      type,
      setBanIdItem,
      setBanIdGame,
      setShowAsIgnoredItem,
      setShowAsIgnoredGame,
      updateFilters,
      forceReloadPage,
    ]
  );

  const afterLoadUnban = useCallback(() => {
    if (type === "item") {
      setBanIdItem(null);
      setShowAsIgnoredItem(false);
    }
    if (type === "game") {
      setBanIdGame(null);
      setShowAsIgnoredGame(false);
    }
    updateFilters({}, type);
    forceReloadPage();
  }, [
    type,
    setBanIdItem,
    setBanIdGame,
    setShowAsIgnoredItem,
    setShowAsIgnoredGame,
    updateFilters,
    forceReloadPage,
  ]);

  const [banElement, , loadingBanElement] = useFetch({
    endpoint: "POST_BAN",
    method: "POST",
    afterLoad: afterLoadBan,
  });

  const [unbanElement, , loadingUnBanElement] = useFetch({
    endpoint: type === "item" ? "DELETE_BAN_ITEM" : "DELETE_BAN_GAME",
    method: "DELETE",
    afterLoad: afterLoadUnban,
  });

  // Ignoring something you want doesn't delete the want, but the export
  // skips it: warn before, so nobody ignores a wanted game by accident.
  const isWanted = useMemo(() => {
    if (type === "item") {
      return !!wantGroup || !!otherWantGroups?.length || !!wantedViaTag;
    }
    return isWantedGame(game, myWants);
  }, [type, wantGroup, otherWantGroups, wantedViaTag, game, myWants]);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const ban = useCallback(() => {
    if (type === "item") {
      banElement({ params: { type: "I", identity: item?.id } });
    }
    if (type === "game") {
      banElement({ params: { type: "G", identity: game?.bgg_id } });
    }
  }, [item, game, type, banElement]);

  const onClick = useCallback(
    (e) => {
      e.preventDefault();

      if (ban_id) {
        unbanElement({ urlParams: [ban_id] });
        return;
      }

      if (isWanted) {
        setConfirmOpen(true);
        return;
      }
      ban();
    },
    [ban, unbanElement, ban_id, isWanted]
  );

  const onConfirm = useCallback(() => {
    setConfirmOpen(false);
    ban();
  }, [ban]);

  const onCancel = useCallback(() => setConfirmOpen(false), []);

  return {
    showAsIgnored: showAsIgnoredItem || showAsIgnoredGame,
    onClick,
    loading: loadingBanElement || loadingUnBanElement,
    ban_id,
    confirmOpen,
    onConfirm,
    onCancel,
  };
};

export default useBanButton;
