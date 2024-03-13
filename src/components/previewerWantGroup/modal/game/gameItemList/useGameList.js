import { useCallback, useContext, useEffect, useState } from "react";
import { GameContext } from "@/context/game";
import { PageContext } from "@/context/page";

const useGameList = (wantGroup) => {
  /* PAGE CONTEXT **********************************************/
  const { userId } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* GAME CONTEXT **********************************************/
  const { game } = useContext(GameContext);
  const { items, itemCount } = game;
  /* end GAME CONTEXT */

  const [groupWantList, setGroupWantList] = useState({});
  const [ownList, setOwnList] = useState({});

  /***************************** */

  useEffect(() => {
    const newGroupWantList = {};
    const newOwnList = {};

    if (wantGroup) {
      const wantIds = wantGroup?.wants.map(({ id }) => {
        return id;
      });

      items.forEach((itm) => {
        if (itm?.user?.id === userId) {
          newGroupWantList[itm?.id || "_"] = false;
          newOwnList[itm?.id || "_"] = true;
        } else {
          newGroupWantList[itm.id || "_"] = wantIds.indexOf(itm.id) >= 0;
        }
      });
    } else {
      items.forEach((itm) => {
        if (itm?.user?.id === userId) {
          newGroupWantList[itm?.id || "_"] = false;
          newOwnList[itm?.id || "_"] = true;
        } else {
          newGroupWantList[itm?.id || "_"] = true;
        }
      });
    }

    setGroupWantList(newGroupWantList);
    setOwnList(newOwnList);
  }, [items, userId, wantGroup]);

  return { items, itemCount, groupWantList, setGroupWantList, ownList };
};

export default useGameList;
