import useFetch from "@/hooks/useFetch";
import { useState, useCallback, useEffect } from "react";
import { useReferrerView } from "@/context/referrerView";
import { codeNumToString } from "@/context/boxDelivery/utils";

const useBoxReceived = () => {
  /* LOCATIONS **********************************************/
  const { localLocation, params: viewParams } = useReferrerView();

  /* end LOCATIONS **********************************************/

  const [trackings, setTrackings] = useState([]);

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

    setTrackings(newTrackingsMap);
  }, []);

  const [getTrackings, , loading, error] = useFetch({
    endpoint: "LOGISTICS_GET_TRACKINGS",
    initialState: [],
    afterLoad: afterLoadTrackings,
  });

  useEffect(() => {
    getTrackings({
      params: {
        ...viewParams,
        destination: localLocation,
      },
    });
  }, [getTrackings, localLocation, viewParams]);

  ////////////////////////////////////////////////

  return {
    trackings,
    loading,
    error,
  };
};

export default useBoxReceived;
