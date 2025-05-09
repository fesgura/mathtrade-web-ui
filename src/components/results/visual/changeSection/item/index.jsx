import { useContext } from "react";
import { ItemContext, ItemContextProvider } from "@/context/item";
import I18N from "@/i18n";
import Element from "./element";

const ItemChangeUI = () => {
  const { item } = useContext(ItemContext);
  const { isCombo, elements } = item;

  return (
    <div className="relative rounded-lg bg-item-200 border border-item-300 p-1 shadow-xl">
      <Element element={elements[0]} />
      {isCombo ? (
        <h3 className="uppercase text-[10px] font-bold text-gray-700 text-center leading-none p-1">
          <I18N id="element-type-badge-0" />
        </h3>
      ) : null}
    </div>
  );
};

const ItemChange = ({ item }) => {
  return item ? (
    <ItemContextProvider itemRaw={item}>
      <ItemChangeUI />
    </ItemContextProvider>
  ) : null;
};

export default ItemChange;
