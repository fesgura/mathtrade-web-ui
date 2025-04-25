import { useContext } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import ElementMyItem from "@/components/element/elementMyItem";
import HeaderItem from "./item-header";
import AddElementToMyItem from "../addElement";
import clsx from "clsx";
import I18N from "@/i18n";

const ItemUI = () => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT **********************************************/

  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { id, elements, isCombo } = item;
  /* end ITEM CONTEXT **********************************************/

  return (
    <article
      className={clsx(
        "relative h-full rounded-md shadow-[0_1px_8px_rgba(0,0,0,0.3)] mb-6 p-3 border",
        {
          "bg-item-200 border-item-300": !isCombo,
          "bg-item-300 border-item-400": isCombo,
        }
      )}
    >
      {elements.length ? <HeaderItem /> : null}
      <div className="flex flex-col gap-3">
        {elements.length ? (
          elements.map((element) => {
            return <ElementMyItem key={element.id} element={element} />;
          })
        ) : (
          <div className="text-center p-3 text-balance text-red-800">
            <I18N id="error.item.offer.notFound" />
            <br /> <strong>Item Id: {id}</strong>
          </div>
        )}
        {canI.offer && elements.length ? <AddElementToMyItem /> : null}
      </div>
    </article>
  );
};
export default ItemUI;
