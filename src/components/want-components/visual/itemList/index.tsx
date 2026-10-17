"use client";
import clsx from "clsx";
import ItemToOffer from "./item";
import useItemList from "./useItemList";
import I18N from "@/i18n";
import { WantAddTile } from "@/components/want-components/mini-card";
import Icon from "@/components/icon";

const ItemList = ({ wantGroup = {}, myItemList = [] }) => {
  const {
    wantGroupId,
    itemsAdded,
    itemsToAdd,
    addOpen,
    toggleAddOpen,
    addPadRef,
    canIwant,
    emptyGroup,
  } = useItemList(wantGroup, myItemList);

  const isEmpty = !itemsAdded.length;
  const canAdd = itemsToAdd.length > 0 && canIwant;

  return (
    <>
      <div className={clsx("flex flex-wrap gap-3", isEmpty && "flex-1 items-stretch min-w-0")}>
        {itemsAdded.map((item) => (
          <ItemToOffer
            key={item.id}
            item={item}
            wantGroupId={wantGroupId}
            disabled={!canIwant}
          />
        ))}

        {canAdd ? (
          <WantAddTile
            open={addOpen}
            onToggle={toggleAddOpen}
            size={isEmpty ? "anchor" : "mini"}
            caption={isEmpty ? "notOfferedVisual" : ""}
            className={isEmpty ? "h-full w-full" : ""}
          />
        ) : isEmpty ? (
          <p className="italic text-gray-500 text-sm max-w-[11rem]">
            <I18N
              id={emptyGroup ? "tagPending.offerDisabled" : "notOfferedVisual"}
            />
          </p>
        ) : null}
      </div>
      {addOpen && itemsToAdd.length > 0 && canIwant ? (
        <div
          className="bg-white mt-4 sm:p-4 p-3 border border-gray-200 rounded-xl relative z-raised"
          ref={addPadRef}
        >
          <div className="flex flex-wrap sm:gap-3 gap-2">
            {itemsToAdd.map((item) => {
              return (
                <ItemToOffer
                  key={item.id}
                  item={item}
                  toAdd
                  wantGroupId={wantGroupId}
                />
              );
            })}
          </div>
          <button
            type="button"
            className="sm:flex hidden absolute bg-gray-800 text-white -top-3 -right-3 w-6 h-6 rounded-full hover:bg-gray-400 transition-colors items-center justify-center"
            onClick={toggleAddOpen}
          >
            <Icon />
          </button>
        </div>
      ) : null}
    </>
  );
};

export default ItemList;
