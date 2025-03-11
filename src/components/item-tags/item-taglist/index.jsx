import { colorTagStyles } from "@/utils/color";
import useItemTagList from "./useItemTagList";
import Icon from "@/components/icon";

import AddTag from "./addTag";

const ItemTagList = () => {
  const {
    isOwned,
    itemId,
    tagCollection,
    updateTag,
    loadingUpdateTag,
    loadingTags,
    canIwant,
  } = useItemTagList();

  return isOwned ? null : (
    <div className="flex flex-wrap items-center gap-1">
      {tagCollection.current.map((tag) => {
        const { id, color, name, items } = tag;

        return (
          <div
            className="flex flex-nowrap  relative font-bold text-xs py-[2px] px-2 rounded-md"
            style={colorTagStyles(color)}
            key={id}
          >
            <div className="whitespace-nowrap">{name}</div>

            {canIwant ? (
              <button
                className="text-right cursor-pointer w-5 relative top-[-1px]"
                onClick={() => {
                  if (!loadingUpdateTag && !loadingTags) {
                    // Remove
                    updateTag(id, {
                      bgg_id: "",
                      protected_dup: true,
                      items: items.filter((itmId) => itmId !== itemId),
                      color,
                      name,
                    });
                  }
                }}
              >
                <Icon
                  type={loadingUpdateTag || loadingTags ? "loading" : "close"}
                />
              </button>
            ) : null}
          </div>
        );
      })}
      {canIwant ? (
        <AddTag
          updateTag={updateTag}
          options={tagCollection.options}
          itemId={itemId}
          loading={loadingUpdateTag || loadingTags}
        />
      ) : null}
    </div>
  );
};
export default ItemTagList;
