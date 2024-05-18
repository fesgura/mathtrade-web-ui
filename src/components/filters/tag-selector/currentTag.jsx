import { useContext, useMemo, useCallback } from "react";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";
import { colorTagStyles } from "@/utils/color";
import { GotoTopContext } from "@/context/goto-top";
import Icon from "@/components/icon";

const CurrentTag = () => {
  const filters_item = useOptions((state) => state.filters_item);
  const updateFilters = useOptions((state) => state.updateFilters);

  /* PAGE CONTEXT **********************************************/
  const { gotoTop } = useContext(GotoTopContext);
  const { itemTags } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const tagSelected = useMemo(() => {
    if (!filters_item?.tag || !itemTags?.length || !filters_item?.tag.length) {
      return null;
    }
    return itemTags.find((tag) => `${tag.id}` === filters_item.tag[0]) || null;
  }, [filters_item, itemTags]);

  const removeTag = useCallback(() => {
    gotoTop();
    updateFilters(
      {
        ...filters_item,
        tag: undefined,
        page: 1,
      },
      "item"
    );
  }, [filters_item, updateFilters, gotoTop]);

  return tagSelected ? (
    <div className="mb-3">
      <div
        className="flex items-center justify-between gap-2 pl-2 rounded-md"
        style={colorTagStyles(tagSelected.color)}
      >
        <div className=" uppercase font-bold text-xs cursor-default">
          {tagSelected.name}
          {tagSelected.items.length ? (
            <span> ({tagSelected.items.length})</span>
          ) : null}
        </div>
        <div className="px-1 cursor-pointer" onClick={removeTag}>
          <Icon />
        </div>
      </div>
    </div>
  ) : null;
};
export default CurrentTag;
