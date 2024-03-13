import {
  useMemo,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import useFetch from "@/hooks/useFetch";
import useFetchBGG from "@/hooks/useFetchBGG";
import { extractBGGdataFromElement } from "@/utils/bgg";
import { photoUploaderConfig } from "@/config/photoUploader";
import { noBGGgame } from "@/config/no-bgggame";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";

const useElementEditor = ({ element, newBGGinfo, toggleEditingMode }) => {
  // PAGE CONTEXT *************************************/
  const { forceReloadPage } = useContext(PageContext);
  // end PAGE CONTEXT *************************************/

  // ITEM CONTEXT *************************************/
  const { item, reloadItem } = useContext(ItemContext);

  const itemId = item?.id || null;
  // end ITEM CONTEXT *************************************/

  const [BGGinfo, setBGGinfo] = useState(newBGGinfo);

  const afterLoadBGG = useCallback((d) => {
    setBGGinfo(d);
  }, []);

  const [getBGGelements, , loadingBGG] = useFetchBGG({
    initialState: {
      game: null,
      thumbnail: "none",
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
  const [language, setLanguage] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState("");
  ///////////////////////////////////////////

  useEffect(() => {
    if (!newBGGinfo) {
      //edit
      if (`${element.elementRaw.game.bgg_id}` !== noBGGgame.element.bgg_id) {
        getBGGelements({
          id: element.elementRaw.game.bgg_id,
          versions: 1,
          stats: 1,
        });
      } else {
        setNoGame(true);
      }
    } else {
      setNoGame(newBGGinfo.element.bgg_id === noBGGgame.element.bgg_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, newBGGinfo]);

  const dataComplete = useMemo(() => {
    const elementClone = {
      ...(element && element.elementRaw
        ? element.elementRaw
        : {
            comment: null,
          }),
    };
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
              primary_name: null,
              names: null,
              dependency: "0",
              dependency_votes: null,
              rank: "0",
              rate: "0",
              rate_votes: null,
              weight: "0",
              weight_votes: null,
            },
      versions: BGGinfo ? BGGinfo.versions : [],
    };

    setName(BGGinfoClone.element?.name || "");
    setThumbnail(BGGinfoClone.element?.thumbnail || "");
    setBgg_version_id(BGGinfoClone.element?.bgg_version_id || "");
    setLanguage(BGGinfoClone.element?.language || "");
    setPublisher(BGGinfoClone.element?.publisher || "");
    setYear(BGGinfoClone.element?.year || "");
    setStatus(BGGinfoClone.element?.status || "");
    setImages(BGGinfoClone.element?.images || "");

    return BGGinfoClone;
  }, [BGGinfo, element]);

  /////////////////////
  const onLoadedNewThumbnail = useCallback((newThumbnail) => {
    setThumbnail(`${photoUploaderConfig.urlBase}${newThumbnail}`);
  }, []);

  /********************************************************/

  // CREATE ELEMENT
  const afterLoadCreate = useCallback(() => {
    toggleEditingMode();

    if (itemId) {
      reloadItem();
    } else {
      forceReloadPage();
    }
  }, [toggleEditingMode, itemId, forceReloadPage, reloadItem]);

  const [createElement, , loadingCreateElement, errorCreateElement] = useFetch({
    endpoint: "POST_ELEMENT",
    method: "POST",
    afterLoad: afterLoadCreate,
  });

  // EDIT ELEMENT

  const urlParams = useMemo(() => {
    if (element && element.elementRaw) {
      return [element.elementRaw.id];
    }
    return [];
  }, [element]);

  const afterLoadEdit = useCallback(() => {
    toggleEditingMode();
    reloadItem();
  }, [toggleEditingMode, reloadItem]);

  const [editElement, , loadingEditElement, errorEditElement] = useFetch({
    endpoint: "PUT_ELEMENT",
    method: "PUT",
    urlParams,
    afterLoad: afterLoadEdit,
  });

  return {
    loading: loadingBGG || loadingCreateElement || loadingEditElement,
    error: errorCreateElement || errorEditElement,
    noGame,
    //
    name,
    thumbnail,
    bgg_version_id,
    language,
    publisher,
    year,
    status,
    images,
    setName,
    setThumbnail,
    setBgg_version_id,
    setLanguage,
    setPublisher,
    setYear,
    setStatus,
    setImages,
    //
    game: dataComplete.game,
    comment: dataComplete.element?.comment,
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
      "weight",
      "weight_votes",
      "max_players",
      "min_players",
      "max_playtime",
      "min_playtime",
      "playing_time",
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
      bgg_version_id: ["required"],
      name: ["required"],
      language: ["required"],
      publisher: ["required"],
      year: ["required"],
      status: ["required"],
    },
    onSubmit: (params) => {
      if (element && element.elementRaw) {
        editElement({
          params,
        });
      } else {
        createElement({ params });
      }
    },
  };
};
export default useElementEditor;

/*


# api/elements/

## POST|PUT:
    {
        x'type': "", 
        x'bgg_id': 0,        
        x'thumbnail': "url", 
        
        x'primary_name': "", 
        x'names': "one,two",         
        x'dependency': "",
        x'dependency_votes': "0,1,2,3", 
        x'rank': "", 
        x'rate': "", 
        x'rate_votes': "0,1,2,3", 
        x'weight': "", 
        x'weight_votes': "0,1,2,3",



        'name': "", 
        'status': "", 
        'comment': "", 
        'item_id': 0, 
        'images': "utl1,url2",






        'bgg_version_id': 0,
        'language': "", 
        'publisher': "", 
        'year': "",
    }


# api/items/






{
  "bgg_id": 296152,
  "type": 2,
  "primary_name": "The West Kingdom Tomesaga (2020)",
  "names": "The West Kingdom Tomesaga (2020)",
  "min_players": null,
  "max_players": null,
  "playing_time": null,
  "min_playtime": null,
  "max_playtime": null,
  "dependency": 0,
  "dependency_votes": "0|0|0|0|0",
  "rank": null,
  "rate": 7.62536,
  "rate_votes": "613",
  "weight": 3.2857,
  "weight_votes": "7"
}









*/
