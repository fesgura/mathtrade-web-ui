"use client";
import { createContext, useMemo, useState, useContext } from "react";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";

export const TagContext = createContext({
  tag: null,
  showingBans: false,
  wantGroup: null,
  isSameBGGId: false,
});

export const TagContextProvider = ({ children }) => {
  /* PAGE CONTEXT **********************************************/
  const { itemTags, myWants } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* FILTERS */
  const filters = useOptions((state) => state.filters_item);
  /* end FILTERS */

  const { tag, showingBans } = useMemo(() => {
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
