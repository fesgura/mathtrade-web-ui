import useFetch from "@/hooks/useFetch";
import { useState, useCallback, useEffect, useMemo, useContext } from "react";
import { normalizeString } from "@/utils";
import { PageContext } from "@/context/page";
import { codeNumToString } from "@/context/boxDelivery/utils";

const useBoxReceived = () => {
  /* LOCATIONS **********************************************/
  const { referrer } = useContext(PageContext);

  const localLocation = referrer?.id || 1;

  /* end LOCATIONS **********************************************/

  const [trackingsRaw, setTrackingsRaw] = useState([]);

  const afterLoadTrackings = useCallback((newTrackings) => {
    const newTrackingsMap = newTrackings.map(
      ({ id, image, boxes: boxesRaw, tracking_code, price, weight }) => {
        let origin_name = "-";

        let itemsCount = 0;

        const boxes = boxesRaw.map((box) => {
          if (box?.origin_name) {
            origin_name = box?.origin_name;
          }

          const items = box?.math_items.map((item) => {
            return {
              id: item?.id,
              name: `${codeNumToString(item?.assigned_trade_code)} - ${
                item?.title
              }`,
              user: `${item?.receptor_first_name || "-"} ${
                item?.receptor_last_name || ""
              }`,
            };
          });

          itemsCount += items.length;

          return {
            id: box?.id,
            name: `Caja Nº ${box?.number}`,
            items,
            comment: box?.comment,
          };
        });

        return {
          id,
          image,
          boxes,
          tracking: tracking_code,
          origin_name,
          priceTotal: new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(price),
          weight,
          itemsCount,
          pricePerItem: new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(price / itemsCount),
        };
      }
    );

    setTrackingsRaw(newTrackingsMap);
  }, []);

  const [getTrackings, , loading, error] = useFetch({
    endpoint: "LOGISTICS_GET_TRACKINGS",
    initialState: [],
    afterLoad: afterLoadTrackings,
  });

  useEffect(() => {
    getTrackings({
      params: {
        destination: localLocation,
      },
    });
  }, [getTrackings, localLocation]);

  ////////////////////////////////////////////////

  const [searchValue, setSearchValue] = useState("");
  const [order, setOrder] = useState("");

  const trackingsSearched = useMemo(() => {
    if (!trackingsRaw || !trackingsRaw.length) {
      return [];
    }

    const keyLow = normalizeString(searchValue);

    return trackingsRaw.filter((tr) => {
      if (keyLow === "") {
        return true;
      }
      const { origin_name, boxes } = tr;

      const itemTexts = boxes
        .map((box) => {
          return box.items
            .map((item) => `${item.name} - ${item.user}`)
            .join("|");
        })
        .join("|");

      return (
        normalizeString(`${origin_name || ""} ${itemTexts || ""}`).indexOf(
          keyLow
        ) >= 0
      );
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

        case "price":
          return a?.priceTotal < b?.priceTotal ? -1 * dir : dir;
        default:
          return 1;
      }
    });

    const listJSONdata = listOrdered.map((tr, k) => {
      const {
        origin_name,
        tracking,
        boxes,
        priceTotal,
        itemsCount,
        pricePerItem,
      } = tr;

      return {
        "#": k,
        "Nº Tracking": tracking || "-",
        "Ciudad de origen": origin_name,
        Precio: `${priceTotal} / ${itemsCount} ejemplares = ${pricePerItem} por ejemplar`,
        Cajas: boxes
          .map((box) => {
            return (
              `${box.name}: ${box.items
                .map((item) => {
                  return `${item.name} - recibe ${item.user}`;
                })
                .join(", ")}` +
              (box.comment ? `. Comentario: ${box.comment}` : "")
            );
          })
          .join("|"),
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
