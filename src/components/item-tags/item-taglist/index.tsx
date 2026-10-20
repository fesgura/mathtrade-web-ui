"use client";
import clsx from "clsx";
import { colorTagStyles } from "@/utils/color";
import useItemTagList from "./useItemTagList";
import Icon from "@/components/icon";
import AddTag from "./addTag";
import I18N from "@/i18n";

const ItemTagList = ({
  className = "",
  onCover = false,
}: {
  className?: string;
  onCover?: boolean;
}) => {
  const {
    isOwned,
    isSameBGGId,
    itemId,
    tagCollection,
    updateTag,
    loadingUpdateTag,
    loadingTags,
    canIEdit,
    notice,
    tagWant,
  } = useItemTagList();

  const showAdd = canIEdit && !tagCollection.current.length;
  if (
    isOwned ||
    isSameBGGId ||
    (!tagCollection.current.length && !notice && !showAdd)
  ) {
    return null;
  }

  return (
    <div className={clsx("flex flex-wrap items-center gap-1.5", className)}>
      {tagCollection.current.map((tag) => {
        const { id, color, name, items } = tag;

        return (
          <div
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold"
            style={colorTagStyles(color)}
            key={id}
          >
            <span className="truncate max-w-[12rem] sm:max-w-[16rem]">{name}</span>
            {canIEdit ? (
              <button
                type="button"
                className="opacity-80 hover:opacity-100"
                onClick={() => {
                  if (!loadingUpdateTag && !loadingTags) {
                    updateTag(
                      id,
                      {
                        bgg_id: "",
                        protected_dup: true,
                        items: items.filter((itmId) => itmId !== itemId),
                        color,
                        name,
                      },
                      { removingThisItem: true }
                    );
                  }
                }}
              >
                <Icon
                  type={loadingUpdateTag || loadingTags ? "loading" : "close"}
                  className="text-[11px]"
                />
              </button>
            ) : null}
          </div>
        );
      })}
      {notice === "untagged" ? (
        <p className="w-full text-xs text-sky-800 bg-sky-50 rounded px-2 py-1">
          <I18N id="tagWant.untaggedStillWanted" />
        </p>
      ) : null}
      {notice === "moved" ? (
        <div className="w-full text-xs text-sky-800 bg-sky-50 rounded px-2 py-1 space-y-1">
          <p>
            <I18N id="tagWant.movedIntoTag" />
          </p>
          {tagWant ? (
            <p>
              <I18N
                id={`tagWant.movedIntoTag.${
                  tagWant.dup_protection ? "dupOn" : "dupOff"
                }`}
              />
            </p>
          ) : null}
          {tagWant && !tagWant.matched_items?.length ? (
            <p className="text-red-700">
              <I18N id="tagWant.movedIntoTag.noOffer" />
            </p>
          ) : null}
          <p>
            <I18N id="tagWant.movedIntoTag.confirm" />
          </p>
        </div>
      ) : null}
      {/* An item has at most one tag: once tagged, no "+ Agregar etiqueta". */}
      {showAdd ? (
        <AddTag
          updateTag={updateTag}
          options={tagCollection.options}
          itemId={itemId}
          loading={loadingUpdateTag || loadingTags}
          onCover={onCover}
        />
      ) : null}
    </div>
  );
};
export default ItemTagList;
