import { useEffect, useContext, useCallback, useMemo, useState } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import { colorTagStyles } from "@/utils/color";
import useFetch from "@/hooks/useFetch";

const useTag = (wantGroup) => {
  /* PAGE CONTEXT **********************************************/
  const { setMyWants, canI, setMustConfirm } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* MY WANTS CONTEXT **********************************************/
  const { setAcceptChecksCommit } = useContext(MyWantsContext);
  /* end MY WANTS CONTEXT */

  const { title, colorStyle, items, itemIds, value } = useMemo(() => {
    const { name: title, tag, wants: items, value } = wantGroup;
    return {
      title,
      colorStyle: colorTagStyles(tag?.color),
      items,
      itemIds: items.map(({ id }) => id),
      value,
    };
  }, [wantGroup]);

  const [dup_protection, setDup_protection] = useState(true);
  const [itemIdsSelected, setItemIdsSelected] = useState({});

  useEffect(() => {
    if (wantGroup) {
      const { wants: items, dup_protection: new_dup_protection } = wantGroup;
      setDup_protection(new_dup_protection);
      //
      const newItemIdsSelected = items.reduce((obj, { id }) => {
        obj[id] = true;
        return obj;
      }, {});
      setItemIdsSelected(newItemIdsSelected);
    }
  }, [wantGroup]);

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
      setMustConfirm(true);
      setShowSuccessAlert(true);
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
    const want_ids = Object.entries(itemIdsSelected)
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
        name: wantGroup?.name || "",
        bgg_id: null,
        want_ids,
        item_ids: wantGroup.items,
        dup_protection,
        tag: parseInt(wantGroup?.tag?.id || 0, 10),
      };

      putMyWant({ params });
    }
  }, [putMyWant, dup_protection, itemIdsSelected, wantGroup]);

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
    title,
    colorStyle,
    items,
    itemIds,
    value,
    //
    dup_protection,
    setDup_protection,
    itemIdsSelected,
    setItemIdsSelected,
    //
    putWant,
    notSelectedGame,
    showSuccessAlert,
    loading,
    error,
    //
    onChangeValue,
    //
    canIwant: canI.want,
  };
};

export default useTag;
