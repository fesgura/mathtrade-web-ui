import { useCallback, useEffect, useMemo, useState } from "react";
import { getI18Ntext } from "@/i18n";
import { getLanguageListText } from "@/utils/itemUtils";
import { formatPublisherWithYear } from "@/utils/text";
import useFetch from "@/hooks/useFetch";

const processElements = ({ elements = [] }: { elements?: any[] } = {}) => {
  return (elements || []).map((element: any = {}) => {
    const { id, thumbnail, game, status } = element;

    const typeNum = game?.type || 1;

    const type = getI18Ntext(`element-type-badge-${typeNum}`);

    return {
      id,
      type,
      typeNum,
      game,
      thumbnail,
      title: element.name,
      titleLink:
        typeNum > 0 && typeNum < 3
          ? `https://boardgamegeek.com/boardgame/${game?.bgg_id}/`
          : null,
      publisher: formatPublisherWithYear(element.publisher, element.year),
      publisherLink:
        element.bgg_version_id && element?.bgg_version_id === "other"
          ? null
          : `https://boardgamegeek.com/boardgameversion/${element?.bgg_version_id}/`,
      language: getLanguageListText(element.language),
      status: status || null,
      comment:
        element.comment && element.comment.length ? element.comment : null,

      images: element.images && element.images.length ? element.images : null,
      originalElement: element,
    };
  });
};

const useItem = ({
  itemExternal = null,
  item = null,
  isForcedReload = false,
  deleteReload = null,
}: {
  itemExternal?: any;
  item?: any;
  isForcedReload?: boolean;
  deleteReload?: (() => void) | null;
} = {}) => {
  const [itemLoaded, setItemLoaded] = useState(item);

  const afterLoad = useCallback(
    (newItemLoaded: any) => {
      if (deleteReload) {
        deleteReload();
      }
      setItemLoaded(newItemLoaded);
    },
    [deleteReload]
  );

  const urlParamsItem = useMemo(() => {
    return item ? [item.id] : [];
  }, [item]);

  const [getItemById] = useFetch({
    endpoint: "GET_ITEM",
    urlParams: urlParamsItem,
    afterLoad,
  });

  useEffect(() => {
    if (isForcedReload) {
      getItemById();
    }
  }, [getItemById, isForcedReload]);

  return useMemo(() => {
    if (itemExternal) {
      return itemExternal;
    }
    const {
      id,
      title,
      user,
      value,
      comments,

      comments: commentsCount,
    } = itemLoaded || {};

    const elements = processElements(itemLoaded);

    const { titleLink, publisher, publisherLink, language, status } =
      elements[0] || {};

    const typeNum = elements?.length > 1 ? 0 : elements[0]?.typeNum;

    return {
      id,
      isCombo: !typeNum,
      type: getI18Ntext(`element-type-badge-${typeNum}`),
      title,
      titleLink,
      value,
      publisher,
      publisherLink,
      language,
      status,
      user: {
        // membership.id is the user id (MembershipSingleSerializer)
        id: user?.id ?? null,
        avatar: user?.avatar || "",
        name: `${user?.first_name || ""} ${user?.last_name || ""}`,
        locationId: user?.location || "none",
      },
      comments,
      elements,
      commentsCount,
    };
  }, [itemExternal, itemLoaded]);
};
export default useItem;
