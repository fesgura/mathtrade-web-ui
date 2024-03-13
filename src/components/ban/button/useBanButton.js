import { useCallback, useContext, useMemo } from "react";
import { ItemContext } from "@/context/item";
import { GameContext } from "@/context/game";
import useFetch from "@/hooks/useFetch";

const useBanButton = (type) => {
  /* ITEM CONTEXT **********************************************/
  const {
    item,
    showAsIgnored: showAsIgnoredItem,
    setShowAsIgnored: setShowAsIgnoredItem,
  } = useContext(ItemContext);
  /* end ITEM CONTEXT */

  /* GAME CONTEXT **********************************************/
  const {
    game,
    showAsIgnored: showAsIgnoredGame,
    setShowAsIgnored: setShowAsIgnoredItemGame,
  } = useContext(GameContext);
  /* end GAME CONTEXT */

  /* BAN ID **********************************************/
  const ban_id = useMemo(() => {
    return item?.ban_id || game?.ban_id || null;
  }, [item, game]);
  /* end BAN ID **********************************************/

  /* POST BAN  **********************************************/
  const afterLoadBan = useCallback(() => {
    if (type === "item") {
      setShowAsIgnoredItem(true);
    }
    if (type === "game") {
      setShowAsIgnoredItemGame(true);
    }
  }, [type, setShowAsIgnoredItem, setShowAsIgnoredItemGame]);

  const [banElement, , loadingBanElement] = useFetch({
    endpoint: "POST_BAN",
    method: "POST",
    afterLoad: afterLoadBan,
  });
  /* end POST BAN  **********************************************/

  /* DELETE (UNBAN)  **********************************************/

  const [unbanElement, , loadingUnBanElement] = useFetch({
    endpoint: "DELETE_BAN",
    method: "DELETE",
    afterLoad: afterLoadBan,
  });
  /* end DELETE (UNBAN)  **********************************************/

  const onClick = useCallback(
    (e) => {
      e.preventDefault();

      if (ban_id) {
        unbanElement({ urlParams: [ban_id] });
      } else {
        let params = {};

        if (type === "item") {
          params = { type: "I", identity: item?.id };
        }
        if (type === "game") {
          params = { type: "G", identity: game?.bgg_id };
        }
        banElement({ params });
      }
    },
    [item, game, type, banElement, unbanElement, ban_id]
  );

  return {
    showAsIgnored: showAsIgnoredItem || showAsIgnoredGame,
    onClick,
    loading: loadingBanElement || loadingUnBanElement,
    ban_id,
  };
};

export default useBanButton;
