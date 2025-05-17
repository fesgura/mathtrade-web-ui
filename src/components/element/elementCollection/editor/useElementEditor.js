import { useMemo, useContext, useEffect, useState, useCallback } from "react";
import useFetch from "@/hooks/useFetch";
import useFetchBGG from "@/hooks/useFetchBGG";
import { extractBGGdataFromElement } from "@/utils/bgg";
import { photoUploaderConfig } from "@/config/photoUploader";
import { noBGGgame } from "@/config/no-bgggame";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import { ElementContext } from "@/context/element";
import { useOptions } from "@/store";

const useElementEditor = ({ newBGGinfo, toggleEditingMode }) => {
  // PAGE CONTEXT *************************************/
  const { forceReloadPage } = useContext(PageContext);
  // end PAGE CONTEXT *************************************/

  // ITEM CONTEXT *************************************/
  const { item, reloadItem } = useContext(ItemContext);

  const itemId = item && item.id ? item.id : null;
  // end ITEM CONTEXT *************************************/

  // ELEMENT CONTEXT *************************************/
  const { element } = useContext(ElementContext);
  // end ELEMENT CONTEXT *************************************/

  /* FILTER OPTIONS **********************************************/
  const updateFilters = useOptions((state) => state.updateFilters);
  /* end FILTER OPTIONS *********************************************/

  const [BGGinfo, setBGGinfo] = useState(newBGGinfo);

  const afterLoadBGG = useCallback((d) => {
    setBGGinfo(d);
  }, []);

  const [getBGGelements, , loadingBGG] = useFetchBGG({
    initialState: {
      game: null,
      thumbnail: "",
      versions: [],
    },
    endpoint: "ELEMENT",
    format: extractBGGdataFromElement,
    afterLoad: afterLoadBGG,
  });

  ///////////////////////////////////////////
  const [noGame, setNoGame] = useState(false);
  const [thumbnailAlt, setThumbnailAlt] = useState(null);
  ///////////////////////////////////////////
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [bgg_version_id, setBgg_version_id] = useState("");
  const [box_size, setBox_size] = useState("");
  const [language, setLanguage] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  ///////////////////////////////////////////

  useEffect(() => {
    if (!newBGGinfo) {
      //edit
      if (
        element?.type !== "Fuera de la BGG" &&
        element.game.bgg_id > 0 &&
        `${element.game.bgg_id}` !== noBGGgame.element.bgg_id
      ) {
        getBGGelements({
          id: element.game.bgg_id,
          versions: 1,
          stats: 1,
        });
      } else {
        setNoGame(true);
      }
      if (element?.bgg_version_id === "other") {
        setNoGame(true);
      }
    } else {
      setNoGame(newBGGinfo.element.bgg_id === noBGGgame.element.bgg_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, newBGGinfo]);

  const dataComplete = useMemo(() => {
    const elementClone = {
      ...(element //&& element.elementRaw
        ? element //.elementRaw
        : {}),
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
    setPublisher(BGGinfoClone.element?.publisher || "");
    setYear(BGGinfoClone.element?.year || "");

    return BGGinfoClone;
  }, [BGGinfo, element]);

  /////////////////////
  const onLoadedNewThumbnail = useCallback((newThumbnail) => {
    setThumbnail(`${photoUploaderConfig.urlBase}${newThumbnail}`);
  }, []);

  /********************************************************/

  // CREATE ELEMENT
  const afterLoadCreateEdit = useCallback(() => {
    toggleEditingMode();

    if (itemId) {
      reloadItem();
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

  // EDIT ELEMENT

  const [editElement, , loadingEditElement, errorEditElement] = useFetch({
    endpoint: "PUT_MYCOLLECTION_ELEMENT",
    method: "PUT",
    afterLoad: afterLoadCreateEdit,
  });

  return {
    loading: loadingBGG || loadingCreateElement || loadingEditElement,
    error: errorCreateElement || errorEditElement,
    noGame,
    //
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
    //
    game: dataComplete.game,
    item_id: itemId || null,
    hiddenInputs: [
      "type",
      "bgg_id",
      "primary_name",
      "names",
      "dependency",
      "dependency_votes",
      "rank",
      "rate",
      "rate_votes",
      "geek_rate",
      "weight",
      "weight_votes",
      "max_players",
      "min_players",
      "max_playtime",
      "min_playtime",
      "playing_time",
      "game_thumbnail",
      "year_published",
      "box_size",
      "contain_ids",
    ],
    //
    versions: dataComplete.versions,
    //
    thumbnailAlt,
    setThumbnailAlt,
    //
    onLoadedNewThumbnail,
    //
    onCancel: toggleEditingMode,
    //
    validations: {
      thumbnail: ["required"],
      bgg_version_id: ["required"],
      name: ["required"],
      language: ["required"],
      publisher: ["required"],
      year: ["required"],
      box_size: ["required"],
    },
    onSubmit: (params) => {
      const data = {
        ...params,
        primary_name:
          params.primary_name !== "none"
            ? params.primary_name
            : params.name || "none",
        names: params.names !== "none" ? params.names : params.name || "none",
        game_thumbnail:
          !params?.game_thumbnail || params.game_thumbnail === "none"
            ? params.thumbnail
            : params?.game_thumbnail,
        year_published: params.year_published || params.year,
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
