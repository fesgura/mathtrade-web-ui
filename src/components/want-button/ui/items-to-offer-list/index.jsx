import clsx from "clsx";
import GroupItem from "./group";
import Item from "./item";
import useItemsToOfferList from "./useItemToOfferList";
import Icon from "@/components/icon";
import DupProtection from "../dup-protection";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import I18N from "@/i18n";

const ItemToOfferList = () => {
  const { isItem, list, loading, error, showAll, toggleShowAll } =
    useItemsToOfferList();

  return (
    <div className="lg:pt-2 lg:px-5 px-2 border-t border-gray-300">
      <div className="flex items-center justify-between pt-3 pb-3">
        <div className="lg:px-1 px-2">
          <h3 className="font-bold">
            <I18N id="itemsToOfferInWants.title" />
          </h3>
          <p
            className={clsx("text-xs italic", {
              "text-gray-400": !isItem,
              "text-gray-700": isItem,
            })}
          >
            <I18N id="itemsToOfferInWants.subtitle" />
          </p>
        </div>
        <DupProtection />
      </div>
      <ErrorAlert error={error} />
      <div className="relative ">
        <div
          className={clsx(
            "p-2 overflow-x-hidden overflow-y-auto scrollbar min-h-[200px] bg-white border",
            {
              "h-64": !showAll,
              "border-gray-300": !isItem,
              "border-gray-400": isItem,
            }
          )}
        >
          <div className="flex flex-col gap-1">
            {list.map((elem) => {
              if (elem.isGroup) {
                return <GroupItem key={`g-${elem.id}`} group={elem} />;
              } else {
                return <Item key={elem.id} itemRaw={elem} />;
              }
            })}
          </div>
        </div>
        <LoadingBox loading={loading} min />
      </div>
      <div
        className={clsx("text-center border-b-2 border-dashed h-3 mt-2 mb-5", {
          "border-gray-400": !isItem,
          "border-gray-500": isItem,
        })}
      >
        <button
          className={clsx("px-2", {
            "text-gray-500 bg-white": !isItem,
            "text-gray-800 bg-item-200": isItem,
          })}
          onClick={toggleShowAll}
        >
          <Icon type={`arrow-${showAll ? "up" : "down"}`} />
          <span className="uppercase text-xs font-bold">
            <I18N id={`itemsToOfferInWants.${showAll ? "min" : "max"}`} />
          </span>
        </button>
      </div>
    </div>
  );
};
export default ItemToOfferList;
