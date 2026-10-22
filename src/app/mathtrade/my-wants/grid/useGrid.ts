import { useContext, useEffect, useMemo, useState, useRef } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import { GridContext } from "@/context/myWants/grid";
import { useOptions } from "@/store";
import { normalizeString } from "@/utils";
import useFetch from "@/hooks/useFetch";
import { visibleWants } from "@/utils/visibleWants";
import { visibleTagItems } from "@/utils/tagItems";
import { changedWantsFirst } from "@/components/want-components/utils";

// My own tags are few; one page covers them. Module-level so useFetch's
// autoLoad doesn't refetch on every render.
const TAGS_PARAMS = { page_size: 200 };

const orders: Record<string, number> = {
  game: 0,
  tag: 1,
  item: 2,
};

const useGrid = () => {
  /* PAGE CONTEXT **********************************************/
  const {
    setPageType,
    myWants,
    changedWantIds,
    myGroups_forWants,
    myItemsInMT_forWants,
    tagsReloadValue,
  } = useContext(PageContext);

  useEffect(() => {
    setPageType("wants-grid");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  /* MYWANTS CONTEXT **********************************************/
  const { isLoadedWants } = useContext(MyWantsContext);
  /* end MYWANTS CONTEXT **********************************************/

  /* GRID CONTEXT **********************************************/
  const { setGroupsVisible, showNoOptionsAdv } = useContext(GridContext);
  /* end GRID CONTEXT **********************************************/

  /* FILTERS */
  const filters = useOptions((state) => state.filters_wants);
  /* end FILTERS */

  /* WANTLIST **********************************************/
  const wantList = useMemo(() => {
    const sorted = (() => {
      let myWantsFiltered = visibleWants(myWants);

      const filtersKeyword = filters?.keyword || null;

      if (filtersKeyword) {
        const filtersKeywordNormalized = normalizeString(filtersKeyword);
        myWantsFiltered = myWantsFiltered.filter((w) => {
          return normalizeString(w.name).indexOf(filtersKeywordNormalized) >= 0;
        });
      }

      const orderRaw = filters?.order || "type";

      const dir = orderRaw.indexOf("-") >= 0 ? -1 : 1;

      const order = orderRaw.replace("-", "");

      switch (order) {
        case "name":
          return myWantsFiltered.sort((a, b) => {
            return a.name < b.name ? -1 * dir : 1 * dir;
          });
        case "value":
          return myWantsFiltered.sort((a, b) => {
            const a_value = a.value === null ? 0 : parseFloat(a.value);
            const b_value = b.value === null ? 0 : parseFloat(b.value);

            if (a_value === b_value) {
              return a.name < b.name ? -1 : 1;
            } else {
              return a_value < b_value ? -1 * dir : 1 * dir;
            }
          });

        case "most_wanted":
          return myWantsFiltered.sort((a, b) => {
            const a_items = a?.items?.length || 0;
            const b_items = b?.items?.length || 0;

            if (a_items === b_items) {
              return a.title < b.title ? -1 : 1;
            } else {
              return a_items < b_items ? -1 * dir : 1 * dir;
            }
          });
        default:
          return myWantsFiltered.sort((a, b) => {
            if (orders[a.type] === orders[b.type]) {
              return a.name < b.name ? -1 * dir : 1 * dir;
            } else {
              return orders[a.type] < orders[b.type] ? -1 * dir : 1 * dir;
            }
          });
      }
    })();
    // Wants with unread changes always go first.
    return changedWantsFirst(sorted, changedWantIds);
  }, [myWants, filters, changedWantIds]);

  /* end WANTLIST **********************************************/

  /* TAG SECTIONS (MAT-136) ****************************************/
  // Same design as item groups in the columns: a tag want is one row that
  // holds the ticks (the want is per tag), and, when expanded, its tagged
  // items are listed under it as info rows without ticks of their own.
  // Tags are for items only; game and item wants keep their normal rows.
  const { tagsVisible } = useContext(GridContext);

  // All tagged items (wanted or not), with titles, in one call.
  const [, tagsData] = useFetch({
    endpoint: "MYTAGS",
    initialState: { results: [] },
    params: TAGS_PARAMS,
    autoLoad: true,
    // Refetched after an ignore/unignore (useReloadWantsAndTags).
    reloadValue: tagsReloadValue,
  });
  const tagItems = useMemo(() => {
    const byTag: Record<string, any[]> = {};
    (tagsData?.results || []).forEach((tag: any) => {
      // Ignored copies stay tagged but can't be wanted: not listed.
      byTag[tag.id] = visibleTagItems(tag.items);
    });
    return byTag;
  }, [tagsData]);

  const rows = useMemo(() => {
    const order = (filters?.order || "type").replace("-", "");
    // Mixed orders (name, value…) have no sections: label each row instead.
    if (order !== "type") {
      return wantList.map((w: any) => ({ ...w, _showTypeBadge: true }));
    }

    // Items the user already wants outside a tag (their own item want or a
    // game want): shown as "por separado", not offered to add to the tag.
    const wantedElsewhere = new Set<string>();
    wantList.forEach((w: any) => {
      if (w.type === "tag") return;
      (w.wants || []).forEach((itm: any) => wantedElsewhere.add(`${itm.id}`));
    });

    const result: any[] = [];
    let lastType: string | null = null;
    wantList.forEach((want: any) => {
      // Default order is grouped by type: a thin separator per section
      // (Juegos / Etiquetas / Ejemplares) instead of a label on every row.
      if (want.type !== lastType) {
        result.push({
          isSection: true,
          sectionType: want.type,
          _key: `section-${want.type}`,
        });
        lastType = want.type;
      }
      result.push(want);
      if (want.type !== "tag" || !tagsVisible?.[want.id]) return;
      const color = want.tag?.color || "#999999";
      const wantedIds = new Set((want.wants || []).map((itm: any) => `${itm.id}`));
      const tagId = want.tag?.id ?? want.tag;
      // Every tagged item; the wanted ones are the tag's want members.
      const items = tagItems[tagId] || want.wants || [];
      items.forEach((item: any) => {
        result.push({
          isTagItem: true,
          _key: `tagitem-${want.id}-${item.id}`,
          item,
          color,
          wanted: wantedIds.has(`${item.id}`),
          wantedElsewhere: wantedElsewhere.has(`${item.id}`),
          tagId,
          tagWantId: want.id,
        });
      });
    });
    return result;
  }, [wantList, filters, tagsVisible, tagItems]);
  /* end TAG SECTIONS ************************************************/

  const mostOfferedItemsObj = useMemo(() => {
    const order = (filters?.order || "type").replace("-", "");

    if (order === "most_wanted") {
      return myWants.reduce((obj, w) => {
        w.items.forEach((itemId) => {
          if (!obj[itemId]) {
            obj[itemId] = 0;
          }
          obj[itemId] += 1;
        });
        return obj;
      }, {});
    }

    return {};
  }, [myWants, filters]);

  /* MYITEMLIST **********************************************/
  const { myItemList, newGroupsVisible } = useMemo(() => {
    const [groupObj, newGroupsVis] = myGroups_forWants.reduce(
      (arr: [Record<string, any>, Record<string, boolean>], group) => {
        const { id, name, color, item_ids } = group;
        if (item_ids.length) {
          arr[0][id] = { isGroup: true, id, name, color, items: [] };
          arr[1][id] = false;
        }

        return arr;
      },
      [{}, {}],
    );

    const allItemsAlone = [];

    const myItemsInMT = (() => {
      const orderRaw = filters?.order || "type";

      const dir = orderRaw.indexOf("-") >= 0 ? -1 : 1;

      const order = orderRaw.replace("-", "");

      switch (order) {
        case "name":
          return [...myItemsInMT_forWants].sort((a, b) => {
            return a.title < b.title ? -1 * dir : 1 * dir;
          });
        case "value":
          return [...myItemsInMT_forWants].sort((a, b) => {
            const a_value = a.value === null ? 0 : parseFloat(a.value);
            const b_value = b.value === null ? 0 : parseFloat(b.value);

            if (a_value === b_value) {
              return a.title < b.title ? -1 : 1;
            } else {
              return a_value < b_value ? -1 * dir : 1 * dir;
            }
          });
        case "most_wanted":
          return [...myItemsInMT_forWants].sort((a, b) => {
            const a_count = mostOfferedItemsObj[a.id] || 0;
            const b_count = mostOfferedItemsObj[b.id] || 0;

            if (a_count === b_count) {
              return a.title < b.title ? -1 : 1;
            } else {
              return a_count < b_count ? -1 * dir : 1 * dir;
            }
          });
        default:
          return [...myItemsInMT_forWants];
      }
    })();

    myItemsInMT.forEach((itm) => {
      const { group } = itm;

      if (group && groupObj[group.id]) {
        groupObj[group.id].items.push(itm);
      } else {
        allItemsAlone.push(itm);
      }
    });

    const allItemsInGroups = [];

    Object.values(groupObj)
      .filter((g: any) => g.items.length)
      .forEach((group: any) => {
        const { color: colorGroup, items } = group;
        delete group.items;

        allItemsInGroups.push({
          ...group,
          count: items.length,
          items: items.map((itm) => itm.id),
        });

        const color = colorGroup + "25";
        // Grouped items show the group's score: the minimum of its items
        // (MAT-137; same rule as the backend's autocomplete).
        const values = items
          .map((itm) => itm.value)
          .filter((v) => v !== null && v !== undefined)
          .map(Number);
        const groupValue = values.length ? Math.min(...values) : null;

        items.forEach((item) => {
          allItemsInGroups.push({
            ...item,
            color,
            value: groupValue,
          });
        });
      });

    //

    return {
      myItemList: [""].concat(allItemsInGroups.concat(allItemsAlone)),
      newGroupsVisible: newGroupsVis,
    };
  }, [myGroups_forWants, myItemsInMT_forWants, filters, mostOfferedItemsObj]);
  /* end MYITEMLIST **********************************************/

  /* READY TO RENDER **********************************************/
  const [readyToRender, setReadyToRender] = useState(false);
  useEffect(() => {
    let timer = setTimeout(() => {
      setReadyToRender(true);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  });
  /* end READY TO RENDER **********************************************/

  const emptyWants = useMemo(() => {
    return (isLoadedWants && !myWants.length) || false;
  }, [isLoadedWants, myWants]);

  const rootRef = useRef(null);

  useEffect(() => {
    if (setGroupsVisible && newGroupsVisible) {
      setGroupsVisible(newGroupsVisible);
    }
  }, [setGroupsVisible, newGroupsVisible]);

  return {
    emptyWants,
    wantList: rows,
    myItemList,
    readyToRender,
    rootRef,
    showNoOptionsAdv,
  };
};

export default useGrid;
