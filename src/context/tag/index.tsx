"use client";
import { createContext, useMemo, useContext, type ReactNode } from "react";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";
import type { MyTag } from "@/utils/tagItems";

type TagContextValue = {
  tag: MyTag | null;
  showingBans: boolean;
  wantGroup: any;
  isSameBGGId?: boolean;
};

export const TagContext = createContext<TagContextValue>({
  tag: null,
  showingBans: false,
  wantGroup: null,
  isSameBGGId: false,
});

export const TagContextProvider = ({
  children = null,
}: {
  children?: ReactNode;
}) => {
  /* PAGE CONTEXT **********************************************/
  const { itemTags, myWants } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* FILTERS */
  const filters = useOptions((state) => state.filters_item);
  /* end FILTERS */

  const { tag, showingBans } = useMemo((): {
    tag: MyTag | null;
    showingBans: boolean;
  } => {
    const showingBans = filters?.ignored || false;
    if (filters.tag && filters.tag[0] && itemTags) {
      const tagsFiltered = itemTags.filter((t) => {
        return `${t.id}` === filters.tag[0];
      });

      return { tag: tagsFiltered[0] || null, showingBans };
    }
    return { tag: null, showingBans };
  }, [filters, itemTags]);

  const wantGroup = useMemo(() => {
    const wantsFiltered =
      tag && tag.id
        ? myWants.filter((w) => {
            if (w.type === "tag") {
              return `${w.tag?.id}` === tag.id;
            }
            return false;
          })
        : [];

    return wantsFiltered[0] || null;
  }, [myWants, tag]);

  return (
    <TagContext.Provider
      value={{
        tag,
        showingBans,
        //
        wantGroup,
      }}
    >
      {tag ? children : null}
    </TagContext.Provider>
  );
};
