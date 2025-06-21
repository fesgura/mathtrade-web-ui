import useFetch from "@/hooks/useFetch";
import { useState, useCallback, useEffect, useMemo, useContext } from "react";
import { normalizeString } from "@/utils";
import { PageContext } from "@/context/page";

const useBoxReceived = () => {
  /* LOCATIONS **********************************************/
  const { referrer } = useContext(PageContext);

  const localLocation = referrer?.id || 1;

  /* end LOCATIONS **********************************************/

  const [trackingsRaw, setTrackingsRaw] = useState([]);

  /* GET BOXES **********************************************/
  const afterLoad = useCallback((newBoxes) => {
    const newTrackingsPool = newBoxes.reduce((obj, box) => {
      const { origin_name, tracking, number } = box;
      if (!obj[tracking]) {
        obj[tracking] = {
          tracking,
          origin_name,
          boxes: [],
        };
      }

      obj[tracking].boxes.push({
        number,
        text: `Caja Nº ${number}`,
      });

      return obj;
    }, {});

    const newTrackings = Object.values(newTrackingsPool);

    setTrackingsRaw(newTrackings);
  }, []);

  const [getBoxes, , loading, error] = useFetch({
    endpoint: "LOGISTICS_GET_BOXES",
    initialState: [],
    afterLoad,
  });

  useEffect(() => {
    getBoxes({
      params: {
        destination: localLocation,
      },
    });
  }, [getBoxes, localLocation]);

  ////////////////////////////////////////////////

  const [searchValue, setSearchValue] = useState("");
  const [order, setOrder] = useState("");

  const trackingsSearched = useMemo(() => {
    if (!trackingsRaw || !trackingsRaw.length) {
      return [];
    }

    const keyLow = normalizeString(searchValue);

    return trackingsRaw.filter((item) => {
      const { origin_name } = item;

      if (keyLow === "") {
        return true;
      }
      return normalizeString(`${origin_name || ""}`).indexOf(keyLow) >= 0;
    });
  }, [trackingsRaw, searchValue]);

  const { trackings, listJSON } = useMemo(() => {
    const listOrdered = trackingsSearched.sort((a, b) => {
      const dir = order.indexOf("-") === 0 ? -1 : 1;

      const orderKey = order.replace("-", "");

      switch (orderKey) {
        case "origin_name":
          return a?.origin_name.toUpperCase() < b?.origin_name.toUpperCase()
            ? -1 * dir
            : dir;
        case "tracking":
          return a?.tracking < b?.tracking ? -1 * dir : dir;

        case "boxes":
          return a?.boxes?.length < b?.boxes?.length ? -1 * dir : dir;
        default:
          return 1;
      }
    });

    const listJSONdata = listOrdered.map((tr) => {
      const { origin_name, tracking, boxes } = tr;

      return {
        "Nº Tracking": tracking || "-",
        "Ciudad de origen": origin_name,
        "Cantidad de Cajas": boxes?.length || 0,
      };
    });

    return {
      trackings: listOrdered,
      listJSON: listJSONdata,
    };
  }, [trackingsSearched, order]);

  return {
    trackings,
    listJSON,
    loading,
    error,
    order,
    setOrder,
    searchValue,
    setSearchValue,
  };
};

export default useBoxReceived;
