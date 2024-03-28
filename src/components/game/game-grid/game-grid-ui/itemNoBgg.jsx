import { useContext } from "react";
import { ItemContext } from "@/context/item";
import { ItemContextProvider } from "@/context/item";
import StatusBadge from "@/components/status-badge";
import ElementXSS from "@/components/element/xss";
import Previewer from "@/components/previewer";
import I18N from "@/i18n";

const ItemContent = ({ bgg_id }) => {
  const { item } = useContext(ItemContext);

  const { language, status, isCombo, elements } = item;

  return (
    <>
      <div className="pt-3 flex items-center gap-3">
        <div className="text-sm text-purple-400 font-bold">{language}</div>
        <StatusBadge status={status} />
      </div>

      {isCombo ? (
        <div className="py-3 mb-2">
          <div className="text-xs mb-1">
            <I18N id="combo-with" />:{" "}
            <Previewer className="rounded-full bg-primary w-5 h-5" />
          </div>
          <div className="border-white/20 border-t">
            {elements.map((element, k) => {
              if (element?.bgg_id === bgg_id) {
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

const ItemNoBGG = ({ itemRaw, bgg_id }) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemContent bgg_id={bgg_id} />
    </ItemContextProvider>
  );
};

export default ItemNoBGG;
