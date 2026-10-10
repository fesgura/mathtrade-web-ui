import clsx from "clsx";
import { useContext } from "react";
import { ItemContext } from "@/context/item";
import UserBox from "@/components/userBox";
import ItemCommentTitle from "@/components/item-comments/title";
import WantButton from "@/components/want-button";
import ElementMD from "./element";
import ItemGridHeader from "../item-grid-header";
import I18N from "@/i18n";
import { useSelectableCard } from "@/components/ban/bulk/useBulkSelect";
import { itemDisabledReason } from "@/components/ban/bulk/itemDisabledReason";

type ItemMDProps = {
  onToggleExpanse: () => void;
};

const ItemMD = ({ onToggleExpanse }: ItemMDProps) => {
  const { item, showAsIgnored } = useContext(ItemContext);

  const { id, ban_id, isCombo, elements, user, commentsCount, isOwned, staff_observation: staffObservation } = item;

  /* BULK SELECT: while selecting, a click on the card toggles it. */
  const { selecting, toggleCard } = useSelectableCard(
    id,
    itemDisabledReason({ isOwned, ban_id, showAsIgnored })
  );
  const onCardClick = selecting ? toggleCard : onToggleExpanse;

  return (
    <div
      className={clsx("flex flex-col h-full min-w-0 max-w-full overflow-x-hidden transition-opacity", {
        "opacity-30 pointer-events-none": showAsIgnored,
        "shadow-[0_0_0_7px_rgba(255,0,0,1)]": ban_id,
      })}
    >
      {/* A combo keeps its header above the cards it bundles; a single
          element gets it inside the content column instead, so the cover
          reaches the card's top-left corner. */}
      {isCombo ? (
        <div className="px-3 pt-2 pb-1">
          <ItemGridHeader atCardTop />
        </div>
      ) : null}
      {isOwned && staffObservation ? (
        <div className="mx-3 mt-2 min-w-0 max-w-full rounded border border-amber-300 bg-amber-50 px-2 py-1.5 text-[11px] leading-snug text-amber-950 break-words">
          <span className="font-semibold">
            <I18N id="myOffer.staffObservation.title" />
          </span>
          {": "}
          <I18N id="myOffer.staffObservation.corrida" />
        </div>
      ) : null}

      <div
        className={clsx("flex flex-col grow", {
          "gap-2 px-3 mb-3": isCombo,
        })}
      >
        {elements.map((element: { id: number | string }, k: number) => {
          if (k >= 4) {
            return null;
          }
          return (
            <ElementMD
              key={element.id}
              element={element}
              isCombo={isCombo}
              onToggleExpanse={onCardClick}
              header={
                isCombo || k > 0 ? null : <ItemGridHeader className="w-full" />
              }
            />
          );
        })}
        {elements.length >= 4 ? (
          <div className="text-center">
            <button
              className="text-primary font-bold text-xs underline hover:text-sky-700"
              onClick={onToggleExpanse}
            >
              <I18N id="item.xElementsTotal" values={[elements.length]} />
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-2 min-w-0">
        {commentsCount ? (
          <div className="text-[11px] font-bold text-gray-600 leading-tight min-w-0 truncate">
            <ItemCommentTitle />
          </div>
        ) : (
          <div className="min-w-0" />
        )}
        <div className="min-w-0 max-w-[55%] shrink">
          <UserBox userForce={user} />
        </div>
      </div>

      {ban_id ? null : (
        <div className="px-4 pb-3.5 pt-3 border-t border-black/5">
          <WantButton contextSize="md" />
        </div>
      )}
    </div>
  );
};

export default ItemMD;
