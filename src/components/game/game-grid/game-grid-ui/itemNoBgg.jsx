import { useContext } from "react";
import { ItemContext } from "@/context/item";
import { ItemContextProvider } from "@/context/item";
import StatusBadge from "@/components/status-badge";
import ElementXSS from "@/components/element/xss";
import Previewer from "@/components/previewer";
import I18N from "@/i18n";
import UserBox from "@/components/userBox";

const ItemContent = ({ bgg_id, title }) => {
  const { item } = useContext(ItemContext);

  const { language, status, isCombo, elements } = item;

  return (
    <>
      <div className="pt-3 flex items-center gap-3">
        <div className="text-sm text-purple-400 font-bold">{language}</div>
        <StatusBadge status={status} />
        <Previewer className="rounded-full bg-primary w-6 sh-5" />
      </div>
      <div className="pt-3 mb-1">
        <UserBox toLeft />
      </div>
      {isCombo ? (
        <div className="py-3 mb-2">
          <div className="text-xs mb-1">
            <I18N id="combo-with" />:
          </div>
          <div className="border-white/20 border-t">
            {elements.map((element, k) => {
              if (element?.bgg_id === bgg_id || element?.title === title) {
                return null;
              }
              return <ElementXSS element={element} key={k} />;
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

const ItemNoBGG = ({ itemRaw, bgg_id, title }) => {
  return itemRaw ? (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemContent bgg_id={bgg_id} title={title} />
    </ItemContextProvider>
  ) : null;
};

export default ItemNoBGG;
