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
import useFetch from "@/hooks/useFetch";
import clsx from "clsx";
import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import ErrorAlert from "@/components/errorAlert";
import Modal from "@/components/modal";
import HelpContext from "@/components/help-context";

const BtnQuickAdd = () => {
  /* PAGE CONTEXT **********************************************/
  const {
    loadingMyWants,
    setMyWants,
    setNewMyWantsNum,
    setWantsNumPosition,
    canI,
    setMustConfirm,
    userId,
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

  const buttonRef = useRef(null);

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
      want_ids = game.items
        .filter(({ user }) => {
          if (user && user.id) {
            return user.id !== userId;
          }
          return true;
        })
        .map((itm) => {
          return itm.id;
        });
    }

    if (item && item.id) {
      want_ids = [item.id];
    }

    const params = {
      name: item?.title || game?.title || tag?.name || "",
      bgg_id: game?.notGame ? null : game?.bgg_id || null,
      want_ids,
      item_ids: [],
      dup_protection: true,
    };

    if (tag && tag.id) {
      params.tag = parseInt(tag.id, 10);
      params.want_ids = tag.items;
    }

    postMyWant({ params });
  }, [item, game, tag, postMyWant, userId]);

  const [modalOpen, setModalOpen] = useState(false);

  if (!canI.want) {
    return (
      <div className="text-center">
        <button
          className="rounded-full outline-none transition-colors inline-block w-auto px-7 py-3 text-lg shadow-md bg-gray-500 text-white opacity-30 cursor-not-allowed"
          disabled
          ref={buttonRef}
        >
          <InnerButton>
            <Icon type="heart" />
            <I18N id="btn.Want.Iwant" />
          </InnerButton>
        </button>
        <div className="w-fit mx-auto pt-2">
          <HelpContext id="whyCantWant" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center">
        <button
          className={clsx(
            "rounded-full outline-none transition-colors inline-block w-auto px-7 py-3 text-lg shadow-md",
            {
              "bg-want text-white": !loadingMyWants,
              "bg-gray-500 text-white": loadingMyWants,
              "hover:opacity-75": !loadingMyWants && !loading,
              "opacity-50": loadingMyWants || loading,
            }
          )}
          disabled={loadingMyWants || loading}
          onClick={
            inOtherGroups
              ? () => {
                  setModalOpen(true);
                }
              : postWant
          }
          ref={buttonRef}
        >
          <InnerButton>
            <Icon type={loadingMyWants || loading ? "loading" : "heart"} />
            <I18N id={`btn.Want.${loadingMyWants ? "Loading" : "Iwant"}`} />
          </InnerButton>
        </button>
        <ErrorAlert error={error} className="mt-2" />
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        size="sm"
      >
        <div className="text-center pt-3">
          <p className="mb-4 text-red-500 text-sm">
            <I18N id="wantEditor.IsItemInOther.item" />
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              className="rounded-full outline-none transition-colors inline-block w-auto px-7 py-3 text-lg shadow-xs border border-gray-300 text-gray-500 hover:opacity-75"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <InnerButton>
                <I18N id="btn.Cancel" />
              </InnerButton>
            </button>
            <button
              className="rounded-full outline-none transition-colors inline-block w-auto px-7 py-3 text-lg shadow-md bg-want text-white hover:opacity-75"
              onClick={() => {
                setModalOpen(false);
                postWant();
              }}
            >
              <InnerButton>
                <Icon type="heart" />
                <I18N id="btn.Want.Iwant" />
              </InnerButton>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BtnQuickAdd;
