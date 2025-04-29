import { useContext, useEffect } from "react";
import { GameContext } from "@/context/game";
import { PageContext } from "@/context/page";
import { WantGroupContext } from "@/context/wantGroup";

const useGameList = () => {
  /* PAGE CONTEXT **********************************************/
  const { userId } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* GAME CONTEXT **********************************************/
  const { game } = useContext(GameContext);
  const { items, itemCount } = game;
  /* end GAME CONTEXT */

  /* WANTGROUP CONTEXT **********************************************/
  const { wantGroup, setGroupWantList, setOwnList } =
    useContext(WantGroupContext);
  /* end WANTGROUP CONTEXT **********************************************/

  useEffect(() => {
    const newGroupWantList = {};
    const newOwnList = {};

    if (wantGroup) {
      const wantIds = wantGroup?.wants.map(({ id }) => {
        return id;
      });

      items.forEach((itm) => {
        if (itm?.membership?.id === userId) {
          newGroupWantList[itm?.id || "_"] = false;
          newOwnList[itm?.id || "_"] = true;
        } else {
          newGroupWantList[itm.id || "_"] = wantIds.indexOf(itm.id) >= 0;
        }
      });
    } else {
      items.forEach((itm) => {
        if (itm?.membership?.id === userId) {
          newGroupWantList[itm?.id || "_"] = false;
          newOwnList[itm?.id || "_"] = true;
        } else {
          newGroupWantList[itm?.id || "_"] = true;
        }
      });
    }

    setGroupWantList(newGroupWantList);
    setOwnList(newOwnList);
  }, [items, userId, setOwnList, wantGroup, setGroupWantList]);

  return { items, itemCount };
};

export default useGameList;
