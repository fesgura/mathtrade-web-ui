import { useContext, lazy } from "react";
import { ItemContext } from "@/context/item";
import ElementComplete from "@/components/element/elementComplete";
import I18N, { getI18Ntext } from "@/i18n";
import ItemComments from "@/components/item-comments";
import UserBox from "@/components/userBox";
import Icon from "@/components/icon";
import { LoadingBox } from "@/components/loading";
import clsx from "clsx";
import ItemGridHeader from "../item-grid-header";
import Dynamic from "@/components/dynamic";

const WantButton = lazy(() => import("@/components/want-button"));

const ItemXL = ({ onToggleExpanse, hideWant, hideTags, onChangeValue }) => {
  /* ITEM CONTEXT **********************************************/
  const { item, loadingItem, showAsIgnored } = useContext(ItemContext);
  const { ban_id, elements } = item;
  /* end ITEM CONTEXT */

  return (
    <div
      className={clsx("relative transition-opacity pb-5", {
        "opacity-30 pointer-events-none": showAsIgnored,
        "shadow-[0_0_0_7px_rgba(255,0,0,1)]": ban_id,
      })}
    >
      <div className="pt-2 px-3 pb-3">
        <div className="pr-6">
          <ItemGridHeader onChangeValue={onChangeValue} hideTags={hideTags} />
          {onToggleExpanse ? (
            <button
              className="absolute top-1 right-1 aspect-square w-7 opacity-50 hover:opacity-100"
              onClick={onToggleExpanse}
            >
              <div data-tooltip={getI18Ntext("minimize")}>
                <Icon />
              </div>
            </button>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 mb-3">
          {elements.map((element) => {
            return <ElementComplete key={element.id} element={element} />;
          })}
        </div>
        <ItemComments className="pb-5" rightContent={<UserBox />} />
      </div>

      {ban_id || hideWant ? null : (
        <Dynamic h={700}>
          <WantButton contextSize="xl" />
        </Dynamic>
      )}

      <LoadingBox loading={loadingItem} />
      {onToggleExpanse ? (
        <button
          className="absolute -bottom-2 left-1/2 hover:opacity-100 text-white bg-gray-700 hover:bg-black transition-colors leading-none text-[9px] uppercase p-1 w-24 -ml-12 rounded-full"
          onClick={onToggleExpanse}
        >
          <Icon /> <I18N id="minimize" />
        </button>
      ) : null}
    </div>
  );
};

export default ItemXL;
