import { useCallback, useState, useContext, useEffect, useMemo } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import { GameContext } from "@/context/game";
import { TagContext } from "@/context/tag";
import { WantGroupContext } from "@/context/wantGroup";
import useFetch from "@/hooks/useFetch";
import clsx from "clsx";
import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import BtnRemove from "./btnRemove";
import SuccessAlert from "@/components/successAlert";
import ErrorAlert from "@/components/errorAlert";

const BtnEditRemove = () => {
  /* PAGE CONTEXT **********************************************/
  const { loadingMyWants, setMyWants, canI, setMustConfirm } =
    useContext(PageContext);
  /* end PAGE CONTEXT */

  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  /* end ITEM CONTEXT */

  /* GAME CONTEXT **********************************************/
  const { game } = useContext(GameContext);
  /* end GAME CONTEXT */

  /* TAG CONTEXT **********************************************/
  const { tag } = useContext(TagContext);
  /* end TAG CONTEXT */

  /* WANTGROUP CONTEXT **********************************************/
  const { wantGroup, groupWantList, itemsOfferList, dup_protection } =
    useContext(WantGroupContext);
  /* end WANTGROUP CONTEXT */

  const [notSelectedGame, setNotSelectedGame] = useState(false);

  /* Success Alert **********************************************/
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  useEffect(() => {
    let timer = null;
    if (showSuccessAlert) {
      timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 1500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showSuccessAlert]);
  /* end Success Alert **********************************************/

  /* PUT *************************************/

  const afterLoad = useCallback(
    (updatedWant) => {
      setMustConfirm(true);
      setMyWants((oldMyWants) => {
        const oldMyWantsCopy = [...oldMyWants].filter((w) => {
          return w.id !== updatedWant.id;
        });
        oldMyWantsCopy.push({ ...updatedWant, isUpdatedHot: true });
        return oldMyWantsCopy;
      });

      setShowSuccessAlert(true);
    },
    [setMyWants, setMustConfirm]
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
    let want_ids = [];

    if (game && game.items) {
      want_ids = game.items.map((itm) => {
        return itm.id;
      });
    }

    if (item && item.id) {
      want_ids = [item.id];
    } else {
      if (game) {
        want_ids = Object.entries(groupWantList)
          .filter((ent) => {
            return ent[1];
          })
          .map(([key]) => {
            return key;
          });
      }
    }
    /////////////////////////
    const item_ids = Object.entries(itemsOfferList)
      .filter((ent) => {
        return ent[1];
      })
      .map(([key]) => {
        return key;
      });
    /////////////////////////

    const params = {
      name: item?.title || game?.title || tag?.name || "",
      bgg_id: game?.notGame ? null : game?.bgg_id || null,
      want_ids,
      item_ids,
      dup_protection,
    };

    if (tag && tag.id) {
      params.tag = parseInt(tag.id, 10);
      params.want_ids = tag.items;
    }

    if (!params.want_ids.length) {
      setNotSelectedGame(true);
      return;
    }

    setNotSelectedGame(false);

    putMyWant({ params });
  }, [
    item,
    game,
    tag,
    putMyWant,
    groupWantList,
    itemsOfferList,
    dup_protection,
  ]);

  if (!canI.want) {
    return (
      <div className="text-center p-5 pb-9">
        <button
          className="rounded-full outline-none transition-colors inline-block w-auto px-7 py-3 text-xl shadow-md bg-gray-500 text-white opacity-30 cursor-not-allowed"
          disabled
        >
          <InnerButton>
            <Icon type="heart" />
            <I18N id="btn.Want.updateWant" />
          </InnerButton>
        </button>
      </div>
    );
  }

  return (
    <div className="text-center p-5 pb-9">
      {showSuccessAlert ? <SuccessAlert text="want.updated" /> : null}
      <ErrorAlert error={error} />
      <div className="w-fit mx-auto border-b pb-4 mb-2">
        {notSelectedGame ? (
          <div className="text-center mb-3 text-red-500">
            <I18N id="want.notSelectedGame" />
          </div>
        ) : null}
        <button
          className={clsx(
            "rounded-full outline-none transition-colors inline-block w-auto bg-want text-white px-7 py-3 text-xl shadow-md",
            {
              "hover:opacity-75": !loading, // !disabled
              "opacity-40": loading, // disabled
            }
          )}
          disabled={loading}
          onClick={putWant}
        >
          <InnerButton>
            <Icon type={loadingMyWants || loading ? "loading" : "heart"} />
            <I18N id="btn.Want.updateWant" />
          </InnerButton>
        </button>
      </div>
      <BtnRemove />
    </div>
  );
};

export default BtnEditRemove;
