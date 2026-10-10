import clsx from "clsx";
import { useContext } from "react";
import { ItemContext } from "@/context/item";
import {
  useSelectableCard,
  selectedCardClass,
} from "@/components/ban/bulk/useBulkSelect";
import { itemDisabledReason } from "@/components/ban/bulk/itemDisabledReason";
import useItemGrid from "./useItemGrid";
import ItemMD from "./md";
import ItemXL from "./xl";
import {
  resolveCardKind,
  cardKindBorderClass,
  cardSurfaceClass,
} from "@/components/badgeType/cardKind";

type ItemGridUIProps = {
  expanded: string | number | null;
  setExpanded: (id: string | number | null) => void;
};

const ItemGridUI = ({ expanded, setExpanded }: ItemGridUIProps) => {
  const { itemNode, isExpanded, isCombo, typeNum, onToggleExpanse } =
    useItemGrid(expanded, setExpanded);
  // The selected highlight goes here, not on the md/xl root: this surface
  // clips (overflow-x-hidden), so a ring on the inner root would be cut.
  const { item, showAsIgnored } = useContext(ItemContext);
  const { isSelected } = useSelectableCard(
    item?.id,
    itemDisabledReason({ ...(item || {}), showAsIgnored })
  );

  const cardKind = resolveCardKind({
    isCombo,
    isTrueNotGame: !isCombo && typeNum === 3,
    isExpansion: !isCombo && typeNum === 2,
  });

  return (
    <article
      className={clsx("transition-[padding_0.2s]", {
        "col-span-full  pt-[100px]": isExpanded,
      })}
      ref={itemNode as React.RefObject<HTMLElement>}
      data-tour-item=""
    >
      <div
        className={clsx(
          "transition-all relative mx-auto rounded-lg",
          cardSurfaceClass,
          cardKindBorderClass(cardKind),
          {
            // Capped like the game card: a single-column viewport, or a list
            // with fewer items than the grid has tracks, should not blow one
            // card up to the full width of the page.
            "w-full h-full sm:max-w-[420px] shadow-md hover:shadow-[0_3px_16px_rgba(0,0,0,0.25)]":
              !isExpanded,
            "shadow-xl w-full duration-700 max-w-5xl": isExpanded,
          },
          isSelected && selectedCardClass
        )}
      >
        {!isExpanded ? (
          <ItemMD onToggleExpanse={onToggleExpanse} />
        ) : (
          <ItemXL onToggleExpanse={onToggleExpanse} />
        )}
      </div>
    </article>
  );
};
export default ItemGridUI;
