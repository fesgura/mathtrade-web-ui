import { ItemContext, ItemContextProvider } from "@/context/item";
import { useContext } from "react";
import ElementComplete from "@/components/element/elementComplete";
import I18N from "@/i18n";
import UserBox from "@/components/userBox";
import Icon from "@/components/icon";
import clsx from "clsx";

const ItemUI = ({ received, onOpenReceived, idResult }) => {
  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { elements, isCombo, title } = item;
  /* end ITEM CONTEXT */

  return (
    <article
      className={clsx(
        "transition-all relative mx-auto border shadow-xl w-full rounded-xl",
        {
          "bg-item-200 border-item-400": !isCombo,
          "bg-item-300 border-item-500": isCombo,
        }
      )}
    >
      <div className="flex flex-col gap-3 p-3">
        {elements.map((element) => {
          return <ElementComplete key={element.id} element={element} />;
        })}
      </div>
      <div className="flex justify-between bg-item-100 rounded-b-[0.7em] p-3 border-t border-item-300">
        <UserBox toLeft />

        <div className="w-[220px] sm:flex justify-end text-sm font-bold sm:pl-2">
          {received ? (
            <div className="flex gap-1 items-center py-1 px-3 rounded-md text-green-700 border border-green-500 bg-green-500/10">
              <Icon type="check" />
              <I18N id="received.already" />
            </div>
          ) : (
            <button
              className="flex gap-1 items-center py-1 px-3 rounded-md  bg-green-600 text-white transition-colors hover:bg-sky-800"
              onClick={() => {
                onOpenReceived({ title, idResult });
              }}
            >
              <Icon type="check" />
              <I18N id="received.btn" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

const Item = ({ itemRaw, received, onOpenReceived, idResult }) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemUI
        received={received}
        onOpenReceived={onOpenReceived}
        idResult={idResult}
      />
    </ItemContextProvider>
  );
};

export default Item;
