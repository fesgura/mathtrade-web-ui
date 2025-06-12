import { useContext } from "react";
import { ItemContext, ItemContextProvider } from "@/context/item";
import I18N from "@/i18n";
import Element from "./element";

const ItemChangeUI = ({ received }) => {
  const { item } = useContext(ItemContext);
  const { isCombo, elements } = item;

  return (
    <div className="relative rounded-lg bg-item-200 border border-item-300 shadow-xl">
      <div className="p-1">
        <Element element={elements[0]} />
        {isCombo ? (
          <h3 className="uppercase text-[10px] font-bold text-gray-700 text-center leading-none px-1 pt-1">
            <I18N id="element-type-badge-0" />
          </h3>
        ) : null}
      </div>

      {received ? (
        <div className="uppercase text-center font-bold text-white bg-green-600 text-[11px] px-1 rounded-b-lg">
          <I18N id="received.already" />
        </div>
      ) : null}
    </div>
  );
};

const ItemChange = ({ item, received }) => {
  return item ? (
    <ItemContextProvider itemRaw={item}>
      <ItemChangeUI received={received} />
    </ItemContextProvider>
  ) : null;
};

export default ItemChange;
