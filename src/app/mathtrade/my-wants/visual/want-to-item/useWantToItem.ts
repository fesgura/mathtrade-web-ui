import { useContext, useEffect, useMemo, useState } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import { useOptions } from "@/store";
import { normalizeString } from "@/utils";
import { visibleWants } from "@/utils/visibleWants";
import { changedWantsFirst } from "@/components/want-components/utils";

const orders = {
  game: 0,
  tag: 1,
  item: 2,
};

const useWantToItem = () => {
  const { setPageType, myWants, changedWantIds, myItemsInMT_forWants } =
    useContext(PageContext);

  useEffect(() => {
    setPageType("wants-visual");
  }, [setPageType]);

  const { isLoadedWants } = useContext(MyWantsContext);
  const filters = useOptions((state) => state.filters_wants);

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

  const myItemList = useMemo(() => {
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
  }, [myItemsInMT_forWants, filters, mostOfferedItemsObj]);

  const [readyToRender, setReadyToRender] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setReadyToRender(true);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  });

  return { isLoadedWants, myWants, wantList, myItemList, readyToRender };
};

export default useWantToItem;
