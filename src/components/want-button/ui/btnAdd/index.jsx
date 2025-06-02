import {
  useCallback,
  useState,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
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
import ErrorAlert from "@/components/errorAlert";

const BtnAdd = () => {
  /* PAGE CONTEXT **********************************************/
  const {
    loadingMyWants,
    setMyWants,
    setNewMyWantsNum,
    setWantsNumPosition,
    canI,
    setMustConfirm,
  } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* ITEM CONTEXT **********************************************/
  const { item, otherWantGroups } = useContext(ItemContext);

  const inOtherGroups = useMemo(() => {
    return otherWantGroups && otherWantGroups.length > 0;
  }, [otherWantGroups]);
  /* end ITEM CONTEXT */

  /* GAME CONTEXT **********************************************/
  const { game } = useContext(GameContext);
  /* end GAME CONTEXT */

  /* TAG CONTEXT **********************************************/
  const { tag } = useContext(TagContext);
  /* end TAG CONTEXT */

  /* WANTGROUP CONTEXT **********************************************/
  const { groupWantList, itemsOfferList, dup_protection } =
    useContext(WantGroupContext);
  /* end WANTGROUP CONTEXT */

  const buttonRef = useRef(null);

  const [notSelectedGame, setNotSelectedGame] = useState(false);

  /* POST *************************************/

  const afterLoad = useCallback(
    (newWant) => {
      setMustConfirm(true);
      setMyWants((oldMyWants) => {
        const oldMyWantsCopy = [...oldMyWants];
        oldMyWantsCopy.push({ ...newWant, isNewHot: true });
        return oldMyWantsCopy;
      });

      const rect = buttonRef.current?.getBoundingClientRect() || {
        x: 0,
        y: 0,
        width: 10,
        height: 10,
      };

      const { x, y, width, height } = rect;

      const xPos = Math.round(x + 0.5 * width - 8);
      const yPos = Math.round(y + 0.5 * height - 8);

      setWantsNumPosition({ xPos, yPos });

      setTimeout(() => {
        setNewMyWantsNum((n) => {
          return n + 1;
        });
      }, 750);
    },
    [setMyWants, setNewMyWantsNum, setWantsNumPosition, setMustConfirm]
  );

  const [postMyWant, , loading, error] = useFetch({
    endpoint: "POST_MYWANTS",
    method: "POST",
    afterLoad,
  });

  /* end POST *************************************/

  const postWant = useCallback(() => {
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

    postMyWant({ params });
  }, [
    item,
    game,
    tag,
    postMyWant,
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
            <I18N id="btn.Want.Iwant" />
          </InnerButton>
        </button>
      </div>
    );
  }

  return (
    <div className="text-center p-5 pb-9">
      <ErrorAlert error={error} />
      {inOtherGroups ? (
        <div className="text-sm mb-3 text-red-500">
          <I18N id="wantEditor.IsItemInOther.item" />
        </div>
      ) : null}
      {notSelectedGame ? (
        <div className="text-center mb-3 text-red-500">
          <I18N id="want.notSelectedGame" />
        </div>
      ) : null}
      <button
        className={clsx(
          "rounded-full outline-none transition-colors inline-block w-auto px-7 py-3 text-xl shadow-md",
          {
            "bg-want text-white": !loadingMyWants,
            "bg-gray-500 text-white": loadingMyWants,
            "hover:opacity-75": !loadingMyWants && !loading,
            "opacity-50": loadingMyWants || loading,
          }
        )}
        disabled={loadingMyWants || loading}
        onClick={postWant}
        ref={buttonRef}
      >
        <InnerButton>
          <Icon type={loadingMyWants || loading ? "loading" : "heart"} />
          <I18N id={`btn.Want.${loadingMyWants ? "Loading" : "Iwant"}`} />
        </InnerButton>
      </button>
    </div>
  );
};

export default BtnAdd;
