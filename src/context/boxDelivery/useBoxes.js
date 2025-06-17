import useFetch from "@/hooks/useFetch";
import { useState, useCallback, useEffect, useMemo } from "react";

const useBoxes = (locations) => {
  const [boxes, setBoxes] = useState([]);

  /* GET BOXES **********************************************/
  const afterLoad = useCallback(
    (newBoxes) => {
      setBoxes(
        newBoxes
          .map((b) => {
            const loc = locations.find((l) => l.id === b.destiny);

            const math_items_full = b.math_items.map(
              ({ id, title, location, assigned_trade_code }) => {
                const lo = locations.find((l) => l.id === location);
                return {
                  id: `${id}`,
                  text: `${assigned_trade_code} - ${title} ➡️ ${
                    lo?.name || ""
                  }`,
                };
              }
            );

            return {
              ...b,
              id: `${b.id}`,
              destiny: `${b.destiny}`,
              destinyName: loc ? loc.name : "",
              math_items: math_items_full.map(({ id }) => id),
              math_items_full,
            };
          })
          .sort((a, b) => a.number - b.number)
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
    getBoxes();
  }, [getBoxes, reloadFlag]);

  const { boxesList, locationIdBoxFilter } = useMemo(() => {
    const locationIdFilt = {};

    const boxesLi = boxes.map((box) => {
      locationIdFilt[box.destiny] = true;
      return {
        value: `${box.id}`,
        text: `Caja Nº ${box.number} - ${box.destinyName}`,
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
