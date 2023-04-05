import { useEffect, useState } from "react";
import storage from "utils/storage";
import moment from "moment";

const useCanEdit = (type) => {
  const [canEdit, setCantEdit] = useState(false);

  useEffect(() => {
    const mathtrade = storage.getFromStore("mathtrade");
    let dateToCompare = null;
    let isBefore = true;
    if (mathtrade && mathtrade.data && mathtrade.data.active) {
      switch (type) {
        case "list":
          dateToCompare = mathtrade.data?.frezze_geek_date;
          break;
        case "wants":
          dateToCompare = mathtrade.data?.frezze_wants_date;
          break;
        case "results":
          isBefore = false;
          dateToCompare = mathtrade.data?.show_results_date;
          break;
        default:
        //
      }
      const today = moment();
      let newCanEdit;
      if (isBefore) {
        newCanEdit = today.isBefore(dateToCompare);
      } else {
        newCanEdit = today.isAfter(dateToCompare);
      }

      // if (storage.getOption("isTest") && type === "results") {
      //   setCantEdit(true);
      // } else {
      //   setCantEdit(newCanEdit);
      // }
      setCantEdit(newCanEdit);
      //
    }
  }, [type]);

  return canEdit;
};

export default useCanEdit;
