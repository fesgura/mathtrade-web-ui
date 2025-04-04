import { useContext } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import ElementMyItem from "@/components/element/elementMyItem";
import HeaderItem from "./item-header";
import AddElementToMyItem from "../addElement";

const ItemUI = () => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT **********************************************/

  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { elements } = item;
  /* end ITEM CONTEXT **********************************************/

  return (
    <article className="relative h-full bg-item-200 rounded-md shadow-[0_1px_8px_rgba(0,0,0,0.3)] mb-6 p-3 border border-item-300">
      <HeaderItem />
      <div className="flex flex-col gap-3">
        {elements.map((element) => {
          return <ElementMyItem key={element.id} element={element} />;
        })}
        {canI.offer ? <AddElementToMyItem /> : null}
      </div>
    </article>
  );
};
export default ItemUI;
