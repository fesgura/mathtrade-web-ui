"use client";
import { createContext, useMemo, useState, useContext } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import { GameContext } from "@/context/game";
import { TagContext } from "@/context/tag";

export const WantGroupContext = createContext({
  contextType: "item",
  wantGroup: null,
  groupWantList: {},
  setGroupWantList: () => {},
  itemsOfferList: {},
  setItemsOfferList: () => {},
  dup_protection: true,
  setDup_protection: () => {},
  ownList: {},
  setOwnList: () => {},
  isOwner: false,
});

// contextType = item, game, tag
export const WantGroupContextProvider = ({ contextType, children }) => {
  /* PAGE CONTEXT **********************************************/
  const { userId /*, myItemsInMT_forWants*/ } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* ITEM CONTEXT **********************************************/
  const { item, wantGroup: wantGroupItem } = useContext(ItemContext);
  /* end ITEM CONTEXT */

  /* GAME CONTEXT **********************************************/
  const { game, wantGroup: wantGroupGame } = useContext(GameContext);
  /* end GAME CONTEXT */

  /* TAG CONTEXT **********************************************/

  const { tag, wantGroup: wantGroupTag } = useContext(TagContext);
  /* end TAG CONTEXT */

  /* Want Group **********************************************/
  const wantGroup = useMemo(() => {
    return wantGroupItem || wantGroupGame || wantGroupTag || null;
  }, [wantGroupItem, wantGroupGame, wantGroupTag]);
  /* end Want Group **********************************************/

  /* groupWantList ****************/
  const [groupWantList, setGroupWantList] = useState({});
  /* end groupWantList ****************/

  /* itemsOfferList ****************/
  const [itemsOfferList, setItemsOfferList] = useState({});
  /* end itemsOfferList ****************/

  /* dup_protection ****************/
  const [dup_protection, setDup_protection] = useState(true);
  /* end dup_protection ****************/

  /* ownList ****************/
  const [ownList, setOwnList] = useState({});
  /* end ownList ****************/

  const isOwner = useMemo(() => {
    if (item?.id) {
      return item.isOwned;
    }

    if (game?.bgg_id && game.items.length) {
      let ownItems = 0;

      game.items.forEach((itm) => {
        if (itm?.user?.id === userId) {
          ownItems += 1;
        }
      });

      if (ownItems === game.items.length) {
        return true;
      }
    }

    return false;
  }, [item, game, userId]);

  const isSameBGGId = useMemo(() => {
    // let isFoundedBGGId = false;

    // let bggIdList = [];
    // if (contextType === "game") {
    //   bggIdList = [`${game?.bgg_id}`];
    // }

    // if (contextType === "item") {
    //   item?.elements.forEach(({ element }) => {
    //     const bggId = `${element?.game?.bgg_id}`;
    //     bggIdList.push(bggId);
    //   });
    // }

    // if (contextType === "tag") {
    //   tag?.itemsComplete?.forEach(({ elements }) => {
    //     elements.forEach(({ bgg_id }) => {
    //       bggIdList.push(`${bgg_id}`);
    //     });
    //   });
    // }

    // myItemsInMT_forWants.forEach(({ elements }) => {
    //   elements.forEach(({ element }) => {
    //     const bggId = `${element?.game?.bgg_id}`;
    //     if (bggIdList.includes(bggId)) {
    //       isFoundedBGGId = true;
    //     }
    //   });
    // });

    switch (contextType) {
      case "game":
        return game?.isSameBGGId;
      case "item":
        return item?.isSameBGGId;
      // case "tag":
      //   return tag?.isSameBGGId;
      default:
        return false;
    }

    // return isFoundedBGGId;
  }, [contextType, game, item]);

  return (
    <WantGroupContext.Provider
      value={{
        contextType,
        wantGroup,
        groupWantList,
        setGroupWantList,
        itemsOfferList,
        setItemsOfferList,
        dup_protection,
        setDup_protection,
        ownList,
        setOwnList,
        isOwner,
        isSameBGGId,
      }}
    >
      {children}
    </WantGroupContext.Provider>
  );
};
