import { useContext, lazy } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import ElementMyItem from "@/components/element/elementMyItem";
import HeaderItem from "./item-header";
import Dynamic from "@/components/dynamic";
import { cardKindBorderClass } from "@/components/badgeType/cardKind";
import clsx from "clsx";

const AddElementToMyItem = lazy(() => import("../addElement"));

const ItemUI = () => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT **********************************************/

  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { id, elements, isCombo } = item;
  /* end ITEM CONTEXT **********************************************/

  // A combo bundles several elements into one item, so it still needs a
  // container showing they travel together — it uses the design system's combo
  // treatment (left accent + violet tint) instead of the beige it had, which
  // was not part of the card language anywhere else. A single element is a card
  // on its own, so the item around it is nothing but vertical spacing, and its
  // controls move inside the card.
  const headerOutside = isCombo || !elements.length;

  const showsAddElement = canI.offer && elements.length > 0;

  // A lone element that can still become a combo shows the "add another
  // article" button right below its card — that button has no card of its
  // own, so without a shared container it reads as floating, unrelated
  // content. A plain border (not the combo's colored one, it isn't a combo
  // yet) groups the two visually the same way the combo case already does.
  const showsAsPlainCard = !isCombo && showsAddElement && elements.length === 1;

  return (
    <article
      className={clsx(
        "relative mb-6",
        isCombo
          ? clsx("rounded-lg p-3 shadow-md", cardKindBorderClass("combo"))
          : showsAsPlainCard
          ? "rounded-lg p-3 border border-stroke"
          : null
      )}
    >
      {headerOutside ? <HeaderItem /> : null}
      <div className="flex flex-col gap-3">
        {elements.map((element, k) => {
          return (
            <ElementMyItem
              key={element.id}
              element={element}
              header={
                headerOutside || k > 0 ? null : (
                  // No bottom margin: inside the card the content column
                  // already spaces its rows with a gap.
                  <HeaderItem className="w-full" />
                )
              }
            />
          );
        })}
        {showsAddElement ? (
          <Dynamic h={100}>
            <AddElementToMyItem />
          </Dynamic>
        ) : null}
      </div>
    </article>
  );
};
export default ItemUI;
