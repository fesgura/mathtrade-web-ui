import { useEffect, useState } from "react";
import storage from "utils/storage";
import moment from "moment";

const useCanEdit = (type) => {
  const [canEdit, setCantEdit] = useState(false);

  useEffect(() => {
    const mathtrade = storage.getFromStore("mathtrade");
    let dateToCompare = null;
    if (mathtrade && mathtrade.data && mathtrade.data.active) {
      switch (type) {
        case "list":
          dateToCompare = mathtrade.data?.frezze_geek_date;
          break;
        case "wants":
          dateToCompare = mathtrade.data?.frezze_geek_date; //.frezze_wants_date;
          break;
        default:
        //
      }
      const newCanEdit = moment().isBefore(dateToCompare);
      setCantEdit(newCanEdit);
    }
  }, [type]);

  return canEdit;
};

export default useCanEdit;
