import useFetch from "@/hooks/useFetch";
import { useState, useCallback, useEffect, useMemo } from "react";
import { destinyPathLabel } from "@/utils";
import { assignDisplayNumbers, codeNumToString } from "./utils";

const useBoxes = (locations, viewParams) => {
  const [boxes, setBoxes] = useState([]);

  /* GET BOXES **********************************************/
  const afterLoad = useCallback(
    (newBoxes) => {
      setBoxes(
        assignDisplayNumbers(
          newBoxes
          .map((b) => {
            const loc = (locations || []).find((l) => `${l.id}` === `${b.destiny}`);
            const items = Array.isArray(b.math_items) ? [...b.math_items] : [];
            const viaBox = items.some((item) => item.via_meeting);

            const math_items_full = items
              .sort((a, b) => {
                return a?.assigned_trade_code > b?.assigned_trade_code ? 1 : -1;
              })
              .map(({ id, title, location, assigned_trade_code, via_meeting }) => {
                const lo = (locations || []).find((l) => `${l.id}` === `${location}`);
                return {
                  id: `${id}`,
                  text: `${codeNumToString(assigned_trade_code)} - ${title} ➡️ ${destinyPathLabel(
                    lo?.name || "",
                    location,
                    via_meeting
                  )}`,
                };
              });

            return {
              ...b,
              id: `${b.id}`,
              destiny: `${b.destiny}`,
              destinyName: destinyPathLabel(loc ? loc.name : "", b.destiny, viaBox),
              math_items: math_items_full.map(({ id }) => id),
              math_items_full,
            };
          })
        )
          .sort((a, b) => {
            const aOpen = !a.closed_at;
            const bOpen = !b.closed_at;
            if (aOpen !== bOpen) return aOpen ? -1 : 1;
            if (!aOpen) {
              const ao = a.origin_number == null ? -1 : a.origin_number;
              const bo = b.origin_number == null ? -1 : b.origin_number;
              if (ao !== bo) return bo - ao;
              return (b.number || 0) - (a.number || 0);
            }
            return Number(a.id) - Number(b.id);
          })
      );
    },
    [locations]
  );

  const [reloadFlag, setReloadFlag] = useState(0);
  const reloadBoxes = useCallback(() => {
    setReloadFlag((v) => v + 1);
  }, []);

  const [getBoxes, , loadingBoxes, errorBoxes] = useFetch({
    endpoint: "LOGISTICS_GET_BOXES",
    initialState: [],
    afterLoad,
  });

  useEffect(() => {
    getBoxes({ params: viewParams });
  }, [getBoxes, reloadFlag, viewParams]);

  const { boxesList, locationIdBoxFilter } = useMemo(() => {
    const locationIdFilt = {};

    const boxesLi = boxes.map((box) => {
      locationIdFilt[box.destiny] = true;
      return {
        value: `${box.id}`,
        text: `Caja Nº ${box.displayNumber || box.number} - ${box.destinyName}`,
        destiny: `${box.destiny}`,
      };
    });

    return { boxesList: boxesLi, locationIdBoxFilter: locationIdFilt };
  }, [boxes]);
  /* end GET BOXES **********************************************/

  const [boxIdToEdit, setBoxIdToEdit] = useState(null);
  /* ADD NEW BOX **********************************************/

  const addNewBox = useCallback(() => {
    setBoxIdToEdit(null);
    setBoxes((oldBoxes) => {
      let number = 1;
      oldBoxes.forEach((box) => {
        if (`${box.number}` === `${number}`) {
          number++;
        }
      });

      return [
        ...oldBoxes,
        {
          number,
          destiny: 1,
          math_items: [],
        },
      ];
    });
  }, []);

  const cancelAddNewBox = useCallback((number) => {
    setBoxes((oldBoxes) => {
      return [...oldBoxes.filter((box) => box.number !== number)];
    });
  }, []);

  /* end ADD NEW BOX **********************************************/

  return {
    reloadBoxes,
    boxes,
    boxesList,
    locationIdBoxFilter,
    loadingBoxes,
    errorBoxes,
    addNewBox,
    cancelAddNewBox,
    boxIdToEdit,
    setBoxIdToEdit,
  };
};
export default useBoxes;
