"use client";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";
import I18N from "@/i18n";

export const ItemContext = createContext({
  itemRaw: null,
  item: null,
  reloadItem: () => {},
  loadingItem: false,
  showAsIgnored: false,
  setShowAsIgnored: (_value) => {},
  setBanId: (_value) => {},
  //
  wantGroup: null,
  itemTag: null,
  tagWant: null,
  wantedViaTag: false,
  otherWantGroups: [],
});

export const ItemContextProvider = ({ itemRaw, children }) => {
  /* PAGE CONTEXT **********************************************/
  const { myWants, userId, itemTags /* myItemsInMT_forWants */ } =
    useContext(PageContext);
  /* end PAGE CONTEXT */

  const [itemLoaded, setItemLoaded] = useState(itemRaw);

  const [showAsIgnored, setShowAsIgnored] = useState(false);

  const setBanId = useCallback((id) => {
    setItemLoaded((old) => (old ? { ...old, ban_id: id } : old));
  }, []);

  /* RELOAD ITEM ***************************/

  const urlParamsItem = useMemo(() => {
    return itemRaw ? [itemRaw.id] : [];
  }, [itemRaw]);

  const afterLoad = useCallback((newItemLoaded) => {
    setItemLoaded(newItemLoaded);
  }, []);

  const [reloadItem, , loadingItem] = useFetch({
    endpoint: "GET_ITEM",
    urlParams: urlParamsItem,
    afterLoad,
  });

  useEffect(() => {
    setItemLoaded(itemRaw);
    setShowAsIgnored(false);
  }, [itemRaw]);

  /* end RELOAD ITEM ***************************/

  /* ITEM ***************************/
  const item = useMemo(() => {
    if (!itemLoaded) {
      return null;
    }
    const {
      id,
      title,
      membership: user,
      copies,
      elements,
      value,
      owner,
      group,
      tags,
      comments: commentsCount,
      ban_id,
      reported,
      matched_bgg_id,
      ready,
      favorite_id,
    } = itemLoaded;

    const isCombo = elements?.length > 1;

    // const isSameBGGId = (() => {
    //   let isFoundedBGGId = false;

    //   if (owner) {
    //     return false;
    //   }

    //   const bggIdList = elements.map(({ element }) => {
    //     return `${element?.game?.bgg_id}`;
    //   });

    //   myItemsInMT_forWants.forEach(({ elements }) => {
    //     elements.forEach(({ element }) => {
    //       const bggId = `${element?.game?.bgg_id}`;
    //       if (bggIdList.includes(bggId)) {
    //         isFoundedBGGId = true;
    //       }
    //     });
    //   });

    //   return isFoundedBGGId;
    // })();

    // Items nested in the games list (ItemWantGroupSerializer) don't carry
    // `owner`, so fall back to comparing the membership's user id — otherwise
    // an own non-BGG item shows "Lo quiero" in the games view.
    const isOwned =
      owner ?? (user?.id !== undefined && userId !== undefined
        ? String(user.id) === String(userId)
        : false);

    const isSameBGGId = isOwned ? false : matched_bgg_id && matched_bgg_id > 0;

    return {
      id,
      title,
      copies,
      elements,
      value,
      isOwned,
      group,
      tags,
      commentsCount,
      ban_id,
      favorite_id: favorite_id ?? null,
      reported,
      isCombo,
      ready: ready !== false,
      user: {
        avatar: user?.avatar || "",
        name: `${user?.first_name || ""} ${user?.last_name || ""}`,
        locationId: user?.location || "none",
      },
      isSameBGGId,
    };
  }, [itemLoaded, userId]);

  /* end ITEM ***************************/

  const { wantGroup, otherWantGroups } = useMemo(() => {
    if (!myWants.length || itemLoaded?.owner /*itemRaw?.user?.id === userId*/) {
      return { wantGroup: null, otherWantGroups: [] };
    }

    const wantsFiltered = myWants.filter((w) => {
      if (w.wants && w.wants.length && itemLoaded?.id) {
        return (
          w.wants.filter((itm) => {
            return itm.id === itemLoaded.id;
          }).length > 0
        );
      }
    });

    let wantGroup = null;
    const otherWantGroups = [];

    wantsFiltered.forEach((w) => {
      if (w.type === "item") {
        wantGroup = { ...w };
      } else {
        otherWantGroups.push({ ...w });
      }
    });

    return { wantGroup, otherWantGroups };
  }, [itemLoaded, myWants]);

  /* TAG (an item has at most one) **************************/
  // A tag is a want; a tagged item is wanted only once added to it
  // ("Lo quiero" on the item). itemTags is loaded on the offered-items page.
  const { itemTag, tagWant, wantedViaTag } = useMemo(() => {
    const id = itemLoaded?.id;
    const tag = id
      ? (itemTags || []).find((t) =>
          (t.items || []).map((x) => `${x}`).includes(`${id}`)
        ) || null
      : null;
    const want = tag
      ? myWants.find(
          (w) => w.type === "tag" && `${w.tag?.id ?? w.tag}` === `${tag.id}`
        ) || null
      : null;
    return {
      itemTag: tag,
      tagWant: want,
      wantedViaTag: !!want?.wants?.some((itm) => itm.id === id),
    };
  }, [itemLoaded, itemTags, myWants]);

  return (
    <ItemContext.Provider
      value={{
        itemRaw: itemLoaded,
        item,
        reloadItem,
        loadingItem,
        showAsIgnored,
        setShowAsIgnored,
        setBanId,
        //
        wantGroup,
        otherWantGroups,
        itemTag,
        tagWant,
        wantedViaTag,
      }}
    >
      {item.elements && item.elements.length > 0 ? (
        children
      ) : (
        <article className="bg-danger/10 border border-danger/30 rounded-lg text-center p-3 text-balance text-red-800 mb-2 text-xs">
          <I18N id="error.item.offer.notFound" />
          <br /> <strong>Ejemplar Id: {item.id}</strong>
        </article>
      )}
    </ItemContext.Provider>
  );
};
