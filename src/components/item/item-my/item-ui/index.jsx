import { useContext, lazy } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import ElementMyItem from "@/components/element/elementMyItem";
import HeaderItem from "./item-header";
import Dynamic from "@/components/dynamic";
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
      <HeaderItem />
      <div className="flex flex-col gap-3">
        {elements.map((element) => {
          return <ElementMyItem key={element.id} element={element} />;
        })}
        {canI.offer && elements.length ? (
          <Dynamic h={100}>
            <AddElementToMyItem />
          </Dynamic>
        ) : null}
      </div>
    </article>
  );
};
export default ItemUI;
