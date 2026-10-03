import { useMemo, useContext, useEffect, useState, useCallback } from "react";
import useFetch from "@/hooks/useFetch";
import { extractBGGdataFromElement } from "@/utils/bgg";
import { photoUploaderConfig } from "@/config/photoUploader";
import { noBGGgame } from "@/config/no-bgggame";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import { ElementContext } from "@/context/element";
import { useOptions } from "@/store";

const useElementEditor = ({
  newBGGinfo = null,
  toggleEditingMode = () => {},
}: {
  newBGGinfo?: any;
  toggleEditingMode?: () => void;
} = {}) => {
  const { forceReloadPage } = useContext(PageContext);
  const { item, reloadItem } = useContext(ItemContext) as {
    item?: { id?: string | number } | null;
    reloadItem?: () => void;
  };

  const itemId = item && item.id ? item.id : null;

  const { element } = useContext(ElementContext);

  const updateFilters = useOptions((state: any) => state.updateFilters);
  const [BGGinfo, setBGGinfo] = useState(newBGGinfo);

  const afterLoadBGGelement = useCallback((bggData: any) => {
    setBGGinfo(bggData);
  }, []);

  const [getBGGelement, , loadingBGGelement] = useFetch({
    endpoint: "BGG_GET_GAME",
    initialState: {
      game: null,
      thumbnail: "",
      versions: [],
    },
    format: extractBGGdataFromElement,
    afterLoad: afterLoadBGGelement,
  });

  const [noGame, setNoGame] = useState(false);
  const [thumbnailAlt, setThumbnailAlt] = useState(null);
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [bgg_version_id, setBgg_version_id] = useState("");
  const [box_size, setBox_size] = useState("");
  const [language, setLanguage] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (!newBGGinfo) {
      if (
        element?.type !== "Fuera de la BGG" &&
        element?.game?.bgg_id > 0 &&
        `${element.game.bgg_id}` !== noBGGgame.element.bgg_id
      ) {
        getBGGelement({ urlParams: [element.game.bgg_id] });
      } else {
        setNoGame(true);
      }
      // A BGG game with version "other" (e.g. bulk-imported with no edition)
      // still gets its editions list, as when creating it.
    } else {
      setNoGame(newBGGinfo.element.bgg_id === noBGGgame.element.bgg_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, newBGGinfo]);

  const dataComplete = useMemo(() => {
    const elementClone = {
      ...(element ? element : {}),
    };
    const box_size = elementClone?.box_size || "";

    delete elementClone.game;

    const BGGinfoClone = {
      element: {
        ...(BGGinfo ? BGGinfo.element : {}),
        ...elementClone,
      },
      game:
        BGGinfo && BGGinfo.game
          ? BGGinfo.game
          : {
              type: 3,
              bgg_id: noBGGgame.element.bgg_id,
              primary_name: "none",
              names: "none",
              dependency: "0",
              dependency_votes: null,
              rank: "0",
              rate: "0",
              rate_votes: null,
              geek_rate: "0",
              weight: "0",
              weight_votes: null,
              year_published: null,
              game_thumbnail: "",
              contain_ids: "",
            },
      versions: BGGinfo ? BGGinfo.versions : [],
    };

    setName(BGGinfoClone.element?.title || BGGinfoClone.element?.name || "");
    setThumbnail(BGGinfoClone.element?.thumbnail || "");
    setBgg_version_id(
      `${BGGinfoClone.element?.bgg_version_id || ""}`.toLowerCase()
    );
    setBox_size(box_size);

    setLanguage(
      BGGinfoClone.element?.languageRaw || BGGinfoClone.element?.language || ""
    );
    const originalElement = element?.elementRaw?.element || {};
    setPublisher(
      originalElement.publisher ||
        elementClone.publisherRaw ||
        BGGinfo?.element?.publisher ||
        ""
    );
    setYear(
      originalElement.year || elementClone.year || BGGinfo?.element?.year || ""
    );

    return BGGinfoClone;
  }, [BGGinfo, element]);

  const onLoadedNewThumbnail = useCallback((newThumbnail: string) => {
    setThumbnail(`${photoUploaderConfig.urlBase}${newThumbnail}`);
  }, []);

  const afterLoadCreateEdit = useCallback(() => {
    toggleEditingMode();

    if (itemId) {
      reloadItem?.();
    } else {
      updateFilters(
        {
          keyword: undefined,
        },
        "collection"
      );
      forceReloadPage();
    }
  }, [updateFilters, toggleEditingMode, itemId, forceReloadPage, reloadItem]);

  const [createElement, , loadingCreateElement, errorCreateElement] = useFetch({
    endpoint: "POST_MYCOLLECTION_ELEMENTS",
    method: "POST",
    afterLoad: afterLoadCreateEdit,
  });

  const [editElement, , loadingEditElement, errorEditElement] = useFetch({
    endpoint: "PUT_MYCOLLECTION_ELEMENT",
    method: "PUT",
    afterLoad: afterLoadCreateEdit,
  });

  return {
    loading: loadingBGGelement || loadingCreateElement || loadingEditElement,
    error: errorCreateElement || errorEditElement,
    noGame,
    name,
    thumbnail,
    bgg_version_id,
    box_size,
    language,
    publisher,
    year,
    setName,
    setThumbnail,
    setBgg_version_id,
    setBox_size,
    setLanguage,
    setPublisher,
    setYear,
    game: dataComplete.game,
    item_id: itemId || null,
    hiddenInputs: ["type", "bgg_id", "box_size"],
    versions: dataComplete.versions,
    thumbnailAlt,
    setThumbnailAlt,
    onLoadedNewThumbnail,
    onCancel: toggleEditingMode,
    validations: {
      thumbnail: ["required"],
      bgg_version_id: ["required"],
      name: ["required"],
      language: ["required"],
      publisher: ["required"],
      year: bgg_version_id === "other" ? ["required"] : [],
      box_size: ["required"],
    },
    onSubmit: (params: any = {}) => {
      const data = {
        ...params,
      };

      if (element && element.elementRaw) {
        editElement({
          params: data,
          urlParams: [element.id],
        });
      } else {
        createElement({ params: data });
      }
    },
  };
};
export default useElementEditor;
