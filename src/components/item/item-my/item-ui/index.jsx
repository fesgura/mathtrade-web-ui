import { useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import I18N from "@/i18n";
import Value from "@/components/value";
import ElementMy from "./element";
import NewElement from "./element/new";
import AddToMTtoggle from "./addToMTtoggle";
import clsx from "clsx";
import ItemComments from "@/components/item-comments";
import MyGroupsInItem from "@/components/item-mygroups/header-groups";

const ItemUI = () => {
  /* PAGE CONTEXT **********************************************/
  const { /*pageType,*/ myItemsInMT, canI } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { id, isCombo, elements } = item;
  /* end ITEM CONTEXT **********************************************/

  /* IS ITEM IN MT? **********************************************/
  const isInMT = useMemo(() => {
    let isItemInMTarray = myItemsInMT.filter((myItemInMT) => {
      return myItemInMT.id === id;
    });

    return isItemInMTarray.length > 0;
  }, [myItemsInMT, id]);
  /* end IS ITEM IN MT? **********************************************/

  return (
    <article
      className={clsx(
        "relative h-full flex flex-col justify-between bg-white shadow-md mb-6 border-2",
        {
          "border-transparent": !isInMT,
          "border-purple-600": isInMT,
        }
      )}
    >
      <div className="lg:p-4 p-2">
        {isCombo ? (
          <div className="flex items-center gap-3 pb-3">
            <h3 className="uppercase text-sm font-bold text-gray-900 ">
              <I18N id="element-type-badge-0" />
            </h3>
            <div>
              <Value size="xl" type="item" />
            </div>
            <MyGroupsInItem className="border-l border-gray-400 pl-3" />
          </div>
        ) : null}
        {elements.map((element) => {
          return (
            <ElementMy
              key={element.id}
              element={element}
              isEditable={!(isInMT && !canI.offer)}
            />
          );
        })}
        <ItemComments className="py-2" />
        {isInMT && !canI.offer ? null : (
          <div className="border-t border-gray-300 pt-4">
            <NewElement />
          </div>
        )}
      </div>
      <AddToMTtoggle isInMT={isInMT} />
    </article>
  );
};
export default ItemUI;
