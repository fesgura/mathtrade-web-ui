import { useEffect, useState } from "react";
import storage from "utils/storage";
import moment from "moment";

const useCanEdit = (type) => {
  const [canEdit, setCantEdit] = useState(false);

  useEffect(() => {
    const mathtrade = storage.getFromStore("mathtrade");
    let dateToCompare = null;

    const today = moment(); // "2023-04-26T13:30:00-03:00"
    let newCanEdit;

    if (mathtrade && mathtrade.data && mathtrade.data.active) {
      switch (type) {
        case "list":
          dateToCompare = mathtrade.data?.frezze_geek_date;
          newCanEdit = today.isBefore(dateToCompare);
          break;
        case "wants":
          dateToCompare = mathtrade.data?.frezze_wants_date;
          newCanEdit = today.isBefore(dateToCompare);
          break;
        case "results":
          // isAfter;
          dateToCompare = mathtrade.data?.show_results_date;
          newCanEdit = today.isAfter(dateToCompare);
          break;
        default:
        //
      }

      setCantEdit(newCanEdit);
    }
  }, [type]);

  return canEdit;
};

export default useCanEdit;
