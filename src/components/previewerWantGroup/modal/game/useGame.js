import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import { GameContext } from "@/context/game";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import useFetch from "@/hooks/useFetch";

const useGame = (wantGroup) => {
  /* PAGE CONTEXT **********************************************/
  const { userId, setMyWants, canI, setMustConfirm } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* MY WANTS CONTEXT **********************************************/
  const { setAcceptChecksCommit } = useContext(MyWantsContext);
  /* end MY WANTS CONTEXT */

  /* GAME CONTEXT **********************************************/
  const { game, gameRaw } = useContext(GameContext);
  const { title, titleLink, type, typeNum, thumbnail, items, itemCount } = game;
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

  /***************************************************************/

  const [notSelectedGame, setNotSelectedGame] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    let timer = null;
    if (showSuccessAlert) {
      timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showSuccessAlert]);

  /* PUT *************************************/
  const afterLoad = useCallback(
    (updatedWant) => {
      setShowSuccessAlert(true);
      setMustConfirm(true);
      setAcceptChecksCommit({
        accept_1: false,
        accept_2: false,
      });
      setMyWants((oldMyWants) => {
        const oldMyWantsCopy = [...oldMyWants];
        const index = oldMyWantsCopy.findIndex((w) => w.id === updatedWant.id);
        if (oldMyWantsCopy[index]) {
          oldMyWantsCopy[index] = { ...updatedWant };
        }
        return oldMyWantsCopy;
      });
    },
    [setMyWants, setMustConfirm, setAcceptChecksCommit]
  );

  const urlParams = useMemo(() => {
    return wantGroup ? [wantGroup.id] : ["0"];
  }, [wantGroup]);

  const [putMyWant, , loading, error] = useFetch({
    endpoint: "PUT_MYWANTS",
    urlParams,
    method: "PUT",
    afterLoad,
  });
  /* end PUT *************************************/

  const putWant = useCallback(() => {
    const want_ids = Object.entries(groupWantList)
      .filter((ent) => {
        return ent[1];
      })
      .map(([key]) => {
        return key;
      });

    if (!want_ids.length) {
      setNotSelectedGame(true);
    } else {
      setNotSelectedGame(false);
      const params = {
        name: game?.title || "",
        bgg_id: game?.bgg_id || null,
        want_ids,
        item_ids: wantGroup.items,
        dup_protection: true,
      };

      putMyWant({ params });
    }
  }, [game, putMyWant, groupWantList, wantGroup]);

  /***************************************************************/

  const onChangeValue = useCallback(
    (newValue) => {
      setMyWants((oldMyWants) => {
        const oldMyWantsCopy = [...oldMyWants];
        const index = oldMyWantsCopy.findIndex((w) => w.id === wantGroup.id);
        if (oldMyWantsCopy[index]) {
          oldMyWantsCopy[index].value = newValue;
        }
        return oldMyWantsCopy;
      });
    },
    [setMyWants, wantGroup]
  );

  return {
    gameRaw,
    title,
    titleLink,
    type,
    typeNum,
    thumbnail,
    items,
    itemCount,
    //
    groupWantList,
    setGroupWantList,
    ownList,
    //
    showSuccessAlert,
    notSelectedGame,
    putWant,
    loading,
    error,
    //
    onChangeValue,
    //
    canIwant: canI.want,
  };
};

export default useGame;
