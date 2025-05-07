import { useContext, useMemo, useCallback } from "react";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";
import { colorTagStyles } from "@/utils/color";
import { GotoTopContext } from "@/context/goto-top";

const useTagSelector = () => {
  const filters_item = useOptions((state) => state.filters_item);
  const updateFilters = useOptions((state) => state.updateFilters);

  /* PAGE CONTEXT **********************************************/
  const { gotoTop } = useContext(GotoTopContext);
  const { itemTags, canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const tagList = useMemo(() => {
    return itemTags?.map((tag) => {
      return {
        id: tag.id,
        text: tag.name,
        color: colorTagStyles(tag.color),
        count: tag.items.length,
      };
    });
  }, [itemTags]);

  const tagSelected = useMemo(() => {
    if (!filters_item?.tag || !tagList?.length || !filters_item?.tag.length) {
      return null;
    }
    return (
      tagList.find((tag) => `${tag.id}` === filters_item.tag[0])?.id || null
    );
  }, [filters_item, tagList]);

  const selectTag = useCallback(
    (id) => {
      if (id === tagSelected) {
        return;
      }

      if (typeof id === "undefined") {
        gotoTop();
        updateFilters(
          {
            ...filters_item,
            tag: undefined,
            page: 1,
          },
          "item"
        );
        return;
      }
      gotoTop();
      updateFilters(
        {
          ...filters_item,
          tag: [id],
          page: 1,
        },
        "item"
      );
    },
    [filters_item, updateFilters, tagSelected, gotoTop]
  );

  return { tagList, tagSelected, selectTag, canIEdit: canI.offer || canI.want };
};

export default useTagSelector;
